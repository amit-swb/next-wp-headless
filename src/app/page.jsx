"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { SinglePostCol } from "../Components/SinglePostCol";
import { useSelector, useDispatch } from "react-redux";
import { fetchPost } from "../app/lib/slices/slice";

export default function Home() {
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  return (
    <motion.div initial="hidden" animate="visible" exit={{ opacity: 0, transition: { duration: 1 } }} variants={{ visible: { transition: { staggerChildren: 0.3 } } }} className="blog_listing py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Blog Listing page</h2>
          <p className="mt-2 text-lg leading-8 ">Learn how to grow your business with our expert advice.</p>
        </div>
        {loading ? (
          <div className="text-lg leading-8  absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
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
          <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts?.map((post) => (
              <SinglePostCol key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
