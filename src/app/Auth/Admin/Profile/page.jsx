"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PrivateRoute from "../../../../Components/PrivateRoute/PrivateRoute";
import { selectAdminData } from "@/lib/selector/selector";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/lib/slices/adminSlice";

export default function AdminProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const authData = useSelector(selectAdminData);
  const auth = authData?.admin?.data?.user;
  console.log("profile", authData);

  // useEffect(() => {
  //   if (!auth) {
  //     router.push("/");
  //   }
  // }, [auth, router]);

  // if (!auth) {
  //   return null;
  // }

  // Logout from dashboard
  const handleLogOut = () => {
    dispatch(setLogout());
    router.push("/Auth/Admin/LogIn");
  };

  // const { _id, first_name, last_name, email_id, user_type } = auth;

  return (
    <PrivateRoute>
      <div>
        <h3 className="text-right p-5 cursor-pointer" onClick={handleLogOut}>
          Logout
        </h3>
        {/* <h2>Hello @{first_name}</h2>
        <div>ID: {_id}</div>
        <div>First Name: {first_name}</div>
        <div>Last Name: {last_name}</div>
        <div>Email: {email_id}</div>
        <div>User Type: {user_type}</div> */}
      </div>
    </PrivateRoute>
  );
}
