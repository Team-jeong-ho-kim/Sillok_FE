import { createBrowserRouter } from "react-router-dom";
import { Header } from "@/components";
import { Home, NotFound } from "@/pages";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ],
    errorElement: <NotFound />,
  },
]);