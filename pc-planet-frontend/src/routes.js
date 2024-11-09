import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import NoMatch from "./components/patterns/NoMatch";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        lazy: async () => {
          const { ProductView } = await import("./features/index.ts");
          return { Component: ProductView };
        },
      },
    ],
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);
