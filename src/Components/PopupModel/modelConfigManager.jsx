import React from "react";
import * as Yup from "yup";
import DynamicModal from "./DynamicModel";
import { useSelector } from "react-redux";
import { selectCompanyData } from "@/lib/selector/selector";

var telRegEx = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const DynamicModalManager = ({ role, action, isOpen, handleClose, handleEmployeeRegister, handleHrRegister, handleEmployeeDelete, handleHrDelete, passwordVisible, showPassword }) => {
  const companydata = useSelector(selectCompanyData);
  const company = companydata?.company?.user;
  const companyID = company?.company_id;

  const modalConfig = {
    employee: {
      register: {
        title: "Add New Employee",
        initialValues: {
          first_Name: "",
          last_name: "",
          middle_Name: "",
          date_of_birth: "",
          email_id: "",
          password: "",
          mobile_number: "",
          alternate_number: "",
          father_number: "",
          mother_number: "",
          current_address: "",
          permanent_address: "",
          designation: "",
          date_of_joining: "",
          company_id: companyID,
        },
        validationSchema: Yup.object().shape({
          first_Name: Yup.string()
            .test("len", "must be between 3 and 20 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 20)
            .required("This field is required!"),
          last_name: Yup.string()
            .test("len", "must be between 3 and 20 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 20)
            .required("This field is required!"),
          middle_Name: Yup.string()
            .test("len", "must be between 3 and 20 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 20)
            .required("This field is required!"),
          date_of_birth: Yup.date()
            .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
            .required("Required"),
          email_id: Yup.string().email("This is not a valid email_id.").required("This field is required!"),
          password: Yup.string()
            .test("len", "must be between 6 and 40 characters.", (val) => val && val.toString().length >= 6 && val.toString().length <= 40)
            .required("This field is required!"),
          mobile_number: Yup.string().matches(telRegEx, "Mobile Number is not valid").required("This field is required!"),
          alternate_number: Yup.string().matches(telRegEx, "Alternate Number is not valid").required("This field is required!"),
          father_number: Yup.string().matches(telRegEx, "father Number is not valid").required("This field is required!"),
          mother_number: Yup.string().matches(telRegEx, "Mother Number is not valid").required("This field is required!"),
          current_address: Yup.string()
            .test("len", "must be between 5 and 100 characters.", (val) => val && val.toString().length >= 5 && val.toString().length <= 100)
            .required("This field is required!"),
          permanent_address: Yup.string()
            .test("len", "must be between 5 and 100 characters.", (val) => val && val.toString().length >= 5 && val.toString().length <= 100)
            .required("This field is required!"),
          designation: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, "Designation can only contain letters and spaces")
            .min(2, "Designation must be at least 2 characters long")
            .max(50, "Designation must be at most 50 characters long")
            .required("Designation is required"),
          date_of_joining: Yup.date("This is not a valid date.").required("Date format is required"),
        }),
        formFields: [
          { name: "first_Name", type: "text", label: "First Name" },
          { name: "last_name", type: "text", label: "Last Name" },
          { name: "middle_Name", type: "text", label: "Middle Name" },
          { name: "date_of_birth", type: "text", label: "Date of Birth" },
          { name: "email_id", type: "email", label: "Email" },
          { name: "password", type: "password", label: "Password" },
          { name: "mobile_number", type: "tel", label: "Mobile Number" },
          { name: "alternate_number", type: "tel", label: "Alternate Number" },
          { name: "father_number", type: "tel", label: "Father's Number" },
          { name: "mother_number", type: "tel", label: "Mother's Number" },
          { name: "current_address", type: "text", label: "Current Address" },
          { name: "permanent_address", type: "text", label: "Permanent Address" },
          { name: "designation", type: "text", label: "Designation" },
          { name: "date_of_joining", type: "text", label: "Date of Joining" },
          { name: "company_id", type: "text", label: "Company ID" },
        ],
      },
      delete: {
        title: "Are you sure you want to delete this employee?",
        formFields: [],
      },
    },
    hr: {
      register: {
        title: "Add New HR",
        initialValues: {
          first_Name: "",
          last_name: "",
          middle_Name: "",
          date_of_birth: "",
          email_id: "",
          password: "",
          mobile_number: "",
          alternate_number: "",
          father_number: "",
          current_address: "",
          permanent_address: "",
          designation: "",
          date_of_joining: "",
          company_id: companyID,
        },
        validationSchema: Yup.object().shape({
          first_Name: Yup.string()
            .test("len", "must be between 3 and 20 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 20)
            .required("This field is required!"),
          last_name: Yup.string()
            .test("len", "must be between 3 and 20 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 20)
            .required("This field is required!"),
          middle_Name: Yup.string()
            .test("len", "must be between 3 and 20 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 20)
            .required("This field is required!"),
          date_of_birth: Yup.date()
            .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
            .required("Required"),
          email_id: Yup.string().email("This is not a valid email_id.").required("This field is required!"),
          password: Yup.string()
            .test("len", "must be between 6 and 40 characters.", (val) => val && val.toString().length >= 6 && val.toString().length <= 40)
            .required("This field is required!"),
          mobile_number: Yup.string().matches(telRegEx, "Mobile Number is not valid").required("This field is required!"),
          alternate_number: Yup.string().matches(telRegEx, "Alternate Number is not valid").required("This field is required!"),
          father_number: Yup.string().matches(telRegEx, "Father Number is not valid").required("This field is required!"),
          current_address: Yup.string()
            .test("len", "must be between 5 and 100 characters.", (val) => val && val.toString().length >= 5 && val.toString().length <= 100)
            .required("This field is required!"),
          permanent_address: Yup.string()
            .test("len", "must be between 5 and 100 characters.", (val) => val && val.toString().length >= 5 && val.toString().length <= 100)
            .required("This field is required!"),
          designation: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, "Designation can only contain letters and spaces")
            .min(2, "Designation must be at least 2 characters long")
            .max(50, "Designation must be at most 50 characters long")
            .required("Designation is required"),
          date_of_joining: Yup.date("This is not a valid date.").required("Date format is required"),
        }),
        formFields: [
          { name: "first_Name", type: "text", label: "First Name" },
          { name: "last_name", type: "text", label: "Last Name" },
          { name: "middle_Name", type: "text", label: "Middle Name" },
          { name: "date_of_birth", type: "text", label: "Date of Birth" },
          { name: "email_id", type: "email", label: "Email" },
          { name: "password", type: "password", label: "Password" },
          { name: "mobile_number", type: "tel", label: "Mobile Number" },
          { name: "alternate_number", type: "tel", label: "Alternate Number" },
          { name: "father_number", type: "tel", label: "Father's Number" },
          { name: "current_address", type: "text", label: "Current Address" },
          { name: "permanent_address", type: "text", label: "Permanent Address" },
          { name: "designation", type: "text", label: "Designation" },
          { name: "date_of_joining", type: "text", label: "Date of Joining" },
          { name: "company_id", type: "text", label: "Company ID" },
        ],
      },
      delete: {
        title: "Are you sure you want to delete this HR?",
        formFields: [],
      },
    },
  };

  if (!modalConfig[role] || !modalConfig[role][action]) {
    return null;
  }
  const config = modalConfig[role][action];

  const handleSubmit = (values, { resetForm } = {}) => {
    if (action === "register") {
      if (role === "employee") {
        handleEmployeeRegister(values, { resetForm });
      } else if (role === "hr") {
        handleHrRegister(values, { resetForm });
      }
    } else if (action === "delete") {
      if (role === "employee") {
        handleEmployeeDelete({}, { resetForm });
      } else if (role === "hr") {
        handleHrDelete({}, { resetForm });
      }
    } else {
      console.log(`Unhandled action ${action} for ${role}`, values);
    }
  };

  return (
    <DynamicModal
      title={config.title}
      isOpen={isOpen}
      onClose={handleClose}
      initialValues={config.initialValues}
      validationSchema={config.validationSchema}
      formFields={config.formFields}
      onSubmit={handleSubmit}
      isDelete={action === "delete"}
      passwordVisible={passwordVisible}
      showPassword={showPassword}
    />
  );
};

export default DynamicModalManager;
