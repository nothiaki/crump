import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Up } from "./pages/up"
import "./styles.css"
import { In } from "./pages/in"
import { Home } from "./pages/home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Up />,
  },
  {
    path: "/up",
    element: <Up />,
  },
  {
    path: "/in",
    element: <In />,
  },
  {
    path: "/home",
    element: <Home />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
