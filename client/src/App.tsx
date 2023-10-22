import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import DefaultLayout from "../components/DefaultLayout.tsx";
import Auth from "../components/AuthLayout.tsx";
import Profile from "./pages/profile.tsx";
import NotFound from "./pages/not-found.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Auth />,
    },
  ]);
  return (
    <>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
