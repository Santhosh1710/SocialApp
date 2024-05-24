import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Home from './pages/home/home';
import {
  Navigate,
  Outlet,
} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftbar/leftbar';
import RightBar from './components/rightbar/rightbar';
import Profile from './pages/profile/profile';
import "./style.scss"
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';

import React from "react";
function App() {

  const {currentUser} = useContext(AuthContext);
  const {darkMode} = useContext(DarkModeContext);
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Signup />
    },
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [{
        path: "/",
        element : <Home />,
      },{
        path : "/profile/:id",
        element : <Profile />
      }
    ]
    }
  ]);
  return (
    <div >
      <RouterProvider router = {router} />
    </div>
  );
}

export default App;
