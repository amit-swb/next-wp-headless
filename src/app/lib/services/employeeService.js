import { LOCAL_BASE_API_URL } from "@/Readme";
import axios from "axios";

const employeeregister = (first_Name,
    last_name,
    middle_Name,
    date_of_birth,
    email_id,
    password,
    mobile_number,
    alternate_number,
    father_number,
    mother_number,
    current_address,
    permanent_address,
    designation,
    date_of_joining,
    company_id,
    employee_id) => {
    return axios.post(LOCAL_BASE_API_URL + "/employee_registration", {
        first_Name,
        last_name,
        middle_Name,
        date_of_birth,
        email_id,
        password,
        mobile_number,
        alternate_number,
        father_number,
        mother_number,
        current_address,
        permanent_address,
        designation,
        date_of_joining,
        company_id,
        employee_id
    });
};
const employeelogin = (email_id, password) => {
    return axios.post(LOCAL_BASE_API_URL + "/employee_login", {
        email_id, password
    });
};

const employeelogout = () => {
    localStorage.removeItem("employeeToken");
};

const employeesbyID = async (companyID) => {
    return axios.get(`${LOCAL_BASE_API_URL}/get_employee/${companyID}`);
};

const employeeupdate = (company_name, company_website_url, industry_business_location, company_address, country, city, zip_code, mobile_number, phone_number, contact_person, time_zone, date_format, company_number, company_tax_id, _id) => {
    return axios.post(`${LOCAL_BASE_API_URL}/update_employee_details/${_id}`, {
        company_name, company_website_url, industry_business_location, company_address, country, city, zip_code, mobile_number, phone_number, contact_person, time_zone, date_format, company_number, company_tax_id, _id
    });
};

const employeeService = {
    employeeregister,
    employeelogin,
    employeelogout,
    employeesbyID,
    employeeupdate
};

export default employeeService;