import axios from "axios";
const request = axios.create({
    baseURL: "https://be-pbl3.onrender.com/api/",
});
export default request;