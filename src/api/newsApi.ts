import axios from "axios";

const API_KEYS = {
    newsAPI: "2f0b4ead-c2d4-4e1f-82d9-31c8c7aca521",
    guardian: "",
    nytimes: "",
};
  

// Fetch news from NewsAPI
export const fetchNewsFromNewsAPI = async () => {
    const data = {
        query: {
          $query: {
            $and: [
              {
                conceptUri: "http://en.wikipedia.org/wiki/Technology",
              },
              {
                conceptUri: "http://en.wikipedia.org/wiki/Sport",
              },
              {
                lang: "eng",
              },
            ],
          },
          $filter: {
            forceMaxDataTimeWindow: "31",
          },
        },
        resultType: "articles",
        articlesSortBy: "rel",
        "includeArticleImage": true,
        "includeSourceDescription": true,
        "includeSourceLocation": true,
        apiKey: API_KEYS.newsAPI,
      };
    try {
      const response = await axios.post("https://eventregistry.org/api/v1/article/getArticles", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching from NewsAPI:", error);
      throw error;
    }
  };