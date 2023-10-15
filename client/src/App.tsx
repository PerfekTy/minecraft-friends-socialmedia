import {createBrowserRouter, RouterProvider} from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout.tsx";
import Auth from "../components/AuthLayout.tsx";


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
          path: '/',
          element: <Auth/>,
      }
  ])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
