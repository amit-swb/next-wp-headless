"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { selectAdminData } from "@/lib/selector/selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { EmployeeSignup } from "@/lib/slices/employeeSlice";

var phoneRegEx = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const EmployeeRegistration = () => {
  const [successful, setSuccessful] = useState(false);
  const [show, setShow] = useState(true);
  const [password, setpassword] = useState("password");

  // const { error } = useSelector((state) => ({ ...state.auth }));
  const { error } = useSelector(selectAdminData);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const initialValues = {
    first_name: "",
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
    company_id: "",
    employee_id: "",
  };

  const validationSchema = Yup.object().shape({
    // first_name: Yup.string()
    //   .test("len", "The first_name must be between 3 and 20 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 20)
    //   .required("This field is required!"),
    // last_name: Yup.string()
    //   .test("len", "The last_name must be between 3 and 20 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 20)
    //   .required("This field is required!"),
    // email_id: Yup.string().email("This is not a valid email_id.").required("This field is required!"),
    // phone_number: Yup.string().matches(phoneRegEx, "Phone number is not valid").required("This field is required!"),
    // password: Yup.string()
    //   .test("len", "The password must be between 6 and 40 characters.", (val) => val && val.toString().length >= 6 && val.toString().length <= 40)
    //   .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { first_name, last_name, middle_Name, date_of_birth, email_id, password, mobile_number, alternate_number, father_number, mother_number, current_address, permanent_address, designation, date_of_joining, company_id, employee_id } = formValue;
    setSuccessful(false);

    dispatch(
      EmployeeSignup({
        first_name,
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
        employee_id,
        toast,
        router,
      })
    )
      .unwrap()
      .then(() => {
        setSuccessful(true);
        toast.success("Employee Registration successfully");
      })
      .catch(() => {
        setSuccessful(false);
        toast.error("Employee Registration failed");
      });
  };

  const passwordVisible = () => {
    if (password == "password") {
      setpassword("text");
      setShow(false);
    } else {
      setpassword("password");
      setShow(true);
    }
  };

  const formFields = [
    { name: "first_name", type: "text", label: "first_name" },
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
    { name: "company_id", type: "number", label: "company_id" },
    { name: "employee_id", type: "number", label: "employee_id" },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an account(Employee)</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleRegister}>
              <Form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-2	gap-2">
                  {formFields.map(({ name, type, label }) => (
                    <div className="form-group relative" key={name}>
                      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {label}
                      </label>
                      <Field
                        name={name}
                        type={type}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {/* {name === "password" && <FontAwesomeIcon icon={show ? faEyeSlash : faEye} onClick={passwordVisible} className="absolute cursor-pointer" style={{ width: "20px", top: "41px", right: "10px" }} />} */}
                      <ErrorMessage name={name} component="div" className="text-red-800" />
                    </div>
                  ))}
                  <div className="form-group mt-5">
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      Sign Up
                    </button>
                  </div>
                  {/* <p className="text-sm mt-4 font-light text-gray-500 dark:text-gray-400">
                    Already have an account?
                    <Link href="/Auth/Admin/LogIn" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Login here
                    </Link>
                  </p> */}
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default EmployeeRegistration;
