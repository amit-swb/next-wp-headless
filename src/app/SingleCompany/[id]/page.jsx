"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCompany } from "@/lib/slices/companySlice";
import { useParams } from "next/navigation";

const SingleCompanyComponent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singlecompany } = useSelector((state) => state.company);

  useEffect(() => {
    if (id) {
      dispatch(getSingleCompany({ id }));
    }
  }, [id, dispatch]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <section className="bg-white dark:bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6" suppressHydrationWarning={true}>
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
              <span className="text-sm" suppressHydrationWarning>
                {formatDate(singlecompany.created_at)}
              </span>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{singlecompany.company_name}</h2>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Company Address: {singlecompany.company_address}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">City: {singlecompany.city}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Company Number: {singlecompany.company_number}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Company Tax ID: {singlecompany.company_tax_id}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Company Website URL: {singlecompany.company_website_url}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Contact Person: {singlecompany.contact_person}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Country: {singlecompany.country}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Date Format: {singlecompany.date_format}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Industry Business Location: {singlecompany.industry_business_location}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Mobile Number: {singlecompany.mobile_number}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Phone Number: {singlecompany.phone_number}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Time Zone: {singlecompany.time_zone}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Zip Code: {singlecompany.zip_code}</p>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Email: {singlecompany.email_id}</p>
          </article>
        )}
      </div>
    </section>
  );
};

const SingleCompany = dynamic(() => Promise.resolve(SingleCompanyComponent), { ssr: false });

export default SingleCompany;
