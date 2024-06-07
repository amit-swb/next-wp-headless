import { LOCAL_BASE_API_URL } from "@/Readme";
import axios from "axios";

const authregister = (company_name, email_id, password) => {
    return axios.post(LOCAL_BASE_API_URL + "/company_registration", {
        company_name,
        email_id,
        password
    });
};
const authlogin = (email_id, password) => {
    return axios.post(LOCAL_BASE_API_URL + "/company_login", {
        email_id,
        password
    });
};

const authlogout = () => {
    localStorage.removeItem("company");
};

const allcompany = async () => {
    return axios.get(LOCAL_BASE_API_URL + "/get_all_Company");
};

const companyAuthService = {
    authregister,
    authlogin,
    authlogout,
    allcompany
};

export default companyAuthService;