import { RootState } from "../../redux/store";
import "./SideMenu.css";
import { useSelector } from "react-redux";


const SideMenu = () => {


  const { articles } = useSelector((state: RootState) => state.news);

  return (
    <div className="sidebar">
      <h1 className="section-title">Search</h1>
      {/* <div className="home-search">
        <input type="text" className="search" placeholder="Search news..." onChange={(event) => filterNewsItems(event.target.value)}/>
      </div> */}
      <h1 className="section-title">Filter</h1>
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
          Oldest
        </label>
      </div>

      <div className="filter-options-date">
        <label className="filter-label date-filter">
          <span>Filter by Date:</span>
          <input type="date" className="date-input" />
        </label>
      </div>

      <h1 className="section-title">Category</h1>
      <div className="filter-options">
        <label className="filter-label">
          <input
            type="checkbox"
            name="sort"
            // onChange={handleFilterChange}
            value="newest"
            className="filter-input"
          />
          Global
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            name="sort"
            // onChange={handleFilterChange}
            value="popular"
            className="filter-input"
          />
          Technology
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            name="sort"
            // onChange={handleFilterChange}
            value="trending"
            className="filter-input"
          />
          Sports
        </label>
        <label className="filter-label">
          <input
            type="checkbox"
            name="sort"
            // onChange={handleFilterChange}
            value="oldest"
            className="filter-input"
          />
          Health
        </label>
      </div>

      <h1 className="section-title">Count: {articles.length}</h1>
    </div>
  );
};

export default SideMenu;
