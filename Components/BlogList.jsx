"use client";
import { assets } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import {
  fetchAllArticles,
  fetchByCategory,
  fetchBySearch,
  fetchTopHeadlines,
  totalArticles,
} from "@/utils/api";
import Loading from "./Loading";
import Image from "next/image";

const BlogList = () => {
  const [menu, setMenu] = useState("top-headlines");
  const [articles, setArticles] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  useEffect(() => {
    setLoading(true);
    const fetchArticles = async () => {
      let data;
      if (menu === "top-headlines") {
        data = await fetchTopHeadlines();
      } else {
        data = await fetchByCategory(menu);
      }

      if (search) {
        data = await fetchBySearch(search);
        setMenu("");
      } else if (menu === "top-headlines") {
        data = await fetchTopHeadlines();
      } else {
        data = await fetchByCategory(menu);
      }

      if (data && data.length > 0) {
        setArticles(data);
        setSearchData(data);
        setLoading(false);
      } else {
        setArticles([]);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [menu, search]);
  const totalPages = Math.floor(articles.length / itemsPerPage);
  console.log(totalPages);
  const dataDisplayed = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const onSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    setCurrentPage(1);
    setItemsPerPage(23);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="py-5 px-5 md:px-12 lg:px-28">
        {/* Header part */}
        <div className="flex justify-between items-center ">
          <h1 className="text-3xl md:text-4xl text-black font-semibold whitespace-nowrap">
            No News
          </h1>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black whitespace-nowrap ">
            News Today <Image src={assets.arrow} alt="arrowimg" />
          </button>
        </div>
        <div className="text-center my-8">
          <h1 className="text-3xl sm:text-5xl font-medium">Latest News</h1>
          <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Cupiditate, sapiente atque tempora dicta, ea culpa, temporibus
            deleniti est incidunt ipsum a maxime quo provident aspernatur rem
            delectus omnis repellendus minima?
          </p>
          <form
            onSubmit={onSubmit}
            className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black"
          >
            <input
              type="text"
              placeholder="Search news ..."
              className="pl-4 outline-none"
              value={search}
              onChange={onSearch}
            />
            <button
              type="submit"
              className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-700 active:text-white"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      {/* Search by category */}
      <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-7 my-4 sm:my-6 px-4">
        <button
          onClick={() => {
            setMenu("top-headlines");
            setCurrentPage(1);
            setSearch("");
            setItemsPerPage(7);
          }}
          className={
            menu === "top-headlines"
              ? "bg-black text-white py-1 px-4 rounded-sm whitespace-nowrap"
              : ""
          }
        >
          Top-Headlines
        </button>
        <button
          onClick={() => {
            setMenu("business");
            setCurrentPage(1);
            setSearch("");
            setItemsPerPage(7);
          }}
          className={
            menu === "business"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Business
        </button>
        <button
          onClick={() => {
            setMenu("technology");
            setCurrentPage(1);
            setSearch("");
            setItemsPerPage(7);
          }}
          className={
            menu === "technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Technology
        </button>
        <button
          onClick={() => {
            setMenu("sports");
            setCurrentPage(1);
            setSearch("");
            setItemsPerPage(7);
          }}
          className={
            menu === "sports" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          Sports
        </button>
        <button
          onClick={() => {
            setMenu("entertainment");
            setCurrentPage(1);
            setSearch("");
            setItemsPerPage(7);
          }}
          className={
            menu === "entertainment"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Entertainment
        </button>
      </div>
      <div className="flex justify-start px-12 sm:px-32 mb-5">
        {search && (
          <p className="text-black font-semibold  text-lg md:text-2xl ml-1 ">
            Your Search Results  for : <span className="ml-2">{search}</span>

          </p>
        )}
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
          {dataDisplayed.length > 0 ? (
            dataDisplayed.slice(1).map((item, index) => (
              <BlogItem
                key={index}
                id={item.source.name}
                title={item.title}
                url={item.url}
                description={item.description}
                publishedAt={new Date(item.publishedAt).toLocaleString(
                  "en-US",
                  {
                    timeZone: "Asia/Kolkata",
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  }
                )}
                image={item.urlToImage}
              />
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center my-8 px-3 md:px-5 ">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage == 1}
          className="px-4 py-2 bg-gray-300 rounded-lg mr-4"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={
              currentPage === index + 1
                ? "bg-blue-500 text-white px-4 py-2 ml-3"
                : "text-black bg-white border rounded px-4 py-2 ml-3"
            }
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage == totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg ml-4"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;
