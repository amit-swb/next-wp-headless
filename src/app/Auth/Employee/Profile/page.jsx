"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PrivateRoute from "../../../../Components/PrivateRoute/PrivateRoute";
import { selectEmployeeData } from "@/lib/selector/selector";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/lib/slices/adminSlice";
import { ToastContainer, toast } from "react-toastify";

export default function EmployeeProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const employeeState = useSelector(selectEmployeeData);
  console.log(employeeState);
  const auth = employeeState?.employee;
  const authData = auth?.user;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!auth) {
      router.push("/");
    }
  }, [auth, router]);

  // Logout from dashboard
  const handleLogOut = () => {
    dispatch(setLogout());
    toast.success("Employee Logout successfully");
    router.push("/Auth/Admin/LogIn");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <PrivateRoute>
      <div>
        <h3 className="text-right p-5 cursor-pointer" onClick={handleLogOut}>
          Logout
        </h3>
        {authData && (
          <>
            <h2>Hello @{authData.first_name}</h2>
            <div>ID: {authData._id}</div>
            <div>First Name: {authData.first_name}</div>
            <div>Last Name: {authData.last_name}</div>
            <div>Email: {authData.email_id}</div>
            <div>User Type: {authData.user_type}</div>
          </>
        )}
      </div>
      <ToastContainer />
    </PrivateRoute>
  );
}
