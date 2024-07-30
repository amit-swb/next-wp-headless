"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { EmployeeDelete, EmployeeSignup, getEmployeesbyID } from "@/lib/slices/employeeSlice";
import { selectCompanyData, selectEmployeeData, selectHrData } from "@/lib/selector/selector";
import PrivateRoute from "../../../../Components/PrivateRoute/PrivateRoute";
import Link from "next/link";
import DynamicModalManager from "../../../../Components/PopupModel/modelConfigManager";
import { getHrbyID, HrDelete, hrSignup } from "@/lib/slices/hrSlice";

export default function CompanyDashboard() {
  const [isClient, setIsClient] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [password, setpassword] = useState("password");
  const [currentEmployee, setCurrentEmployee] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState("");
  const [modalAction, setModalAction] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const companydata = useSelector(selectCompanyData);
  const employeedata = useSelector(selectEmployeeData);
  const hrdata = useSelector(selectHrData);
  const company = companydata?.company?.user;
  const allemployeesbyID = employeedata?.allemployeesbyID;
  const allHrsbyID = hrdata?.allHrbyID;

  const noOfEmployees = allemployeesbyID.length;
  const noOfHrs = allHrsbyID.length;

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
      dispatch(getHrbyID({ companyID }));
    }
  }, [companyID, successful, dispatch]);

  useEffect(() => {
    if (successful) {
      setModelOpen(!modelOpen);
    }
  }, [successful]);

  const handleEmployeeRegister = (formValue, { resetForm }) => {
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
  const handleHrRegister = (formValue, { resetForm }) => {
    setSuccessful(false);
    dispatch(hrSignup({ formValue, toast, router }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        toast.success("HR added successfully");
        resetSuccessfulState();
        resetForm();
      })
      .catch(() => {
        setSuccessful(false);
        toast.error("HR addition failed");
      });
  };

  const handleEmployeeDelete = () => {
    setSuccessful(false);
    const deleteEmployeeID = { _id: currentEmployee?._id };
    dispatch(EmployeeDelete(deleteEmployeeID))
      .then(() => {
        setSuccessful(true);
        toast.success("Employee deleted successfully");
      })
      .catch(() => {
        setSuccessful(false);
        toast.error("Employee deletion failed");
      });
  };
  const handleHrDelete = () => {
    setSuccessful(false);
    const deleteHrID = { _id: currentEmployee?._id };
    dispatch(HrDelete(deleteHrID))
      .then(() => {
        setSuccessful(true);
        toast.success("Hr deleted successfully");
      })
      .catch(() => {
        setSuccessful(false);
        toast.error("Hr deletion failed");
      });
  };

  const openModal = (role, action) => {
    setModalRole(role);
    setModalAction(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalRole("");
    setModalAction("");
  };

  const handleDeleteClick = (employee) => {
    setCurrentEmployee(employee);
  };

  const resetSuccessfulState = () => {
    setTimeout(() => {
      setSuccessful(false);
    }, 1000);
  };

  const passwordVisible = () => {
    if (password == "password") {
      setpassword("text");
    } else {
      setpassword("password");
    }
  };

  useEffect(() => {
    if (successful) {
      closeModal();
    }
  }, [successful]);

  // format date/time
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const dayWithSuffix = day + (day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th");

    return `${dayWithSuffix} ${month}, ${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <PrivateRoute>
      <section className="company_dashboard_sec">
        <div>
          <h2 className="m-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{isClient ? `Hello ${companyName}!` : ""}</h2>
          <DynamicModalManager
            role={modalRole}
            action={modalAction}
            isOpen={isModalOpen}
            handleClose={closeModal}
            handleEmployeeRegister={handleEmployeeRegister}
            handleEmployeeDelete={handleEmployeeDelete}
            handleHrRegister={handleHrRegister}
            handleHrDelete={handleHrDelete}
            passwordVisible={passwordVisible}
            showPassword={password === "text"}
          />
        </div>
        <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 p-5 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" style={{ position: "relative" }}>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total Employees : {noOfEmployees}</p>
            <button
              onClick={() => openModal("employee", "register")}
              className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Add Employee
            </button>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" style={{ position: "relative" }}>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total Hrs : {noOfHrs}</p>
            <button
              onClick={() => openModal("hr", "register")}
              className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Add HR
            </button>
          </div>
        </div>
        <div className="added_employee_list">
          <h2 className="text-center mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Hr list</h2>
          <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 p-5 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {allHrsbyID?.map((e) => (
              <div key={e._id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" style={{ position: "relative" }}>
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                    </svg>
                    Designation: {e?.designation}
                  </span>
                  <span className="text-sm">{formatDate(e?.date_of_joining)}</span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link href={`/Auth/Company/Dashboard/Hr/${e._id}`}>{e?.first_Name + " " + e?.last_name}</Link>
                </h2>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Current Address: {e?.current_address}</p>
                <Link href={`/Auth/Company/Dashboard/Hr/${e._id}`}>
                  <button className="inline-flex mr-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Read More
                  </button>
                </Link>
                <button
                  onClick={() => {
                    openModal("hr", "delete");
                    handleDeleteClick(e);
                  }}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Delete hr
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="added_employee_list">
          <h2 className="text-center mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Employee list</h2>
          <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 p-5 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {allemployeesbyID?.map((e) => (
              <div key={e._id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" style={{ position: "relative" }}>
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                    </svg>
                    Designation: {e?.designation}
                  </span>
                  <span className="text-sm">{formatDate(e?.date_of_joining)}</span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link href={`/Auth/Company/Dashboard/Employee/${e._id}`}>{e?.first_Name + " " + e?.last_name}</Link>
                </h2>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Current Address: {e?.current_address}</p>
                <Link href={`/Auth/Company/Dashboard/Employee/${e._id}`}>
                  <button className="inline-flex mr-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Read More
                  </button>
                </Link>
                <button
                  onClick={() => {
                    openModal("employee", "delete");
                    handleDeleteClick(e);
                  }}
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
