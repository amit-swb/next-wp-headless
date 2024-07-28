"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import "../BreadCrumb/Breadcrumb.css";

const Breadcrumb = () => {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const pathArray = pathname.split("/").filter((path) => path);

    return pathArray
      .map((rawPath, index) => {
        const path = rawPath.toLowerCase();

        if (path === "auth" || path === "pages") {
          return null;
        }

        let isDisabled = false;
        const href = "/" + pathArray.slice(0, index + 1).join("/");
        let text;

        switch (path) {
          case "admin":
            text = "Admin";
            isDisabled = true;
            break;
          case "profile":
            text = "Profile";
            isDisabled = true;
            break;
          case "registration":
            text = "Registration";
            break;
          case "company":
            text = "Company";
            isDisabled = true;
            break;
          case "employee":
            text = "Employee";
            isDisabled = true;
            break;
          case "singlecompany":
            text = "Singlecompany";
            isDisabled = true;
            break;
          default:
            text = path.charAt(0).toUpperCase() + path.slice(1);
        }
        return { href, text, isDisabled };
      })
      .filter(Boolean);
  }, [pathname]);

  return (
    <nav aria-label="breadcrumb" className="m-3">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
          <span className="breadcrumb-separator">{" / "}</span>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="breadcrumb-item">
            {breadcrumb.isDisabled ? (
              <span className="breadcrumb-disabled">{breadcrumb.text}</span>
            ) : (
              <Link href={breadcrumb.href} legacyBehavior>
                <a>{breadcrumb.text}</a>
              </Link>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator">{" / "}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
