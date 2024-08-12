"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCompany } from "@/lib/slices/companySlice";
import { useParams } from "next/navigation";

const SingleCompany = () => {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams;
  console.log(id);

  const { singlecompany } = useSelector((state) => state.company);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (id && isClient) {
      dispatch(getSingleCompany({ id }));
    }
  }, [id, isClient]);

  if (!isClient) return null; // Avoid rendering until the client-side is ready

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">{/* ... the rest of your rendering logic ... */}</div>
    </section>
  );
};

export default SingleCompany;
