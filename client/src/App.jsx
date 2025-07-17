import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Dashboard from "./pages/Dashboard"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    }
  ])

  return (
    <>
     <RouterProvider router = {router}/>
    </>
  )
}

export default App
