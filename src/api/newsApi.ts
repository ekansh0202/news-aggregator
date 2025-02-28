import axios from "axios";

const API_KEYS = {
    newsApi: "2f0b4ead-c2d4-4e1f-82d9-31c8c7aca521",
    guardian: "fafb2890-6f4b-4db3-89dd-8552f10a24cd",
    newsApiOrg: "331b67236fa6421ca8afb3165df0fcc8",
};
  

// Fetch news from newsApi
export const fetchNewsFromNewsApi = async () => {
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
        apiKey: API_KEYS.newsApi,
      };
    try {
      const response = await axios.post("https://eventregistry.org/api/v1/article/getArticles", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.articles.results.map((item: any) => ({
        ...item, sourceType: 'newsApi'
      }))
    } catch (error) {
      console.error("Error fetching from NewsAPI:", error);
      throw error;
    }
  };

  // Fetch news from guardian
  export const fetchNewsFromGuardianApi = async () => {
    try {
      const response = await axios.get("https://content.guardianapis.com/search", {
        params: {
          "show-elements": "image", 
          q: "sports, technology, health", 
          "api-key": API_KEYS.guardian, 
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.response.results.map((item: any) => ({
        ...item, sourceType: 'guardian'
      }))
    } catch (error) {
      console.error("Error fetching from The Guardian API:", error);
      throw error;
    }
  };

    // Fetch news from newsApi.org
  export const fetchNewsFromNewsApiOrg = async () => {
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: "us", 
          apiKey: API_KEYS.newsApiOrg, 
        },
      });
  
      return response.data.articles.map((item: any) => ({
        ...item, sourceType: 'newsApiOrg'
      }))
    } catch (error) {
      console.error("Error fetching top headlines:", error);
      throw error;
    }
  };