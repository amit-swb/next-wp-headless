"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SingleDetails() {
  const router = useRouter();

  const company = JSON.parse(localStorage.getItem("company"));

  useEffect(() => {
    if (!company) {
      router.push("/");
    }
  }, [company, router]);

  if (!company) {
    return null;
  }

  if (!company || !company.user) {
    return <div>No Company data available</div>;
  }

  const { _id, company_name, email_id } = company.user;

  return (
    <div>
      <h2>Hello @{company_name}</h2>
      <div>ID: {_id}</div>
      <div>First Name: {company_name}</div>
      <div>Email: {email_id}</div>
    </div>
  );
}
