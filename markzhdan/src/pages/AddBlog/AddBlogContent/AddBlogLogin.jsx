import React, { useState } from "react";
import "./AddBlogLogin.css";

import { TextField, Button } from "@mui/material";

import { fetchBackend } from "../../../api/api";

const AddBlogLogin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setLoginError(false);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setLoginError(false);
  };

  const fetchLogin = async () => {
    const data = {
      username,
      password,
    };

    try {
      const response = await fetchBackend("/users/login", "POST", data);

      if (!response) {
        throw new Error("Failed to fetch blog");
      }

      setIsLoggedIn(response.isAdmin);
    } catch (err) {
      setIsLoggedIn(false);
      setLoginError(true);
    }
  };

  return (
    <main className="AddBlogLogin">
      <TextField
        id="outlined-username-input"
        label="Username"
        type="text"
        variant="outlined"
        size="small"
        error={loginError}
        onChange={handleUsernameChange}
      />

      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        variant="outlined"
        size="small"
        error={loginError}
        onChange={handlePasswordChange}
      />

      <Button variant="outlined" onClick={fetchLogin}>
        Sign In
      </Button>
    </main>
  );
};

export default AddBlogLogin;
