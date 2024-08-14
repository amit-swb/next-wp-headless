"use client";
import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompany } from "@/lib/slices/companySlice";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import { selectCompanyData } from "@/lib/selector/selector";

const AllCompany = () => {
  const dispatch = useDispatch();
  const companydata = useSelector(selectCompanyData);
  const allcompany = companydata?.allcompany;

  const [filter, setFilter] = useState("");

  const fetchAllCompany = useCallback(() => {
    dispatch(getAllCompany());
  }, [dispatch]);

  useEffect(() => {
    fetchAllCompany();
  }, [fetchAllCompany]);

  // function formatDate(dateString) {
  //   const options = { year: "numeric", month: "long", day: "numeric" };
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", options);
  // }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredCompanies = allcompany?.filter((company) => company.company_name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">All Companies</h2>
            <Formik>
              <Form>
                <Field
                  type="text"
                  placeholder="Filter by company name"
                  value={filter}
                  onChange={handleFilterChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form>
            </Formik>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {filteredCompanies?.map((company) => (
              <article key={company._id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                    </svg>
                    Tutorial
                  </span>
                  {/* <span className="text-sm">{formatDate(company.created_at)}</span> */}
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link href={`/company?id=${company?._id}`}>{company.company_name}</Link>
                </h2>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Email : {company.email_id}</p>
                <div className="flex justify-between items-center">
                  <Link href={`/company?id=${company?._id}`} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                    Read more
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllCompany;
