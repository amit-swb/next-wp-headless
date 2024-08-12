"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCompany } from "@/lib/slices/companySlice";
// import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const SingleCompany = () => {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const match = pathname.match(/\/([^\/]+)$/);
  const slug = match ? match[1] : "";

  const { singlecompany } = useSelector((state) => state.company);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (pathname && isClient) {
      dispatch(getSingleCompany({ id: pathname })); 
    }
  }, [pathname, isClient]);

  if (!isClient || !pathname) return null; 

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">dfsdf</div>
    </section>
  );
};

export default SingleCompany;
