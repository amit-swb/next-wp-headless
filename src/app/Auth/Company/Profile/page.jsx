"use client";
import { companyUpdate, setLogout } from "@/lib/slices/companySlice";
import { setLogout as companySetLogout } from "@/lib/slices/companySlice";
import { setLogout as employeeSetLogout } from "@/lib/slices/employeeSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import PrivateRoute from "../../../../Components/PrivateRoute/PrivateRoute";
import { selectCompanyData } from "@/lib/selector/selector";

const URL = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
var phoneRegEx = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export default function SingleDetails() {
  const dispatch = useDispatch();
  const router = useRouter();
  const companydata = useSelector(selectCompanyData);
  const company = companydata?.company?.user;
  console.log("company", company);

  useEffect(() => {
    if (!company) {
      router.push("/");
    }
  }, [router]);

  const _id = company?._id;

  const initialValues = {
    company_name: company?.company_name || "",
    company_website_url: company?.company_website_url || "",
    industry_business_location: company?.industry_business_location || "",
    company_address: company?.company_address || "",
    country: company?.country || "",
    city: company?.city || "",
    zip_code: company?.zip_code || "",
    mobile_number: company?.mobile_number || "",
    phone_number: company?.phone_number || "",
    contact_person: company?.contact_person || "",
    time_zone: company?.time_zone || "",
    date_format: company?.date_format || "",
    company_number: company?.company_number || "",
    company_tax_id: company?.company_tax_id || "",
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string()
      .test("len", "The company name must be between 3 and 40 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 40)
      .required("This field is required!"),

    company_website_url: Yup.string().matches(URL, "Website URL is not valid").required("This field is required!"),

    industry_business_location: Yup.string()
      .test("len", "The industry business location must be between 3 and 100 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 100)
      .required("This field is required!"),

    company_address: Yup.string()
      .test("len", "The company address must be between 5 and 100 characters.", (val) => val && val.toString().length >= 5 && val.toString().length <= 100)
      .required("This field is required!"),

    country: Yup.string()
      .test("len", "The country name must be between 2 and 56 characters.", (val) => val && val.toString().length >= 2 && val.toString().length <= 56)
      .required("This field is required!"),

    city: Yup.string()
      .test("len", "The city name must be between 2 and 85 characters.", (val) => val && val.toString().length >= 2 && val.toString().length <= 85)
      .required("This field is required!"),

    zip_code: Yup.string()
      .matches(/^\d{5}(?:[-\s]\d{4})?$/, "Must be a valid ZIP code")
      .required("This field is required!"),

    mobile_number: Yup.string().matches(phoneRegEx, "Must be a valid mobile number").required("This field is required!"),

    phone_number: Yup.string().matches(phoneRegEx, "Must be a valid phone number").required("This field is required!"),

    contact_person: Yup.string()
      .test("len", "The contact person name must be between 3 and 50 characters.", (val) => val && val.toString().length >= 3 && val.toString().length <= 50)
      .required("This field is required!"),

    time_zone: Yup.string().required("This field is required!"),

    date_format: Yup.date("Must be a valid date format").required("Date format is required"),

    company_number: Yup.string()
      .matches(/^[a-zA-Z0-9-]{1,30}$/, "Must be a valid company number")
      .required("This field is required!"),

    company_tax_id: Yup.string()
      .matches(/^[a-zA-Z0-9-]{1,30}$/, "Must be a valid company tax ID")
      .required("This field is required!"),
  });

  const handleUpdate = (formValue) => {
    const { company_name, company_website_url, industry_business_location, company_address, country, city, zip_code, mobile_number, phone_number, contact_person, time_zone, date_format, company_number, company_tax_id } = formValue;

    dispatch(
      companyUpdate({
        company_name,
        company_website_url,
        industry_business_location,
        company_address,
        country,
        city,
        zip_code,
        mobile_number,
        phone_number,
        contact_person,
        time_zone,
        date_format,
        company_number,
        company_tax_id,
        _id,
        router,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Company updated successfully");
        // Update localStorage
        const updatedCompany = {
          // ...company,
          user: {
            ...company,
            ...formValue,
          },
        };
        localStorage.setItem("companyToken", JSON.stringify(updatedCompany));
      })
      .catch(() => {
        toast.error("Failed to update company");
      });
  };

  // Logout from dashboard
  const handleLogOut = () => {
    dispatch(companySetLogout());
    dispatch(employeeSetLogout());
    toast.success("You have been loged out");
    router.push("/Auth/Company/LogIn");
  };

  const formFields = [
    { name: "company_name", type: "text", label: "Company Name" },
    { name: "company_website_url", type: "text", label: "Company Website URL" },
    {
      name: "industry_business_location",
      type: "text",
      label: "Industry Business Location",
    },
    { name: "company_address", type: "text", label: "Company Address" },
    { name: "country", type: "text", label: "Country" },
    { name: "city", type: "text", label: "City" },
    { name: "zip_code", type: "number", label: "Zip Code" },
    { name: "mobile_number", type: "tel", label: "Mobile Number" },
    { name: "phone_number", type: "tel", label: "Phone Number" },
    { name: "contact_person", type: "text", label: "Contact Person" },
    { name: "time_zone", type: "text", label: "Time Zone" },
    { name: "date_format", type: "text", label: "Date Format" },
    { name: "company_number", type: "number", label: "Company Number" },
    { name: "company_tax_id", type: "number", label: "Company Tax ID" },
  ];

  return (
    // <PrivateRoute>
    <section className="relative">
      <span className="cursor-pointer absolute right-3" onClick={handleLogOut}>
        Logout
      </span>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Update Company Profile</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleUpdate}>
              <Form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-2	gap-2">
                  {formFields.map(({ name, type, label }) => (
                    <div className="form-group" key={name}>
                      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {label}
                      </label>
                      <Field
                        name={name}
                        type={type}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage name={name} component="div" className="text-red-800" />
                    </div>
                  ))}
                </div>
                <div className="form-group mt-5">
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Update Profile
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
    // </PrivateRoute>
  );
}
