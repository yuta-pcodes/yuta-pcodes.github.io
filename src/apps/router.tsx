import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { Suspense, useMemo } from 'react';
import { 
  createBrowserRouter, 
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import { paths } from '../config/paths.ts';

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

// Helper function to convert route modules for Data APIs
const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) => {
  // JSXでルートを定義（読みやすい）
  const routes = createRoutesFromElements(
    <>
      {/* ランディングページ */}
      <Route 
        path={paths.home.path} 
        lazy={() => import('./routes/landing.tsx').then(convert(queryClient))}
      />
      
      {/* 404ページ */}
      <Route 
        path="*" 
        lazy={() => import('./routes/not-found.tsx').then(convert(queryClient))}
      />
    </>
  );

  return createBrowserRouter(routes);
};

export const AppRouter = () => {
  const queryClient = useQueryClient();
  
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
