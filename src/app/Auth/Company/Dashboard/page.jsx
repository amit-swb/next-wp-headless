"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import {
  EmployeeDelete,
  EmployeeSignup,
  EmployeeUpdate,
  getEmployeesbyID,
} from "@/lib/slices/employeeSlice";
import DynamicModal from "../../../../Components/PopupModel/DynamicModel";
import { selectCompanyData, selectEmployeeData } from "@/lib/selector/selector";
import PrivateRoute from "../../../../Components/PrivateRoute/PrivateRoute";

var telRegEx =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export default function CompanyDashboard() {
  const [isClient, setIsClient] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const companydata = useSelector(selectCompanyData);
  const employeedata = useSelector(selectEmployeeData);
  const company = companydata?.company?.user;
  const allemployeesbyID = employeedata?.allemployeesbyID;

  const companyID = company?.company_id;
  const companyName = company?.company_name;

  useEffect(() => {
    if (!company) {
      router.push("/");
    }
  }, [router, company]);

  useEffect(() => {
    if (companyID) {
      dispatch(getEmployeesbyID({ companyID }));
    }
  }, [companyID, successful, dispatch]);

  useEffect(() => {
    if (successful) {
      setModelOpen(!modelOpen);
    }
  }, [successful]);

  const [initialValuesAdd, setInitialValuesAdd] = useState({
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
    company_id: companyID || "",
  });

  const [initialValuesUpdate, setInitialValuesUpdate] = useState({
    first_Name: "",
    last_name: "",
    middle_Name: "",
    date_of_birth: "",
    mobile_number: "",
    alternate_number: "",
    father_number: "",
    mother_number: "",
    current_address: "",
    permanent_address: "",
    designation: "",
    date_of_joining: "",
    pancard: "",
    ID_number: "",
    bank_name: "",
    bank_account: "",
    number_bank: "",
    IFSC_code: "",
    upload_Document: "",
    employee_image: "",
  });

  const formFieldsAdd = [
    { name: "first_Name", type: "text", label: "first_Name" },
    { name: "last_name", type: "text", label: "last_name" },
    { name: "middle_Name", type: "text", label: "middle_Name" },
    { name: "date_of_birth", type: "text", label: "date_of_birth" },
    { name: "email_id", type: "email", label: "email_id" },
    { name: "password", type: "password", label: "password" },
    { name: "mobile_number", type: "tel", label: "mobile_number" },
    { name: "alternate_number", type: "tel", label: "alternate_number" },
    { name: "father_number", type: "tel", label: "father_number" },
    { name: "mother_number", type: "tel", label: "mother_number" },
    { name: "current_address", type: "text", label: "current_address" },
    { name: "permanent_address", type: "text", label: "permanent_address" },
    { name: "designation", type: "text", label: "designation" },
    { name: "date_of_joining", type: "text", label: "date_of_joining" },
    { name: "company_id", type: "text", label: "company_id" },
  ];

  const formFieldsUpdate = [
    { name: "first_Name", type: "text", label: "first_Name" },
    { name: "last_name", type: "text", label: "last_name" },
    { name: "middle_Name", type: "text", label: "middle_Name" },
    { name: "date_of_birth", type: "text", label: "date_of_birth" },
    { name: "mobile_number", type: "tel", label: "mobile_number" },
    { name: "alternate_number", type: "tel", label: "alternate_number" },
    { name: "father_number", type: "tel", label: "father_number" },
    { name: "mother_number", type: "tel", label: "mother_number" },
    { name: "current_address", type: "text", label: "current_address" },
    { name: "permanent_address", type: "text", label: "permanent_address" },
    { name: "designation", type: "text", label: "designation" },
    { name: "date_of_joining", type: "text", label: "date_of_joining" },
    { name: "pancard", type: "text", label: "pancard" },
    { name: "ID_number", type: "text", label: "ID_number" },
    { name: "bank_name", type: "text", label: "bank_name" },
    { name: "bank_account", type: "text", label: "bank_account" },
    { name: "number_bank", type: "text", label: "number_bank" },
    { name: "IFSC_code", type: "text", label: "IFSC_code" },
    { name: "upload_Document", type: "text", label: "upload_Document" },
    { name: "employee_image", type: "text", label: "employee_image" },
  ];

  const validationSchemaAdd = Yup.object().shape({
    first_Name: Yup.string()
      .test(
        "len",
        "must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
  });

  const validationSchemaUpdate = Yup.object().shape({
    first_Name: Yup.string()
      .test(
        "len",
        "must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
  });

  useEffect(() => {
    if (currentEmployee) {
      setInitialValuesUpdate({
        first_Name: currentEmployee.first_Name || "",
        last_name: currentEmployee.last_name || "",
        middle_Name: currentEmployee.middle_Name || "",
        date_of_birth: currentEmployee.date_of_birth || "",
        mobile_number: currentEmployee.mobile_number || "",
        alternate_number: currentEmployee.alternate_number || "",
        father_number: currentEmployee.father_number || "",
        mother_number: currentEmployee.mother_number || "",
        current_address: currentEmployee.current_address || "",
        permanent_address: currentEmployee.permanent_address || "",
        designation: currentEmployee.designation || "",
        date_of_joining: currentEmployee.date_of_joining || "",
        pancard: currentEmployee.pancard || "",
        ID_number: currentEmployee.ID_number || "",
        bank_name: currentEmployee.bank_name || "",
        bank_account: currentEmployee.bank_account || "",
        number_bank: currentEmployee.number_bank || "",
        IFSC_code: currentEmployee.IFSC_code || "",
        upload_Document: currentEmployee.upload_Document || "",
        employee_image: currentEmployee.employee_image || "",
      });
    }
  }, [currentEmployee]);

  const handleEditClick = (employee) => {
    setIsUpdate(true);
    setCurrentEmployee(employee);
    setModelOpen(true);
  };
  const handleDeleteClick = (employee) => {
    setIsDelete(true);
    setCurrentEmployee(employee);
    setModelOpen(true);
  };

  const handleRegister = (formValue, { resetForm }) => {
    setSuccessful(false);
    dispatch(EmployeeSignup({ ...formValue, toast, router }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        toast.success("Employee added successfully");
        resetSuccessfulState();
        resetForm();
      })
      .catch(() => {
        setSuccessful(false);
        toast.error("Employee addition failed");
      });
  };

  const handleUpdate = (formValue, { resetForm }) => {
    setSuccessful(false);
    const updatedFormValue = { ...formValue, _id: currentEmployee?._id };

    dispatch(EmployeeUpdate(updatedFormValue))
      .then(() => {
        setSuccessful(true);
        toast.success("Employee updated successfully");
        resetSuccessfulState();
        resetForm();
      })
      .catch(() => {
        setSuccessful(false);
        toast.error("Employee update failed");
      });
  };

  const handleDelete = () => {
    setSuccessful(false);
    dispatch(EmployeeDelete(currentEmployee?._id))
      .then(() => {
        setSuccessful(true);
        toast.success("Employee deleted successfully");
        resetSuccessfulState();
      })
      .catch(() => {
        setSuccessful(false);
        toast.error("Employee deletion failed");
      });
  };

  const resetSuccessfulState = () => {
    setTimeout(() => {
      setSuccessful(false);
    }, 1000);
  };

  // format date/time
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const dayWithSuffix =
      day +
      (day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th");

    return `${dayWithSuffix} ${month}, ${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <PrivateRoute>
      <section className="company_dashboard_sec">
        <div>
          <h2 className="m-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {isClient ? `Hello ${companyName}!` : ""}
          </h2>
        </div>
        <div className="company_add_employee flex justify-center">
          <button
            onClick={() => {
              setIsUpdate(false);
              setIsDelete(false);
              setModelOpen(true);
            }}
            className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Add Employee
          </button>
          <DynamicModal
            title={
              isUpdate
                ? "Edit Employee"
                : isDelete
                ? "Delete Employee"
                : "Add New Employee"
            }
            isOpen={modelOpen}
            onClose={() => setModelOpen(false)}
            onSubmit={
              isUpdate ? handleUpdate : isDelete ? handleDelete : handleRegister
            }
            initialValues={
              isUpdate
                ? initialValuesUpdate
                : isDelete
                ? null
                : initialValuesAdd
            }
            validationSchema={
              isUpdate
                ? validationSchemaUpdate
                : isDelete
                ? null
                : validationSchemaAdd
            }
            formFields={
              isUpdate ? formFieldsUpdate : isDelete ? [] : formFieldsAdd
            }
            isDelete={isDelete}
          />
        </div>
        <div className="added_employee_list">
          <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 p-5 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {allemployeesbyID?.map((e) => (
              <div
                key={e._id}
                className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                style={{ position: "relative" }}
              >
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <svg
                      className="mr-1 w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                    </svg>
                    Designation: {e?.designation}
                  </span>
                  <span className="text-sm">
                    {formatDate(e?.date_of_joining)}
                  </span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {e?.first_Name + " " + e?.last_name}
                </h2>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Current Address: {e?.current_address}
                </p>
                <button
                  onClick={() => handleEditClick(e)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Edit Employee
                </button>
                <button
                  onClick={() => handleDeleteClick(e)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Delete Employee
                </button>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </section>
    </PrivateRoute>
  );
}
