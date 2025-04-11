import axios from "axios";

// ✅ Import the environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log(BACKEND_URL)

export default axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true, // ✅ Add this line
});
