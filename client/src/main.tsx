import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Up } from "./pages/up"
import "./styles.css"
import { In } from "./pages/in"

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
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
