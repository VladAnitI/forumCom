import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Layout } from './layout/Menu/Layout'
import { Statistics } from './pages/Statistics/Statistics'
import { Error } from './pages/Error'
import { Categories } from './pages/Categories/Categories'
import { NewPage } from './pages/NewCategory/NewCategory'
import Comment from "./pages/Comment/Comment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/newpage",
        element: <NewPage />,
      },
      {
        path: "/comment",
        element: <Comment title="Заголовок поста" comments={[]} />,
      },
    ],
  },
  {
    path: "/*",
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
