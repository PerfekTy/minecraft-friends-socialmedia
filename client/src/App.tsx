import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import DefaultLayout from "../components/layouts/DefaultLayout.tsx";
import Auth from "../components/layouts/AuthLayout.tsx";
import Profile from "./pages/profile.tsx";
import Home from "./pages/home.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      // errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:userId",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Auth />,
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
