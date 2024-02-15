import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DailyBlogs.css";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import BackLink from "../../../components/BackLink";
import { fetchBackend } from "../../../api/api";

const DailyBlogs = () => {
  const [blogList, setBlogList] = useState([]);
  const navigate = useNavigate();

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

  function CustomDay(props) {
    const { day, ...other } = props;
    const formattedDate = day.format("MM-DD-YYYY");
    const blogExists = blogList.includes(formattedDate);
    const selectedStyle = { backgroundColor: "black", color: "white" };

    return (
      <PickersDay
        {...other}
        day={day}
        style={blogExists ? selectedStyle : {}}
      />
    );
  }

  const shouldDisableDate = (day) => {
    const formattedDate = day.format("MM-DD-YYYY");
    return !blogList.includes(formattedDate);
  };

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

      <BackLink />
    </main>
  );
};

export default DailyBlogs;
