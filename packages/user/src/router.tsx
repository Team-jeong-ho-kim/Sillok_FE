import { createBrowserRouter } from "react-router-dom";
import { Header } from "@/components";
import { Home, NotFound } from "@/pages";
import { FeedDetailPage } from "./pages/FeedDetailPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'feed/:id',
        element: <FeedDetailPage />
      }
    ],
    errorElement: <NotFound />,
  },
]);