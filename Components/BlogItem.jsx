import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem = ({ title, description, publishedAt, image, id,url }) => {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]">
      {image && (
        <Link href={`/blogs/${id}`}>
          <img
            src={image}
            alt={title}
            className="w-[600px] h-[400px]  object-cover bg-black border"
          />
        </Link>
      )}
      <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">
        {publishedAt.toLocaleString()}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-3 text-sm tracking-tight text-gray-700">
          {description}
        </p>
        <a
         href={`/blogs/${id}`}
          className="inline-flex items-center py-2 font-semibold text-center"
        >
          Read More{" "}
          <Image className="ml-2" src={assets.arrow} alt="" width={12} />
        </a>
      </div>
    </div>
  );
};

export default BlogItem;
