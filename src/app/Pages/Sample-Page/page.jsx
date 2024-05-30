"use client";
import { BASE_API_URL } from "@/Readme";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SamplePage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_API_URL}/pages`);
      setData(res.data.data);
      console.log(res.data.data);
      setIsLoading(false);
    } catch {
      (error) => console.error("Error:", error);
    }
  };
  // Remove Html tags from the response
  function removeHtmlTags(str) {
    if (!str) return "";
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
        sample page
        {isLoading ? (
          <div className="text-lg leading-8 text-gray-600 absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <svg width="42" height="50" viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                id="arrow"
                d="M39.6552 29.3103C39.6552 39.7672 31.1466 48.2759 20.6897 48.2759C10.2328 48.2759 1.72414 39.7672 1.72414 29.3103C1.72414 18.8534 10.1897 10.3793 20.6207 10.3448V18.9655L37 9.48276L20.6207 0V8.62069C9.22414 8.65517 0 17.9052 0 29.3103C0 40.7155 9.25862 50 20.6897 50C32.1207 50 41.3793 40.7328 41.3793 29.3103H39.6552ZM22.3448 2.99138L33.5603 9.48276L22.3448 15.9741V2.99138Z"
                fill="#99A7DD"
              ></path>
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 0 4.2" to="360 0 4.2" dur="0.4s" repeatCount="indefinite"></animateTransform>
            </svg>
          </div>
        ) : (
          data?.map((c) => {
            return (
              <div key={c.id}>
                <h2 className="text-3xl font-bold">Title: {c.title}</h2>
                <p>Description: {removeHtmlTags(c.content)}</p>
                {c.featured_media && <Image src={c.featured_media} width={150} height={150} alt={c.title} />}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
