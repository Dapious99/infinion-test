import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://infinion-test-int-test.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});
