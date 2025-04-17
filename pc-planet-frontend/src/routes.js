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
        path: ':productName/details',
        lazy: async () => {
          const { ProductDetails } = await import('./features/Product/index.ts');
          return { Component: ProductDetails };
        },
      },
      {
        path: 'product',
        children: [
          {
            path: 'add',
            lazy: async () => {
              const { AddProduct } = await import('./features/Product/index.ts');
              return { Component: AddProduct };
            },
          },
          {
            path: 'metadata-management',
            lazy: async () => {
              const { ProductMetadataManagement } = await import('./features/Product/index.ts');
              return { Component: ProductMetadataManagement };
            },
          },
          {
            path: 'search/:query',
            lazy: async () => {
              const { SearchProduct } = await import('./features/Product/index.ts');
              return { Component: SearchProduct };
            },
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NoMatch />,
  },
]);
