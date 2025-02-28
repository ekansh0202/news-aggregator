import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainLayout from "./components/MainLayout/MainLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './components/HomePage/HomePage.tsx';
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import SingleNewsPage from "./components/SingleNewsPage/SingleNewsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/news/:id",
        element: <SingleNewsPage/>,
        errorElement: <p>Error...</p>
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
