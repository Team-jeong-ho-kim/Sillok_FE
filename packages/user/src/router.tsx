import { createBrowserRouter } from "react-router-dom";
import { Header } from "@/components";
import { Feed, Home, NotFound } from "@/pages";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: '/feed',
        element: <Home />
      },

      // {
      //   path: 'feed',
      //   element: <Feed />
      // },
      // {
      //   path: 'feed/recent',
      //   element: <Feed />
      // },
      // {
      //   path: 'save',
      //   element: <Feed />
      // },
    ],
    errorElement: <NotFound />,
  },
]);