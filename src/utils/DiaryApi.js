import axios from "axios";

export default axios.create({
  baseURL: "https://abhi102.pythonanywhere.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
