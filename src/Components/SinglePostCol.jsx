"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import placeholder from "../Images/placeholder.svg";

export const SinglePostCol = ({ post }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.01,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [controls, inView]);

  // format date/time
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const dayWithSuffix = day + (day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th");

    return `${dayWithSuffix} ${month}, ${year} ${hours}:${minutes}`;
  }

  return (
    <motion.article
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 50 }}
      whileHover={{
        boxShadow: "rgba(203, 213, 225, 0.2) -5px 5px, rgba(203, 213, 225, 0.1) -10px 10px, rgba(203, 213, 225, 0.05) -15px 15px",
      }}
      className="rounded-2xl flex max-w-xl flex-col items-start justify-between overflow-hidden"
      style={{ position: "relative" }}
    >
      <Link href={`/single-details/${post.id}`} style={{ position: "absolute", width: "100%", height: "100%", left: "0", top: "0", zIndex: "1" }}></Link>
      <div className="group w-full relative p-5 bg-slate-300 cursor-pointer h-full flex flex-col">
        {post.featured_media ? (
          <Image className="w-full bg-gray-50 rounded-xl aspect-square object-cover" src={post.featured_media} width={0} height={0} sizes="100vw" alt="Featured Media" />
        ) : (
          <Image className="w-full bg-gray-50 rounded-xl aspect-square object-cover" src={placeholder} width={0} height={0} sizes="100vw" alt="Placeholder" />
        )}
        <div className="mt-3 flex items-center gap-x-4 text-xs">
          <time dateTime={post.created_at} className="text-gray-500">
            {formatDate(post.created_at)}
          </time>
          <span>{post.categories[0]}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-6 ">
          <Link href={`/single-details/${post.id}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 mb-3 line-clamp-3 text-sm leading-6 ">{post.content}</p>
        <Link href={`/single-details/${post.id}`} className="mt-auto mb-0 block text-lg font-semibold leading-6  group-hover:text-gray-600">
          Read More
        </Link>
      </div>
    </motion.article>
  );
};
