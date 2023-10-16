import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../components/AuthLayout.tsx";
import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter([
    // {
    //   path: '/',
    //   element: <DefaultLayout/>,
    //     children: [
    //         {
    //
    //         }
    //     ]
    // },
    {
      path: "/",
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
