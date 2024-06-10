"use client";

import { companyUpdate } from "@/lib/slices/companySlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

export default function SingleDetails() {
  const dispatch = useDispatch();

  const company = JSON.parse(localStorage.getItem("companyTocken"));
  const router = useRouter();

  useEffect(() => {
    if (!company) {
      router.push("/");
    }
  }, [company, router]);

  if (!company) {
    return null;
  }

  if (!company) {
    return <div>No Company data available</div>;
  }

  const { _id } = company;

  const initialValues = {
    company_name: company.company_name || "",
    company_website_url: company.company_website_url || "",
    industry_business_location: company.industry_business_location || "",
    company_address: company.company_address || "",
    country: company.country || "",
    city: company.city || "",
    zip_code: company.zip_code || "",
    mobile_number: company.mobile_number || "",
    phone_number: company.phone_number || "",
    contact_person: company.contact_person || "",
    time_zone: company.time_zone || "",
    date_format: company.date_format || "",
    company_number: company.company_number || "",
    company_tax_id: company.company_tax_id || "",
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string()
      .test("len", "The first_name must be between 3 and 20 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 40)
      .required("This field is required!"),
  });

  const handleUpdate = (formValue) => {
    const { company_name, company_website_url, industry_business_location, company_address, country, city, zip_code, mobile_number, phone_number, contact_person, time_zone, date_format, company_number, company_tax_id } = formValue;

    dispatch(companyUpdate({ company_name, company_website_url, industry_business_location, company_address, country, city, zip_code, mobile_number, phone_number, contact_person, time_zone, date_format, company_number, company_tax_id, _id }))
      .unwrap()
      .then(() => {
        toast.success("Company updated successfully");
        // Update localStorage
        const updatedCompany = {
          ...company,
          ...formValue,
        };
        localStorage.setItem("companyTocken", JSON.stringify(updatedCompany));
      })
      .catch(() => {
        toast.error("Failed to update company");
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Update Company Profile</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleUpdate}>
              <Form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-2	gap-2">
                  <div className="form-group">
                    <label htmlFor="company_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      company_name
                    </label>
                    <Field
                      name="company_name"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="company_name" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company_website_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      company_website_url
                    </label>
                    <Field
                      name="company_website_url"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="company_website_url" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="industry_business_location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      industry_business_location
                    </label>
                    <Field
                      name="industry_business_location"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="industry_business_location" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company_address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      company_address
                    </label>
                    <Field
                      name="company_address"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="company_address" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      country
                    </label>
                    <Field
                      name="country"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="country" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      city
                    </label>
                    <Field
                      name="city"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="city" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      zip_code
                    </label>
                    <Field
                      name="zip_code"
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="zip_code" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      mobile_number
                    </label>
                    <Field
                      name="mobile_number"
                      type="tel"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="mobile_number" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      phone_number
                    </label>
                    <Field
                      name="phone_number"
                      type="tel"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="phone_number" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact_person" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      contact_person
                    </label>
                    <Field
                      name="contact_person"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="contact_person" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time_zone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      time_zone
                    </label>
                    <Field
                      name="time_zone"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="time_zone" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date_format" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      date_format
                    </label>
                    <Field
                      name="date_format"
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="date_format" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      company_number
                    </label>
                    <Field
                      name="company_number"
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="company_number" component="div" className="text-red-800" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company_tax_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      company_tax_id
                    </label>
                    <Field
                      name="company_tax_id"
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="company_tax_id" component="div" className="text-red-800" />
                  </div>

                  <div className="form-group mt-5">
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      Update Profile
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
