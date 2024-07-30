import { LOCAL_BASE_API_URL } from "@/Readme";
import axios from "axios";

const hrregister = (formValue) => {
    return axios.post(LOCAL_BASE_API_URL + "/hr_registration", formValue);
};


const hrupdate = ({ _id, ...updateData }) => {
    return axios.post(
        `${LOCAL_BASE_API_URL}/update_hr_details/${_id}`,
        updateData
    );
};

const hrdelete = ({ _id }) => {
    return axios.delete(`${LOCAL_BASE_API_URL}/hr_delete/${_id}`);
};

const hrbyID = async (companyID) => {
    return axios.get(`${LOCAL_BASE_API_URL}/get_hr/${companyID}`);
};

const hrService = {
    hrregister,
    hrbyID,
    hrupdate,
    hrdelete,
};

export default hrService;
