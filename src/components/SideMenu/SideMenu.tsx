import { useEffect, useState } from "react";
import useFetchNews from "../../hooks/useFetchNews";
import { RootState } from "../../redux/store";
import { filters } from "../../utils/filters";
import "./SideMenu.css";
import { useSelector } from "react-redux";

const SideMenu = () => {
  const { filterNewsWithDate } = useFetchNews();
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedSources, setSelectedSources] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const { getNews, getNewsItemsFromSource } = useFetchNews();
  const { sourceType, status } = useSelector((state: RootState) => state.news);

  const isLoading = status === "loading";

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === "category") {
      const category = event.target.value;
      // Check if the checkbox is checked or unchecked
      if (event.target.checked) {
        // Add the category to the selected categories array
        setSelectedCategories((prev: any) => [...prev, category]);
      } else {
        // Remove the category from the selected categories array
        setSelectedCategories((prev: any) =>
          prev.filter((item: string) => item !== category)
        );
      }
    } else if (type === "source") {
      const source = event.target.value;
      // Check if the checkbox is checked or unchecked
      if (event.target.checked) {
        // Add the category to the selected categories array
        setSelectedSources((prev: any) => [...prev, source]);
      } else {
        // Remove the category from the selected categories array
        setSelectedSources((prev: any) =>
          prev.filter((item: string) => item !== source)
        );
      }
    }

    setSelectedDate("");
    filterNewsWithDate("");
  };


  const handleSearch = () => {
    if (sourceType) {
      getNewsItemsFromSource(sourceType, selectedCategories, selectedSources);
    }
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedSources([]);
    setSelectedDate("");
    filterNewsWithDate("");
    getNews();
  }

  useEffect(() => {
    setSelectedCategories([]);
    setSelectedSources([]);
  }, [sourceType]);

  return (
    <div className="sidebar">
      {/* <h1 className="section-title">Filter</h1>
      <div className="filter-options">
        <label className="filter-label">
          <input
            type="checkbox"
            name="sort"
            // onChange={handleFilterChange}
            value="newest"
            className="filter-input"
          />
          Newest
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            name="sort"
            // onChange={handleFilterChange}
            value="popular"
            className="filter-input"
          />
          Most Popular
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            name="sort"
            // onChange={handleFilterChange}
            value="trending"
            className="filter-input"
          />
          Trending
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            name="sort"
            // onChange={handleFilterChange}
            value="oldest"
            className="filter-input"
          />
          Source
        </label>
      </div> */}

      <h1 className="section-title">Category</h1>
      <div className="filter-options">
        {filters.categories.map((item) => {
          return (
            <label className="filter-label">
              <input
                type="checkbox"
                name="sort"
                onChange={(event) => handleFilterChange(event, "category")}
                value={item}
                className="filter-input"
                checked={selectedCategories.includes(item)}
                disabled={isLoading}
              />
              {item}
            </label>
          );
        })}
      </div>

      <div className="filter-options-date">
        <label className="filter-label date-filter">
          <span>Date</span>
        </label>
        <input
          type="date"
          className="date-input"
          onChange={(event) => {
            setSelectedDate(event.target.value)
            filterNewsWithDate(event.target.value)
          }}
          value={selectedDate}
          disabled={isLoading}
        />
      </div>

      {sourceType == "newsApi" ? (
        <div>
          <h1 className="section-title">Source</h1>
          <div className="filter-options">
            {filters.sources.map((item) => {
              return (
                <label className="filter-label">
                  <input
                    type="checkbox"
                    name="sort"
                    onChange={(event) => handleFilterChange(event, "source")}
                    value={item}
                    className="filter-input"
                    checked={selectedSources.includes(item)}
                    disabled={isLoading}
                  />
                  {item}
                </label>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* <h1 className="section-title">Locations</h1>
      <div className="filter-options">
      <label className="filter-label">
      <select>
        {
          filters.languages.map((item) => {
            return(
                <option className="filter-input">{item}</option>
            )
          })
        }
        </select>
        </label>
      </div> */}

      <div className="buttons">
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
      </div>

    </div>
  );
};

export default SideMenu;
