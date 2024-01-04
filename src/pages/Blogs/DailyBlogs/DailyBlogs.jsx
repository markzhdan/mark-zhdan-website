import React from "react";
import { useNavigate } from "react-router-dom";
import "./DailyBlogs.css";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import BackLink from "../../../components/BackLink";

import importedDailyBlogs from "../../../data/daily-blogs.json";
const dailyBlogs = importedDailyBlogs || [];

function CustomDay(props) {
  const { day, ...other } = props;
  const formattedDate = day.format("MM-DD-YYYY");
  const blogExists = dailyBlogs.includes(formattedDate);
  const selectedStyle = { backgroundColor: "black", color: "white" };

  return (
    <PickersDay {...other} day={day} style={blogExists ? selectedStyle : {}} />
  );
}

const shouldDisableDate = (day) => {
  const formattedDate = day.format("MM-DD-YYYY");
  return !dailyBlogs.includes(formattedDate);
};

const DailyBlogs = () => {
  const navigate = useNavigate();

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.format("MM-DD-YYYY");
    navigate(`/blogs/${formattedDate}`);
  };

  return (
    <main className="DailyBlogs Page">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          onChange={handleDateChange}
          shouldDisableDate={shouldDisableDate}
          slots={{
            day: CustomDay,
          }}
        />
      </LocalizationProvider>

      <BackLink goTo={"/blogs"} />
    </main>
  );
};

export default DailyBlogs;
