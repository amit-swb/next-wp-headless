"use client";
import React from "react";

const Company = ({ params }) => {
  const { id } = params;

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">single company{id}</div>
    </section>
  );
};

export default Company;
