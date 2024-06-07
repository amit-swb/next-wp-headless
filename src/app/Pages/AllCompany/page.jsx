"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompany } from "@/lib/slices/companySlice";

export default function AllCompany() {
  const { allcompany } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  console.log(allcompany);

  useEffect(() => {
    dispatch(getAllCompany());
  }, [dispatch]);

  // Image Loader
  //   const myLoader = (c) => {
  //     return (props) => {
  //       return `${c.featured_media}`;
  //     };
  //   };

  return <></>;
}
