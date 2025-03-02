import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewsStart,
  fetchNewsuccess,
  fetchNewsFailure,
  setArticles,
  fetchNewForSource,
  setArticlesWithDate,
  setSourceType,
} from "../redux/newsSlice";
import {
  fetchNewsFromNewsApi,
  fetchNewsFromGuardianApi,
  fetchNewsFromNewsApiOrg,
  // fetchNewsFromNewYorkTimesApi,
} from "../api/newsApi";
import { AppDispatch, RootState } from "../redux/store";

const useFetchNews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasFetched = useRef(false);
  const { allArticles } = useSelector((state: RootState) => state.news);

  // Get news from all endpoints
  const getNews = async () => {
    dispatch(fetchNewsStart());
    try {
      const results = await Promise.allSettled([
        fetchNewsFromNewsApi(),
        fetchNewsFromGuardianApi(),
        // fetchNewsFromNewYorkTimesApi(),
        fetchNewsFromNewsApiOrg(),
      ]);
  
      const successfulResults = results.filter(result => result.status === 'fulfilled');
      const failedResults = results.filter(result => result.status === 'rejected');
  
      const allNewsData = successfulResults.map(result => result.value);
  
      if (allNewsData.length > 0) {
        dispatch(fetchNewsuccess(allNewsData));
      }
  
      if (failedResults.length > 0) {
        dispatch(fetchNewsFailure("Some news APIs failed"));
      }
  
      hasFetched.current = true;
    } catch (error) {
      dispatch(fetchNewsFailure("Failed to fetch news"));
    }
  };
  
  //  Get news from a specific source
  const getNewsItemsFromSource = async (sourceType: string, categories: string[] = [], sources: string[] = []) => {
    dispatch(fetchNewsStart());
    try{
      let newsData: any = [];
      switch(sourceType){
        case 'all':
          getNews();
          break;
        case 'newsApi':
          newsData = await fetchNewsFromNewsApi(categories, sources);
          dispatch(fetchNewForSource(newsData));
          break;
        case 'guardian':
          newsData = await fetchNewsFromGuardianApi(categories);
          dispatch(fetchNewForSource(newsData));
          break;
        // case 'nyt':
        //   newsData = await fetchNewsFromNewYorkTimesApi(categories, sources);
        //   dispatch(fetchNewForSource(newsData));
        //   break;
        case 'newsApiOrg':
          newsData = await fetchNewsFromNewsApiOrg(sources);
          dispatch(fetchNewForSource(newsData));
          break;
        default:
          newsData = []
      }
    }
    catch (error) {
      dispatch(fetchNewsFailure("Failed to fetch news"));
    }
  }

  // Filter items using search field
  const filterNewsItems = (searchTerm: string) => {
    if (!searchTerm) {
      dispatch(setArticles(allArticles));
      return;
    }
    const filteredArticles = allArticles.filter((item) => {
      const title = item?.title || item?.webTitle || ""; // check as keys from api are different
      return title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    dispatch(setArticles(filteredArticles));
  };

  const filterNewsWithDate = (date: string) => {
    if(date !== ""){
      const filteredItems = allArticles.filter((item) => {
        // Create a Date object for the item
        const itemDate = new Date(item?.publishedAt || item?.webPublicationDate || item?.dateTime);
        
        // Extract the date part (YYYY-MM-DD) from both the input and the item's date
        const itemDateString = itemDate.toISOString().slice(0, 10); // "2025-02-26"
        
        // Compare the dates
        return itemDateString === date;
      });
    
      dispatch(setArticlesWithDate(filteredItems))
    }
    else{
      dispatch(setArticlesWithDate(allArticles
        
      ))
    }
  }

  const setSource = (source: string) => {
    dispatch(setSourceType(source));
  }  

  return { getNews, filterNewsItems, getNewsItemsFromSource, filterNewsWithDate, setSource };
};

export default useFetchNews;
