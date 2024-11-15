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
          const { HomePage } = await import("./features/index.ts");
          return { Component: HomePage };
        },
      },
      {
        path: "all/:category",
        lazy: async () => {
          const { CategoryWiseProduct } = await import("./features/index.ts");
          return { Component: CategoryWiseProduct };
        },
      },
      {
        path: "product/search/:query",
        lazy: async () => {
          const { SearchProduct } = await import("./features/index.ts");
          return { Component: SearchProduct };
        },
      },
      {
        path: ":productName",
        lazy: async () => {
          const { ProductDetails } = await import("./features/index.ts");
          return { Component: ProductDetails };
        },
      },
    ],
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);
