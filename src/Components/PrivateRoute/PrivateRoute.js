import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    const company = localStorage.getItem("companyToken");
    // const employee = localStorage.getItem("employeeToken");
    // const hr = localStorage.getItem("employeeToken");

    if (!admin && !company) {
      router.push("/");
    }
  }, [router]);

  return children;
};

export default PrivateRoute;
