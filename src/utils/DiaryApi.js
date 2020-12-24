import axios from "axios";
import { apiURL } from "../constants/oauth";

export default axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
});
