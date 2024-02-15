import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + "/api",
});

export const fetchBackend = async (endpoint, method = "GET", data = null) => {
  try {
    const response = await api({
      method: method,
      url: endpoint,
      data: data,
    });

    return response.data;
  } catch (error) {
    console.log("API call error:", error.response || error);
    throw error;
  }
};
