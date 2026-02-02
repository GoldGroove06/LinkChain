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
import AuthChecker from './components/AuthChecker';

const route = createBrowserRouter([
    {
      path: "/",
      element: <App />,

    },
    {
      path: "/workspace/:id",
      element: 
      <AuthChecker>
      <Workspace />
      </AuthChecker>,
    },
    {
          path: "workspace/:id/automation/:id",
          element: 
          <AuthChecker>
            <Automation />
          </AuthChecker>
          ,
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
      element: 
      <AuthChecker>
      <Dashboard />
      </AuthChecker>
      ,
    },

])
createRoot(document.getElementById('root')!).render(

    <>
    <Navbar/>
    <RouterProvider router={route} />
    </>
,
)
