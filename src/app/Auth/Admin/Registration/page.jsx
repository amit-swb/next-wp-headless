"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthRegistration } from "@/lib/slices/adminSlice";
import Link from "next/link";
import { selectAdminData } from "@/lib/selector/selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

var phoneRegEx =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const UserRegistration = () => {
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
    email_id: "",
    phone_number: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .test(
        "len",
        "The first_name must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    last_name: Yup.string()
      .test(
        "len",
        "The last_name must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email_id: Yup.string()
      .email("This is not a valid email_id.")
      .required("This field is required!"),
    phone_number: Yup.string()
      .matches(phoneRegEx, "Phone number is not valid")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { first_name, last_name, email_id, phone_number, password } =
      formValue;
    setSuccessful(false);

    dispatch(
      AuthRegistration({
        first_name,
        last_name,
        email_id,
        phone_number,
        password,
        toast,
        router,
      })
    )
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
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

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account(Admin)
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              <Form className="space-y-4 md:space-y-6">
                {!successful && (
                  <div>
                    <div className="form-group">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        first_name
                      </label>
                      <Field
                        name="first_name"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-red-800"
                      />
                    </div>

                    <div className="form-group mt-3">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        last_name
                      </label>
                      <Field
                        name="last_name"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-red-800"
                      />
                    </div>

                    <div className="form-group mt-3">
                      <label
                        htmlFor="email_id"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        email_id
                      </label>
                      <Field
                        name="email_id"
                        type="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="email_id"
                        component="div"
                        className="text-red-800"
                      />
                    </div>

                    <div className="form-group mt-3">
                      <label
                        htmlFor="phone_number"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        phone_number
                      </label>
                      <Field
                        name="phone_number"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="phone_number"
                        component="div"
                        className="text-red-800"
                      />
                    </div>

                    <div className="form-group mt-3 relative">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        password
                      </label>
                      <Field
                        name="password"
                        type={password}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <FontAwesomeIcon
                        icon={show ? faEyeSlash : faEye}
                        onClick={passwordVisible}
                        className="absolute cursor-pointer"
                        style={{ width: "20px", top: "41px", right: "10px" }}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-800"
                      />
                    </div>

                    <div className="form-group mt-5">
                      <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Sign Up
                      </button>
                    </div>
                    <p className="text-sm mt-4 font-light text-gray-500 dark:text-gray-400">
                      Already have an account?
                      <Link
                        href="/Auth/Admin/LogIn"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login here
                      </Link>
                    </p>
                  </div>
                )}
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default UserRegistration;
