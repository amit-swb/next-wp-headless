"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SingleDetails() {
  const router = useRouter();

  const user = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  if (!user || !user.user) {
    return <div>No user data available</div>;
  }

  const { _id, first_name, last_name, email_id, user_type } = user.user;

  return (
    <div>
      <h2>Hello @{first_name}</h2>
      <div>ID: {_id}</div>
      <div>First Name: {first_name}</div>
      <div>Last Name: {last_name}</div>
      <div>Email: {email_id}</div>
      <div>User Type: {user_type}</div>
    </div>
  );
}
