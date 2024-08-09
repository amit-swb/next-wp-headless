"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCompany } from "@/lib/slices/companySlice";
import { useParams } from "next/navigation";

const SingleCompany = () => {
  // const dispatch = useDispatch();
  // const { id } = useParams();
  // const { singlecompany } = useSelector((state) => state.company);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getSingleCompany({ id }));
  //   }
  // }, [id]);

  return <></>;
};

export default SingleCompany;
