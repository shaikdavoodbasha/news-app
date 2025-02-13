
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const fetchTopHeadlines = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country: "us",
        apiKey: API_KEY,
        page,
        // pageSize: 10, // 10 articles per page
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    return [];
  }
};

export const fetchByCategory = async (category, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        category,
        apiKey: API_KEY,
        page,
        // pageSize: 10,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching category:", error);
    return [];
  }
};

export const fetchBySearch = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        apiKey: API_KEY,
        page,
        // pageSize: 10,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

// export const fetchAllArticles = async (page = 1) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/everything`, {
//       params: {
//         q: "news", 
//         language: "en", 
//         apiKey: API_KEY,
//         page,
       
//       },
//     });
//     return response.data.articles;
//   } catch (error) {
//     console.error("Error fetching all articles:", error.response?.data || error.message);
//     return [];
//   }
// };