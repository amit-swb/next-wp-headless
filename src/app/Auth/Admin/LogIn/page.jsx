"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthLogin } from "@/lib/slices/adminSlice";
import Link from "next/link";
import { selectAdminData } from "@/lib/selector/selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AuthLoginScreen = () => {
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
    email_id: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email_id: Yup.string().email("This is not a valid email_id.").required("This field is required!"),
    password: Yup.string()
      .test("len", "The password must be between 6 and 40 characters.", (val) => val && val.toString().length >= 6 && val.toString().length <= 40)
      .required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { email_id, password } = formValue;
    setSuccessful(false);

    dispatch(AuthLogin({ email_id, password, toast, router }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        toast.success("Admin Login successfully");
      })
      .catch(() => {
        setSuccessful(false);
        toast.error("Admin Login Failed");
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
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Log in</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
              <Form className="space-y-4 md:space-y-6">
                {!successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="email_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        email_id
                      </label>
                      <Field
                        name="email_id"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage name="email_id" component="div" className="text-red-800" />
                    </div>

                    <div className="form-group mt-3 relative">
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        password
                      </label>
                      <Field
                        name="password"
                        type={password}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <FontAwesomeIcon icon={show ? faEyeSlash : faEye} onClick={passwordVisible} className="absolute cursor-pointer" style={{ width: "20px", top: "41px", right: "10px" }} />
                      <ErrorMessage name="password" component="div" className="text-red-800" />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-start">
                        {/* <div className="flex items-center h-5">
                          <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                        </div>
                        <div className="ml-3 text-sm">
                          <label for="remember" className="text-gray-500 dark:text-gray-300">
                            Remember me
                          </label>
                        </div> */}
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Forgot password?
                      </a>
                    </div>

                    <div className="form-group mt-5">
                      <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Login
                      </button>
                    </div>
                    <p className="text-sm mt-4 font-light text-gray-500 dark:text-gray-400">
                      Need to Create Account?
                      <Link href="/Auth/Admin/Registration" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Sign Up
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

export default AuthLoginScreen;
