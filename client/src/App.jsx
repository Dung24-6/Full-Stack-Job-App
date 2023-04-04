import React from "react";
import Navbar from "./components/navbar/Navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Company from "./pages/company/Company";
import Login from "./pages/login/login";
import Register from "./pages/register/Register";
import "./App.scss";
import Profile from "./pages/profile/Profile";
import Job from "./pages/job/Job";
import Jobs from "./pages/jobs/Jobs";
import Companies from "./pages/companies/Companies";
import ApplyJob from "./pages/applyJob/applyJob";

function App() {
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/company/:id",
          element: <Company />,
        },
        {
          path: "/companies",
          element: <Companies />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/job",
          element: <Job />,
        },
        {
          path: "/jobs",
          element: <Jobs />,
        },
        {
          path: "/apply",
          element: <ApplyJob />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
