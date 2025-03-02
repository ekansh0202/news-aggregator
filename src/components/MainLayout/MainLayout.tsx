import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./MainLayout.css"; // 

// Entry point of the application
const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
