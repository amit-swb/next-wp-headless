"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Company = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <Suspense fallback={<p>Loading....</p>}>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">single company{id}</div>
      </section>
    </Suspense>
  );
};

export default Company;
