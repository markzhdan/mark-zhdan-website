# Reverse Engineering the VLR Player Rating

January 8th, 2024 - Written by Mark Zhdan

## TLDR

```javascript
VLR Rating ≈ 0.898*KPR + 0.228*APR + -0.434*DPR + 0.0025*ADRa + 0.434*SR + 0.313*KAST + 0.175
```

_Full coefficients below_

## Introduction

VLR.gg introduced a new rating system for player stats around December of 2022. The formula to calculate the rating was not released but they explained the key metrics and components that go into the formula in an [article](https://www.vlr.gg/160667/vlr-gg-player-rating-explained). According to the post, the system takings into account kills, death, damage, assists, and surviving which goes into a linear formula similar to this:

```javascript
KillContribution + DeathContribution + APR + ADRa + SurvivalRating;
```

Inspired by Dave from [flashed.gg's article](https://flashed.gg/posts/reverse-engineering-hltv-rating/) about reverse engineering HLTV's 2.0 rating, I thought that with enough data I would be able to estimate the formula. If we know all the componenets that go into the formula, simply scraping data and then compiling it into a regression model would result in decent results/error.

Since VLR's rating calculates the rating based off round-by-round performance, loadout status, and round situations (1v5, 5v5, etc.), my goal is to make a very rough estimate of the formula using existing data found from the [VLR.gg stats page](https://www.vlr.gg/stats).

## Gathering Data

Lets start with first getting the data that will go into our model. For my model, I used data from the [VALORANT Champions 2023 Finals](https://www.vlr.gg/stats/?event_group_id=all&event_id=1657&series_id=all&region=all&country=all&min_rounds=200&min_rating=1550&agent=all&map_id=all&timespan=all), the [VCT 2023 Season](https://www.vlr.gg/stats/?event_group_id=45&event_id=all&region=all&country=all&min_rounds=400&min_rating=1550&agent=all&map_id=all&timespan=all), [recent stats](https://www.vlr.gg/stats), and [all-time stats](https://www.vlr.gg/stats/?event_group_id=all&event_id=all&region=all&country=all&min_rounds=1000&min_rating=1550&agent=all&map_id=all&timespan=all).

Using basic python data scraping with BeautifulSoup, I scraped each table's stats and saved it to a csv file.

```javascript
response = requests.get(base_url + path)
response.raise_for_status()  # Check if the request was successful
soup = BeautifulSoup(response.content, "html.parser")

table = soup.find("table", class_="wf-table mod-stats mod-scroll")
headers = [header.text.strip() for header in table.find_all("th")]

data = []
# Exclude "Agents" column (fixes data shifting)
if "Agents" in headers:
    agents_index = headers.index("Agents")
    headers.pop(agents_index)

    for row in table.find_all("tr")[1:]:
        row_data = []
        for i, col in enumerate(row.find_all("td")):
            if i != agents_index:
                row_data.append(col.text.strip())

        data.append(row_data)
else:
    for row in table.find_all("tr")[1:]:
        row_data = [col.text.strip() for col in row.find_all("td")]

        data.append(row_data)
```

I had to exclude the "Agents" column from the data before cleaning as if a player played less than 3+ agents, it would be just 3 or less agent icons leading to the data shifting within the table.

## Cleaning Data

In order to clean the data, I simply dropped unimportant metrics like clutch rounds, max kills, and player teams. I also removed % signs from numbers and divided all percentages by 100 in order to have a decimal value from 0-1. Finally, I calculated DPR, ADRa (ADR adjusted), and SR (survival rating) by the formulas below.

The cleaned up csv looks like this:

```javascript
Player,R,ACS,K:D,KAST,ADR,KPR,APR,FKPR,FDPR,HS%,CL%,K,D,A,FK,FD,DPR,ADRa,SR
Leo,1.24,209.7,1.38,0.82,135.0,0.75,0.41,0.04,0.02,21.0,19.0,956,693,522,57,30,0.541,30.438,0.459
...
```

## Choosing Metrics

So what actual data goes into the formula? As mentioned before, the following metrics go into the linear formula:

```javascript
KillContribution + DeathContribution + APR + ADRa + SurvivalRating;
```

Lets go through it piece by piece.

- **Kill Contribution:** This is simply the amount of kills that a player contributes in a match. Lets use kills per round (KPR).
- **Death Contribution:** This is simply the amount of deaths that a player has in a match. Lets use deaths per round (DPR).
  - _Note: that both of these are weight by a trading and economic modifier but since we don't have access to those stats, we will leave it like this._
- **APR:** This is a straightforward the amount of assists per round (APR).
- **Adjusted ADR (ADRa):** Adjusted ADR accounts for the damage that is already account in KPR. We try to remove the majority of damage incorporated in KPR and have a metric that is purely independent.
  - ADRa = [(ADR * Rounds) - (140 * Kills)] / Rounds
- **Survival Rating (SR):** This is calculated by checking if the player survived a round and calculates a percentage. We won't have economic information so we won't weight it.
  - SR = (Rounds - Deaths) / Rounds

## Analyzing Data

Now that we have cleaned our data and chose the metrics we will use in our formula, lets now predict the formula coefficients. Since the formula should be linear, lets use a linear regression model for our data. VLR.gg writes how the kill and death contributions are weighted more alongside a bell curve to normalize the data is applied but we will not worry about that for now.

```javascript
df = pd.read_csv("data/clean/champions2023.csv")

featureKeys = ["KPR", "APR", "DPR", "ADRa", "SR", "KAST"]
features = df[featureKeys]
target = df["R"]

X_train, X_test, y_train, y_test = train_test_split(
    features, target, random_state=3, test_size=0.1
)

# Linear Regression Model
model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)
```

**Output:**

```javascript
Coefficients: [0.898060946867, 0.227872913948, -0.433940698092, 0.002524365390, 0.433940698092, 0.312874869548]
Intercept: 0.17492523147187433

R2 score: 0.9856412843860585
RMSE: 0.020110865826540265
MAE: 0.015882295992085477
```

The R2 score doesnt look too bad! Well that was after testing different metrics, calculations, random stats, and a lot of trial and error...

We get the final predicted formula to be:
**VLR Rating ≈**

```javascript
0.898060946867 * KPR +
  0.227872913948 * APR +
  -0.433940698092 * DPR +
  0.00252436539 * ADRa +
  0.433940698092 * SR +
  0.312874869548 * KAST +
  0.17492523147187433;
```

## Testing

The model was tested with statistics from [VALORANT Champions 2023](https://www.vlr.gg/event/stats/1657/valorant-champions-2023) and resulted in a minor standard deviation of error.

```javascript
Demon1       | Actual: 1.23, Predicted: 1.23, Error: 0.00
Less         | Actual: 1.16, Predicted: 1.11, Error: 0.05
aspas        | Actual: 1.15, Predicted: 1.13, Error: 0.03
cauanzin     | Actual: 1.13, Predicted: 1.10, Error: 0.03
SUYGETSU     | Actual: 1.10, Predicted: 1.09, Error: 0.01
jawgemo      | Actual: 1.10, Predicted: 1.09, Error: 0.01
d4v41        | Actual: 1.08, Predicted: 1.09, Error: -0.01
cNed         | Actual: 1.08, Predicted: 1.09, Error: -0.01
something    | Actual: 1.08, Predicted: 1.03, Error: 0.05
s0m          | Actual: 1.08, Predicted: 1.06, Error: 0.02
...
```

Testing the function, we get a decent amount of error and it never seems to be exactly correct. However, my goal was to get a rough estimate and I think I accomplished it! Without economic/loadout status and round-by-round analysis I think the model captures the general idea of the formula very well.

## Conclusion

Even through limitations in data and score calculations, I believe this project successfully reverse-engineered the VLR.gg player rating system to a high degree of accuracy. While VLR rating is calculated by a round-by-round basis and considers economic situation, I believe this offers a close enough representation of what to expect in the rating calculation.

Overall, these insights for player assessment is important to analyze players' performances and I hope to use this with Post-Plant to predict individual VLR ratings.

## Acknowledgements

- VLR.gg for providing comprehensive statistics on player performance.
- [flashed.gg](https://flashed.gg/posts/reverse-engineering-hltv-rating/) blog for providing a template for this analysis.
