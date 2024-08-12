"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCompany } from "@/lib/slices/companySlice";
import { useParams } from "next/navigation";

const SingleCompany = () => {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const params = useParams(); // Use useParams to get the slug

  const { singlecompany } = useSelector((state) => state.company);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (params.slug && isClient) {
      dispatch(getSingleCompany({ id: params.slug })); // Assuming id and slug are the same
    }
  }, [params.slug, isClient]);

  if (!isClient || !params.slug) return null; // Avoid rendering until client-side and slug are ready

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">{/* ... the rest of your rendering logic ... */}dfsdf</div>
    </section>
  );
};

export default SingleCompany;
