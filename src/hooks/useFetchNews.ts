import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure, setArticles } from "../redux/newsSlice";
import { fetchNewsFromNewsAPI } from "../api/newsApi";
import { AppDispatch, RootState } from "../redux/store";
import { data } from '../data';


const useFetchNews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasFetched = useRef(false); 
  const { allArticles } = useSelector((state: RootState) => state.news); 

  useEffect(() => {
    if (hasFetched.current) return; 

    const getNews = async () => {
      dispatch(fetchNewsStart());
      try {
        // const data = await fetchNewsFromNewsAPI();
        dispatch(fetchNewsSuccess(data));
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
    const filteredArticles = allArticles.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    dispatch(setArticles(filteredArticles));
  }

  return { filterNewsItems }

};

export default useFetchNews;
