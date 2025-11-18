import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './components/Navbar.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Automation from './pages/Automation.tsx'
import Workspace from './pages/Workspace.tsx'

const route = createBrowserRouter([
    {
      path: "/",
      element: <App />,

    },
    {
      path: "/workspace",
      element: <Workspace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/automation",
      element: <Automation />,
    },

])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
    <Navbar/>
    <RouterProvider router={route} />
    </>
  </StrictMode>,
)
