import axios from "axios";
import { v4 as uuidv4 } from "uuid";


// API Keys
const API_KEYS = {
  newsApi: import.meta.env.VITE_NEWS_API,
  guardian: import.meta.env.VITE_GUARDIAN,
  nyt: import.meta.env.VITE_NYT,
  newsApiOrg: import.meta.env.VITE_NEWS_API_ORG,
};

// All api calls are added here


// Fetch news from newsApi
export const fetchNewsFromNewsApi = async (
  categories: string[] = [],
  sources: string[] = []
) => {
  // Default categories if none are provided
  const defaultCategories = ["Technology", "Sport"];

  // Use default categories if no categories are passed
  const categoryUris = (
    categories.length > 0 ? categories : defaultCategories
  ).map((category) => `http://en.wikipedia.org/wiki/${category}`);

  // Construct dynamic query for sources if sources are provided
  const sourceUris = sources.map(
    (source) => `http://en.wikipedia.org/wiki/${source}`
  );

  // Construct the data payload
  const data = {
    query: {
      $query: {
        $and: [
          ...categoryUris.map((categoryUri) => ({ conceptUri: categoryUri })),
          ...(sourceUris.length > 0
            ? sourceUris.map((sourceUri) => ({ conceptUri: sourceUri }))
            : []),
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
    includeArticleImage: true,
    includeSourceDescription: true,
    includeSourceLocation: true,
    apiKey: API_KEYS.newsApi, // Ensure API_KEY is set in your environment
  };

  try {
    // Send the request to the API
    const response = await axios.post(
      "https://eventregistry.org/api/v1/article/getArticles",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Return the articles, adding dynamic ID and sourceType
    return response.data.articles.results.map((item: any) => ({
      ...item,
      sourceType: "newsApi",
      id: uuidv4(), // Adding a unique ID to each article
    }));
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    throw error;
  }
};

// Fetch news from guardian
export const fetchNewsFromGuardianApi = async (categories: string[] = []) => {
  try {
    const response = await axios.get(
      "https://content.guardianapis.com/search",
      {
        params: {
          "show-elements": "image",
          q: categories.join(" "),
          "api-key": API_KEYS.guardian,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.response.results.map((item: any) => ({
      ...item,
      sourceType: "guardian",
      id: uuidv4(),
    }));
  } catch (error) {
    console.error("Error fetching from The Guardian API:", error);
    throw error;
  }
};

// Fetch news from newsApi.org
// This api doesn't support sources parameter mixed with country or category
export const fetchNewsFromNewsApiOrg = async (sources: string[] = []) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country: "us",
        apiKey: API_KEYS.newsApiOrg,
        sources: sources.join(","),
      },
    });

    return response.data.articles.map((item: any) => ({
      ...item,
      sourceType: "newsApiOrg",
      id: uuidv4(),
    }));
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error;
  }
};

// Fetch news from new york times(nyt)
// export const fetchNewsFromNewYorkTimesApi = async (categories: string[] = [], sources: string[] = []) => {
//   try {
//     const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json`, {
//       params: {
//         "api-key": API_KEYS.nyt,
//       },
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data.results.map((item: any) => ({
//       ...item, sourceType: 'nyt', id: uuidv4()
//     }))
//   } catch (error) {
//     console.error("Error fetching from NYT API:", error);
//     throw error;
//   }
// };
