import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layouts/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        lazy: async () => {
          const { HomePage } = await import("./features/Home/HomePage");
          return { Component: HomePage };
        },
      },
    ],
  },
]);
