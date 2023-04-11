import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home';
import { AuthPage } from './pages/auth';
import { SearchTasksPage } from './pages/searchTasks';
import { MyTasksPage } from './pages/myTasks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/search',
    element: <SearchTasksPage />,
  },
  {
    path: '/mytasks',
    element: <MyTasksPage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
