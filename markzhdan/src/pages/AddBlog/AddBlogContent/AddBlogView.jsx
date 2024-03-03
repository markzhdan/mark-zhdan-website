import React, { useState, useEffect } from "react";
import "./AddBlogView.css";

import { TextField, Button } from "@mui/material";
import Markdown from "react-markdown";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

import { fetchBackend } from "../../../api/api";

import { BLOG_TEMPLATE } from "../../../data/constants";

const AddBlogView = () => {
  const [blogContent, setBlogContent] = useState(BLOG_TEMPLATE);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNewBlog, setIsNewBlog] = useState(true);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetchBackend(
          `/daily-blogs/${formatDate(selectedDate)}`
        );

        if (!response) {
          throw new Error("Failed to fetch blog");
        }
        setBlogContent(response);
        setIsNewBlog(false);
      } catch (err) {
        setBlogContent(
          replaceFirstLineWithDate(
            BLOG_TEMPLATE,
            formatDateHeader(selectedDate)
          )
        );
        setIsNewBlog(true);
      }
    };

    fetchBlog();
  }, [selectedDate]);

  const handleContentChange = (event) => setBlogContent(event.target.value);

  function formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");

    return `${formattedMonth}-${formattedDay}-${year}`;
  }

  function formatDateHeader(date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const ordinalSuffixes = ["th", "st", "nd", "rd"];

    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const day = date.getDate();

    const ordinalSuffix =
      day % 10 > 3 || Math.floor((day % 100) / 10) === 1
        ? ordinalSuffixes[0]
        : ordinalSuffixes[day % 10];

    return `${months[monthIndex]} ${day}${ordinalSuffix}, ${year}`;
  }

  function replaceFirstLineWithDate(originalString, newFormattedDate) {
    const lines = originalString.split("\n");

    lines[0] = "# " + newFormattedDate;

    const updatedString = lines.join("\n");

    return updatedString;
  }

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue.toDate());
    setBlogContent(
      replaceFirstLineWithDate(blogContent, formatDateHeader(newValue.toDate()))
    );
  };

  const createBlog = async () => {
    const data = {
      content: blogContent,
      date: formatDate(selectedDate),
    };

    try {
      const response = await fetchBackend("/daily-blogs/create", "POST", data);

      if (!response) {
        throw new Error("Failed to fetch blog");
      }

      if (response.success) {
        setIsNewBlog(false);
        setShowSuccessBanner(true);

        setTimeout(() => {
          setShowSuccessBanner(false);
        }, 3000);
      }
    } catch (err) {
      console.log("error");
    }
  };

  const handleSaveBlogClicked = () => {
    createBlog();
  };

  return (
    <main className="AddBlogView">
      <section className="WriteBlog">
        <div className="WriteBlogHeader">
          <h1>Write Blog</h1>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Set blog date"
                value={dayjs(selectedDate)}
                onChange={handleDateChange}
                slotProps={{ textField: { size: "small" } }}
              />
            </DemoContainer>
          </LocalizationProvider>

          {isNewBlog && <p style={{ fontWeight: 800 }}>New Blog</p>}
        </div>

        <TextField
          placeholder="Write daily blog here"
          multiline
          fullWidth
          maxRows={27}
          value={blogContent}
          onChange={handleContentChange}
        />
      </section>

      <section className="ViewBlog">
        <h1>View Markdown</h1>
        <Markdown className="ViewMarkdown">{blogContent}</Markdown>

        {showSuccessBanner && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            style={{ marginTop: "10px", position: "absolute", left: "0px" }}
          >
            Successfully created or updated blog and created backup!
          </Alert>
        )}

        <Button
          variant="outlined"
          onClick={handleSaveBlogClicked}
          style={{ marginTop: "10px", position: "absolute", right: "0px" }}
        >
          Save
        </Button>
      </section>
    </main>
  );
};

export default AddBlogView;
