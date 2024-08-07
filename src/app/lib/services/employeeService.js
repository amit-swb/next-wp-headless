import { LOCAL_BASE_API_URL } from "@/Readme";
import axios from "axios";

const employeeregister = (
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
  company_id
) => {
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
  });
};

const employeeupdate = ({ _id, ...updateData }) => {
  return axios.post(
    `${LOCAL_BASE_API_URL}/update_employee_details/${_id}`,
    updateData
  );
};

const employeedelete = ({ _id }) => {
  return axios.delete(`${LOCAL_BASE_API_URL}/employee_delete/${_id}`);
};

const employeesbyID = async (companyID) => {
  return axios.get(`${LOCAL_BASE_API_URL}/get_employee/${companyID}`);
};

const employeeService = {
  employeeregister,
  employeesbyID,
  employeeupdate,
  employeedelete,
};

export default employeeService;
