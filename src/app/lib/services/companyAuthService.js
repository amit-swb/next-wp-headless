import { LOCAL_BASE_API_URL } from "@/Readme";
import axios from "axios";

const authregister = (company_name, email_id, password) => {
    return axios.post(LOCAL_BASE_API_URL + "/company_registration", {
        company_name, email_id, password
    });
};
const authlogin = (email_id, password) => {
    return axios.post(LOCAL_BASE_API_URL + "/company_login", {
        email_id, password
    });
};

const authlogout = () => {
    localStorage.removeItem("company");
};

const allcompany = async () => {
    return axios.get(LOCAL_BASE_API_URL + "/get_all_Company");
};

const singlecompany = async (id) => {
    return axios.get(`${LOCAL_BASE_API_URL}/company/${id}`);
};

const companyupdate = (company_name, company_website_url, industry_business_location, company_address, country, city, zip_code, mobile_number, phone_number, contact_person, time_zone, date_format, company_number, company_tax_id, _id) => {
    return axios.post(`${LOCAL_BASE_API_URL}/update_company_details/${_id}`, {
        company_name, company_website_url, industry_business_location, company_address, country, city, zip_code, mobile_number, phone_number, contact_person, time_zone, date_format, company_number, company_tax_id, _id
    });
};

const companyAuthService = {
    authregister,
    authlogin,
    authlogout,
    allcompany,
    singlecompany,
    companyupdate
};

export default companyAuthService;