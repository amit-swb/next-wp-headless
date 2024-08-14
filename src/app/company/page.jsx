"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCompany } from "@/lib/slices/companySlice";
import { useSearchParams } from "next/navigation";

const SingleCompany = ({}) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);

  const { singlecompany } = useSelector((state) => state.company);

  useEffect(() => {
    if (id) {
      dispatch(getSingleCompany({ id }));
    }
  }, [id]);

  if (!id) return <div>Loading...</div>;

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">{singlecompany ? <div>{singlecompany.name}</div> : "Loading..."}single company</div>
    </section>
  );
};

export default SingleCompany;
