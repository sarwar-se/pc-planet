import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import NoMatch from './components/patterns/NoMatch';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        lazy: async () => {
          const { HomePage } = await import('./features/Home/index.ts');
          return { Component: HomePage };
        },
      },
      {
        path: ':category',
        lazy: async () => {
          const { CategoryWiseProduct } = await import('./features/Product/index.ts');
          return { Component: CategoryWiseProduct };
        },
      },
      {
        path: ':category/:subCategory',
        lazy: async () => {
          const { CategoryWiseProduct } = await import('./features/Product/index.ts');
          return { Component: CategoryWiseProduct };
        },
      },
      {
        path: ':category/:subCategory/:brand',
        lazy: async () => {
          const { CategoryWiseProduct } = await import('./features/Product/index.ts');
          return { Component: CategoryWiseProduct };
        },
      },
      {
        path: 'product/search/:query',
        lazy: async () => {
          const { SearchProduct } = await import('./features/Product/index.ts');
          return { Component: SearchProduct };
        },
      },
      {
        path: ':productName/details',
        lazy: async () => {
          const { ProductDetails } = await import('./features/Product/index.ts');
          return { Component: ProductDetails };
        },
      },
      {
        path: 'add-product',
        lazy: async () => {
          const { AddProduct } = await import('./features/Product/index.ts');
          return { Component: AddProduct };
        },
      },
      {
        path: 'add-product-metadata',
        lazy: async () => {
          const { AddProductMetaData } = await import('./features/Product/index.ts');
          return { Component: AddProductMetaData };
        },
      },
    ],
  },
  {
    path: '*',
    element: <NoMatch />,
  },
]);
