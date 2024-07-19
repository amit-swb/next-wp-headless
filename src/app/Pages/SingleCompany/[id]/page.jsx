"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCompany } from "@/lib/slices/companySlice";
import { useParams } from "next/navigation";

const SingleCompany = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singlecompany } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getSingleCompany({ id }));
  }, [id]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Single Company Detail</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-1">
            {singlecompany && (
              <article key={singlecompany._id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                    </svg>
                    Tutorial
                  </span>
                  <span className="text-sm">{formatDate(singlecompany.created_at)}</span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{singlecompany.company_name} </h2>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">company_address : {singlecompany.company_address}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">city :{singlecompany.city}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">company_number : {singlecompany.company_number}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">company_tax_id : {singlecompany.company_tax_id}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">company_website_url : {singlecompany.company_website_url}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">contact_person : {singlecompany.contact_person}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">country :{singlecompany.country}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">date_format :{singlecompany.date_format}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">industry_business_location :{singlecompany.industry_business_location}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">mobile_number :{singlecompany.mobile_number}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">phone_number :{singlecompany.phone_number}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">time_zone :{singlecompany.time_zone}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">zip_code :{singlecompany.zip_code}</p>
                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Email : {singlecompany.email_id}</p>
              </article>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleCompany;
