"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import placeholder from "../../../Images/placeholder.svg";
import { useDispatch, useSelector } from "react-redux";
import { singleBlogDetails } from "@/lib/slices/slice";

export default function SingleDetails() {
  const { singlePost, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(singleBlogDetails(id));
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
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
        singlePost?.map((c) => {
          return (
            <div className="max-w-screen-xl mx-auto" key={c.id}>
              <main className="mt-10">
                <div className="mb-4 md:mb-0 w-full max-w-screen-lg mx-auto relative" style={{ height: "24em" }}>
                  <div className="absolute left-0 bottom-0 w-full h-full z-10" style={{ backgroundImage: "linear-gradient(180deg,transparent,rgba(0,0,0,.7))" }}></div>
                  {c.featured_media && <Image className="absolute left-0 top-0 w-full h-full object-cover" src={c.featured_media} width={0} height={0} sizes="100vw" alt={c.title} />}
                  {!c.featured_media && <Image className="absolute left-0 top-0  w-full h-full z-0 object-cover" src={placeholder} width={0} height={0} sizes="100vw" alt="Placeholder" />}
                  <div className="p-4 absolute bottom-0 left-0 z-20">
                    <a href="#" className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">
                      <p>Id: {c.id}</p>
                    </a>
                    <h2 className="text-4xl font-semibold text-gray-100 leading-tight">{c.title}</h2>
                    <div className="flex mt-3">
                      <img src="https://randomuser.me/api/portraits/men/97.jpg" className="h-10 w-10 rounded-full mr-2 object-cover" />
                      <div>
                        <p className="font-semibold text-gray-200 text-sm"> {c.meta.big_title} </p>
                        <p className="font-semibold text-gray-400 text-xs"> {c.meta.faq_title} </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 lg:px-0 mt-12 max-w-screen-md mx-auto text-lg leading-relaxed">
                  <p className="pb-6">{c.content}</p>
                </div>
              </main>
            </div>
          );
        })
      )}
    </>
  );
}
