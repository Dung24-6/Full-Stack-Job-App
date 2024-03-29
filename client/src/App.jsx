import React from "react";
import Navbar from "./components/navbar/Navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Company from "./pages/company/Company";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./App.scss";
import Profile from "./pages/profile/Profile";
import Job from "./pages/job/Job";
import Jobs from "./pages/jobs/Jobs";
import Companies from "./pages/companies/Companies";
import Review from "./pages/review/Review";
import LoginCompany from "./pages/loginCompany/LoginCompany";
import CreateJob from "./pages/createJob/CreateJob";
import ApplyJob from "./pages/applyJob/applyJob"
import ApplyList from "./pages/applyList/ApplyList";


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
          path: "/job/:id",
          element: <Job />,
        },
        {
          path: "/jobs",
          element: <Jobs />,
        },
        {
          path: "/jobs/skills",
          element: <Jobs />,
        },
        {
          path: "/apply/:jobId",
          element: <ApplyJob />,
        },
        {
          path: "/review/:companyId",
          element: <Review />,
        },
        {
          path: "/loginCompany",
          element: <LoginCompany />,
        },
        {
          path: "/createJob",
          element: <CreateJob />,
        },
        {
          path: "/modifyJob/:id",
          element: <CreateJob />,
        },
        {
          path: "/apply/user",
          element: <ApplyList type='user' />,
        },
        {
          path: "/apply/company",
          element: <ApplyList type='company' />,
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
