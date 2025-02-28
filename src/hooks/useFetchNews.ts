import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchNewsStart, fetchNewsFromNewsAPISuccess, fetchNewsFailure, setArticles, fetchNewsFromGuardianAPISuccess } from "../redux/newsSlice";
import {
  fetchNewsStart,
  fetchNewsuccess,
  fetchNewsFailure,
  setArticles,
  fetchNewForSource,
} from "../redux/newsSlice";
import {
  fetchNewsFromNewsApi,
  fetchNewsFromGuardianApi,
  fetchNewsFromNewsApiOrg,
} from "../api/newsApi";
import { AppDispatch, RootState } from "../redux/store";
// import { data } from "../data";

const useFetchNews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasFetched = useRef(false);
  const { allArticles } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    if (hasFetched.current) return;

    const getNews = async () => {
      dispatch(fetchNewsStart());
      try {
        const newsApiData = await fetchNewsFromNewsApi();
        const guardianApiData = await fetchNewsFromGuardianApi();
        const newsApiOrgData = await fetchNewsFromNewsApiOrg();
        dispatch(
          fetchNewsuccess([newsApiData, guardianApiData, newsApiOrgData])
        );

        // NewsAPI call
        // const data = await fetchNewsFromNewsAPI();
        // dispatch(fetchNewsFromNewsAPISuccess(data));

        // GuardianAPI call
        // const data = await fetchNewsFromGuardianAPI();
        // dispatch(fetchNewsFromGuardianAPISuccess(data));

        hasFetched.current = true;
      } catch (error) {
        dispatch(fetchNewsFailure("Failed to fetch news"));
      }
    };

    getNews();
  }, [dispatch]);

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

  const getNewsItemsFromSource = async (sourceType: string) => {
    dispatch(fetchNewsStart());
    try{
      let newsData: any = [];
      switch(sourceType){
        case 'newsApi':
          newsData = await fetchNewsFromNewsApi();
          break;
        case 'guardian':
          newsData = await fetchNewsFromGuardianApi();
          break;
        case 'newsApiOrg':
          newsData = await fetchNewsFromNewsApiOrg();
          break;
        default:
          newsData = []
      }
      dispatch(fetchNewForSource(newsData));
    }
    catch (error) {
      dispatch(fetchNewsFailure("Failed to fetch news"));
    }
  }
  

  return { filterNewsItems, getNewsItemsFromSource };
};

export default useFetchNews;
