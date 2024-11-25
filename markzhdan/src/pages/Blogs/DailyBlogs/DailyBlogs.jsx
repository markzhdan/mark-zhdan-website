import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DailyBlogs.css";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";

import BackLink from "../../../components/BackLink";
import { fetchBackend } from "../../../api/api";

const DailyBlogs = () => {
  const [blogList, setBlogList] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetchBackend("/daily-blogs/list");

        if (!response) {
          navigate("/blogs", { replace: true });
          throw new Error("Failed to fetch blog list");
        }

        setBlogList(response);
      } catch (err) {
        // console.log("Fetch error:", err);
      }
    };

    fetchBlog();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const monthParam = queryParams.get("month");

    if (monthParam) {
      setCurrentMonth(dayjs(monthParam)); // Set calendar to the month in the query parameter
    }
  }, [location.search]);

  function CustomDay(props) {
    const { day, selected, ...other } = props;
    const style = blogList.includes(day.format("MM-DD-YYYY"))
      ? { backgroundColor: "black", color: "white" }
      : selected
      ? { backgroundColor: "white" }
      : {};

    return <PickersDay {...other} day={day} style={style} />;
  }

  const shouldDisableDate = (day) => {
    const formattedDate = day.format("MM-DD-YYYY");
    return !blogList.includes(formattedDate);
  };

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.format("MM-DD-YYYY");
    navigate(`/blogs/${formattedDate}`);
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
    const monthParam = month.format("YYYY-MM");
    navigate(`/blogs/daily-blogs?month=${monthParam}`, { replace: true });
  };

  return (
    <main className="DailyBlogs Page">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={currentMonth}
          onChange={handleDateChange}
          shouldDisableDate={shouldDisableDate}
          onMonthChange={handleMonthChange} // Update query when month changes
          slots={{
            day: CustomDay,
          }}
        />
      </LocalizationProvider>

      <BackLink />
    </main>
  );
};

export default DailyBlogs;
