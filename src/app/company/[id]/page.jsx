"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSingleCompany } from "@/lib/slices/companySlice";
import { Suspense } from "react";

const Company = ({ params }) => {
  const dispatch = useDispatch();
  const { id } = params;
  console.log(id);

  useEffect(() => {
    if (id) {
      dispatch(getSingleCompany({ id }));
    }
  }, [id]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">single company</div>
      </section>
    </Suspense>
  );
};

export default Company;
