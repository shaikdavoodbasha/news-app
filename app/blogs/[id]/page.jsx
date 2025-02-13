"use client";
import { fetchAllArticles, fetchTopHeadlines } from "@/utils/api";
import React, { useEffect, useState } from "react";
import Loading from "@/Components/Loading";

const Page = ({ params }) => {
  const categoryName = decodeURIComponent(params.id);
  const [articles, setArticles] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = () => {
     
      const matchingArticle = articles.find(
        (article) => article.source.name === categoryName
      );
      if (matchingArticle) {
        setData([matchingArticle]); 
        console.log("Matching article:", matchingArticle);
      } else {
        console.log("No articles found for category:", categoryName);
      }
      setLoading(false); 
    };

   
    if (articles.length > 0) {
      fetchBlogData();
    }
  }, [articles, categoryName]);

  
  useEffect(() => {
    fetchTopHeadlines()
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.error("Error fetching top headlines:", error);
        setLoading(false); 
      });
  }, []);

  
  if (loading) {
    return <Loading />;
  }


  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <p>No articles found for category: {categoryName}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28 flex flex-col justify-center items-center text-center gap-4">
      <h1 className="text-2xl font-bold mb-4">Article for {categoryName}</h1>
      <div className="flex flex-col justify-center items-center gap-4">
        {data.map((article, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-sm text-start flex flex-col tracking-tight items-start gap-4"
          >
            <img
              src={article.urlToImage}
              alt=""
              className="w-full h-full object-cover rounded"
            />
            <h1 className="text-sm font-semibold text-gray-500">
              Author: {article.author}
            </h1>
            <h2 className="text-xl font-semibold text-gray-950">Title : {article.title}</h2>
            <p className="text-gray-600">{article.description}</p>
            <p className="text-gray-800">{article.content}</p>
            <p className="text-sm text-black">
              {new Date(article.publishedAt).toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
