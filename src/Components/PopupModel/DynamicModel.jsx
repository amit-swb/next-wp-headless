// Components/PopupModel/DynamicModal.js

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const DynamicModal = ({ onFileChange, title, isOpen, onClose, initialValues, validationSchema, onSubmit, formFields, showPassword, passwordVisible, isDelete, isUpdate }) => {
  return (
    <div id="dynamic_modal" tabIndex="-1" aria-hidden="true" className={`flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${!isOpen ? "hidden" : ""}`}>
      <div className="relative p-4 w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4">
            {!isDelete && (
              <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className="space-y-4 md:space-y-6" encType="multipart/form-data">
                  <div className="grid grid-cols-2 gap-2">
                    <>
                      {formFields.map(({ name, type, label }) => (
                        <div className="form-group relative" key={name}>
                          <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {label}
                          </label>
                          <Field
                            name={name}
                            type={name === "password" ? showPassword : type}
                            disabled={name === "company_id"}
                            {...(name === "employee_image" && { onChange: onFileChange })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                          {name === "password" && (
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                              onClick={passwordVisible}
                              className="absolute cursor-pointer"
                              style={{
                                width: "20px",
                                top: "41px",
                                right: "10px",
                              }}
                            />
                          )}
                          <ErrorMessage name={name} component="div" className="text-red-800" />
                        </div>
                      ))}
                    </>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="form-group">
                      <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        {title}
                      </button>
                    </div>
                    <div className="form-group">
                      <button
                        type="button"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            )}
            {isDelete && (
              <div className="grid grid-cols-2 gap-2">
                <div className="form-group">
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Delete
                  </button>
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;
