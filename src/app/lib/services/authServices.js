import { LOCAL_BASE_API_URL } from "@/Readme";
import axios from "axios";

const authregister = (first_name, last_name, email_id, phone_number, password) => {
    return axios.post(LOCAL_BASE_API_URL + "/registration", {
        first_name,
        last_name,
        email_id,
        phone_number,
        password
    });
};
const authlogin = (email_id, password) => {
    return axios.post(LOCAL_BASE_API_URL + "/login", {
        email_id,
        password
    });
};

const authlogout = () => {
    localStorage.removeItem("auth");
};

const authService = {
    authregister,
    authlogin,
    authlogout
};

export default authService;