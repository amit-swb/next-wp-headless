"use client";
import { selectCompanyData, selectEmployeeData, selectHrData } from "@/lib/selector/selector";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { EmployeeUpdate, getEmployeesbyID } from "@/lib/slices/employeeSlice";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { getHrbyID, HrUpdate } from "@/lib/slices/hrSlice";

var telRegEx = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export default function EmployeeProfile() {
  const [successful, setSuccessful] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const role = searchParams.get("role");

  const dispatch = useDispatch();
  const companydata = useSelector(selectCompanyData);
  const employeedata = useSelector(selectEmployeeData);
  const hrdata = useSelector(selectHrData);
  const company = companydata?.company?.user;
  const allemployeesbyID = employeedata?.allemployeesbyID;
  const allHrsbyID = hrdata?.allHrbyID;
  const singleEmployee = allemployeesbyID?.find((employee) => employee._id === id);
  const singleHr = allHrsbyID?.find((hr) => hr._id === id);
  const companyID = company?.company_id;

  const initialValues =
    role === "Employee"
      ? {
          first_Name: singleEmployee?.first_Name || "",
          last_name: singleEmployee?.last_name || "",
          middle_Name: singleEmployee?.middle_Name || "",
          date_of_birth: singleEmployee?.date_of_birth || "",
          mobile_number: singleEmployee?.mobile_number || "",
          alternate_number: singleEmployee?.alternate_number || "",
          father_number: singleEmployee?.father_number || "",
          mother_number: singleEmployee?.mother_number || "",
          current_address: singleEmployee?.current_address || "",
          permanent_address: singleEmployee?.permanent_address || "",
          designation: singleEmployee?.designation || "",
          date_of_joining: singleEmployee?.date_of_joining || "",
          pancard: singleEmployee?.pancard || "",
          ID_number: singleEmployee?.ID_number || "",
          bank_name: singleEmployee?.bank_name || "",
          bank_account: singleEmployee?.bank_account || "",
          number_bank: singleEmployee?.number_bank || "",
          IFSC_code: singleEmployee?.IFSC_code || "",
          upload_Document: singleEmployee?.upload_Document || "",
        }
      : {
          first_Name: singleHr?.first_Name || "",
          last_name: singleHr?.last_name || "",
          middle_Name: singleHr?.middle_Name || "",
          date_of_birth: singleHr?.date_of_birth || "",
          mobile_number: singleHr?.mobile_number || "",
          alternate_number: singleHr?.alternate_number || "",
          father_number: singleHr?.father_number || "",
          current_address: singleHr?.current_address || "",
          permanent_address: singleHr?.permanent_address || "",
          designation: singleHr?.designation || "",
          date_of_joining: singleHr?.date_of_joining || "",
          pancard: singleHr?.pancard || "",
          ID_number: singleHr?.ID_number || "",
          bank_name: singleHr?.bank_name || "",
          bank_account: singleHr?.bank_account || "",
          number_bank: singleHr?.number_bank || "",
          IFSC_code: singleHr?.IFSC_code || "",
          upload_Document: singleHr?.upload_Document || "",
        };

  const formFields =
    role === "Employee"
      ? [
          { name: "first_Name", type: "text", label: "First Name" },
          { name: "last_name", type: "text", label: "Last Name" },
          { name: "middle_Name", type: "text", label: "Middle Name" },
          { name: "date_of_birth", type: "text", label: "Date of Birth" },
          { name: "mobile_number", type: "tel", label: "Mobile Number" },
          { name: "alternate_number", type: "tel", label: "Alternate Number" },
          { name: "father_number", type: "tel", label: "Father's Number" },
          { name: "mother_number", type: "tel", label: "Mother's Number" },
          { name: "current_address", type: "text", label: "Current Address" },
          { name: "permanent_address", type: "text", label: "Permanent Address" },
          { name: "designation", type: "text", label: "Designation" },
          { name: "date_of_joining", type: "text", label: "Date of Joining" },
          { name: "pancard", type: "text", label: "PAN Card" },
          { name: "ID_number", type: "text", label: "ID Number" },
          { name: "bank_name", type: "text", label: "Bank Name" },
          { name: "bank_account", type: "text", label: "Bank Account" },
          { name: "number_bank", type: "text", label: "Number Bank" },
          { name: "IFSC_code", type: "text", label: "IFSC Code" },
          { name: "upload_Document", type: "text", label: "Upload Document" },
          { name: "employee_image", type: "file", label: "Employee Image" },
        ]
      : [
          { name: "first_Name", type: "text", label: "First Name" },
          { name: "last_name", type: "text", label: "Last Name" },
          { name: "middle_Name", type: "text", label: "Middle Name" },
          { name: "date_of_birth", type: "text", label: "Date of Birth" },
          { name: "mobile_number", type: "tel", label: "Mobile Number" },
          { name: "alternate_number", type: "tel", label: "Alternate Number" },
          { name: "father_number", type: "tel", label: "Father's Number" },
          { name: "current_address", type: "text", label: "Current Address" },
          { name: "permanent_address", type: "text", label: "Permanent Address" },
          { name: "designation", type: "text", label: "Designation" },
          { name: "date_of_joining", type: "text", label: "Date of Joining" },
          { name: "pancard", type: "text", label: "PAN Card" },
          { name: "ID_number", type: "text", label: "ID Number" },
          { name: "bank_name", type: "text", label: "Bank Name" },
          { name: "bank_account", type: "text", label: "Bank Account" },
          { name: "number_bank", type: "text", label: "Number Bank" },
          { name: "IFSC_code", type: "text", label: "IFSC Code" },
          { name: "upload_Document", type: "text", label: "Upload Document" },
          { name: "employee_image", type: "file", label: "Employee Image" },
        ];

  const baseSchema = {
    first_Name: Yup.string()
      .test("len", "Must be between 3 and 20 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 20)
      .required("This field is required!"),
    last_name: Yup.string()
      .test("len", "Must be between 3 and 20 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 20)
      .required("This field is required!"),
    middle_Name: Yup.string()
      .test("len", "Must be between 3 and 20 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 20)
      .required("This field is required!"),
    date_of_birth: Yup.date()
      .max(new Date(Date.now() - 567648000000), "You must be at least 18 years old")
      .required("Required"),
    mobile_number: Yup.string().matches(telRegEx, "Mobile Number is not valid").required("This field is required!"),
    alternate_number: Yup.string().matches(telRegEx, "Alternate Number is not valid").required("This field is required!"),
    father_number: Yup.string().matches(telRegEx, "Father Number is not valid").required("This field is required!"),
    current_address: Yup.string()
      .test("len", "Must be between 5 and 100 characters.", (val) => val && val.toString().length >= 5 && val.toString().length <= 100)
      .required("This field is required!"),
    permanent_address: Yup.string()
      .test("len", "Must be between 5 and 100 characters.", (val) => val && val.toString().length >= 5 && val.toString().length <= 100)
      .required("This field is required!"),
    designation: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Designation can only contain letters and spaces")
      .min(2, "Designation must be at least 2 characters long")
      .max(50, "Designation must be at most 50 characters long")
      .required("Designation is required"),
    date_of_joining: Yup.date("This is not a valid date.").required("Date format is required"),
  };

  const employeeSchema = {
    ...baseSchema,
    mother_number: Yup.string().matches(telRegEx, "Mother Number is not valid").required("This field is required!"),
  };
  const hrSchema = {
    ...baseSchema,
  };
  const validationSchema = role === "Employee" ? Yup.object().shape(employeeSchema) : Yup.object().shape(hrSchema);

  useEffect(() => {
    if (companyID) {
      dispatch(getEmployeesbyID({ companyID }));
      dispatch(getHrbyID({ companyID }));
    }
  }, [companyID, successful, dispatch]);

  function previeFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previeFile(file);
  };

  useEffect(() => {
    if (image) {
      // console.log("Image preview:", image);
    }
  }, [image]);

  const handleUpdate = async (formValue) => {
    setSuccessful(false);

    const updatedFormValue = {
      ...formValue,
      [role === "Employee" ? "employee_image" : "hr_image"]: image,
      _id: role === "Employee" ? singleEmployee?._id : singleHr?._id,
    };

    try {
      const normalizedRole = role.toLowerCase();
      if (normalizedRole === "employee") {
        await dispatch(EmployeeUpdate(updatedFormValue)).unwrap();
      } else if (normalizedRole === "hr") {
        await dispatch(HrUpdate(updatedFormValue)).unwrap();
      } else {
        throw new Error("Unknown role");
      }
      setSuccessful(true);
      toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} updated successfully`);
    } catch (error) {
      setSuccessful(false);
      toast.error(`${role.charAt(0).toUpperCase() + role.slice(1)} update failed`);
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-4 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6">
        <div className="flex flex-col gap-y-8 mx-auto max-w-screen-sm lg:mb-16 mb-8">
          <h2 className="text-center mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Single {role} Detail</h2>
          <div className="employee_update_form">
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleUpdate}>
              {({ setFieldValue }) => (
                <Form className="space-y-4 md:space-y-6">
                  <div className="relative">
                    <div className="employee_avatar flex justify-center">
                      <img src={image || (role === "Employee" ? singleEmployee?.employee_image : singleHr?.hr_image)} alt={role === "Employee" ? "Employee" : "HR"} className="w-32 h-32 object-cover rounded-full border-2 border-gray-300" />
                      <label
                        htmlFor={role === "Employee" ? "employee_image" : "hr_image"}
                        className="absolute bottom-0 left-50 p-2 bg-gray-800 rounded-full cursor-pointer"
                        style={{
                          transform: "translate(-50%, 0px)",
                          left: "57%",
                          padding: "5px",
                          width: "30px",
                          height: "30px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          id={role === "Employee" ? "employee_image" : "hr_image"}
                          name={role === "Employee" ? "employee_image" : "hr_image"}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleFileChange(e);
                            setFieldValue(role === "Employee" ? "employee_image" : "hr_image", e.currentTarget.files[0]);
                          }}
                          className="hidden"
                        />
                        <span className="text-white">
                          <FontAwesomeIcon icon={faPencil} />
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {formFields
                      .filter(({ name }) => name !== "employee_image" && name !== "hr_image")
                      .map(({ name, type, label }) => (
                        <div className="form-group" key={name}>
                          <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {label}
                          </label>
                          <Field
                            name={name}
                            type={type}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                          <ErrorMessage name={name} component="div" className="text-red-800" />
                        </div>
                      ))}
                  </div>
                  <div className="form-group mt-5">
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      Update Profile
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}
