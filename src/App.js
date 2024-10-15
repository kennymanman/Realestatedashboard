import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { useIdleTimer } from 'react-idle-timer';
import { UserAuth } from "./context/AuthContext";
import "./App.css";
import Dashboard from "./Dashboard";
import Blog from "./Pages/Blog";
import Listing from "./Pages/Listing";
import Media from "./Pages/Media";
import ScheduledInspection from "./Pages/ScheduledInspection";
import StaffMembers from "./Pages/StaffMembers";
import Rent from "./Pages/Rent";
import Sale from "./Pages/Sale";
import Shortlet from "./Pages/Shortlet";
import SalesListingInfo from "./Pages/SalesListingInfo";
import NewSalesListing from "./Pages/NewSalesListing";
import CreateStaff from "./components/CreateStaff";
import MediaDetails from "./components/MediaDetails";
import BlogDetails from "./Pages/BlogDetails";

import { AuthContextProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from './Authcomponents/Login';
import Signup from "./Authcomponents/Signup"
import Profile from './Pages/Profile';
import Help from './Pages/Help';
import ForgotPassword from './Authcomponents/ForgotPassword';
import Insights from './Pages/Insights';
import PageNotFound from './components/PageNotFound';
import AI from "./Pages/AI"
import GPT from "./AI-screens/GPT";
import Calculator from "./Pages/Calculator";
import Schedules from './Pages/Schedules';
import EditSalesInfo from './Pages/EditSalesInfo';
import NewRentListing from "./Pages/NewRentListing";
import RentListingInfo from "./Pages/RentListingInfo"
import Maps from "./components/Maps";
import TaskManager from "./Pages/TaskManager";
import Admin from './Pages/Admin';
import CustomerView from './Pages/CustomerView';
import Footer from "./components/Footer"

function App() {
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { logout } = UserAuth() || {}; // Use optional chaining
  const navigate = useNavigate();

  const handleOnIdle = () => {
    if (logout) {
      logout()
        .then(() => {
          navigate('/');
          toast.info('You have been logged out due to inactivity.');
        })
        .catch((error) => {
          console.error('Logout failed:', error);
          toast.error('Failed to log out. Please try again.');
        });
    } else {
      console.warn('Logout function not available');
      navigate('/');
      toast.info('Your session has expired. Please log in again.');
    }
  };

  const { reset } = useIdleTimer({
    timeout: 1000 * 60 * 10, // 10 minutes
    onIdle: handleOnIdle,
    debounce: 500
  });

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast("Network Restored");
      reset(); // Reset the idle timer when network is restored
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("Check network connectivity, there seems to be a problem");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Add event listeners to reset the idle timer on user activity
    const events = ['mousedown', 'keydown', 'touchstart', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, reset);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      events.forEach(event => {
        document.removeEventListener(event, reset);
      });
    };
  }, [reset]);

  return (
    <>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Listing" element={<Listing />} />
        <Route path="/Media" element={<Media />} />
        <Route path="/ScheduledInspection" element={<ScheduledInspection />} />
        <Route path="/StaffMembers" element={<StaffMembers />} />
        <Route path="/Shortlet" element={<Shortlet />} />
        <Route path="/Rent" element={<Rent />} />
        <Route path="/Sale" element={<Sale />} />
        <Route path="/NewSalesListing" element={<NewSalesListing />} />
        <Route path="/NewRentListing" element={<NewRentListing />} />
        <Route path="/CreateStaff" element={<CreateStaff />} />
        <Route path="/MediaDetails" element={<MediaDetails />} />
        <Route path="/BlogDetails" element={<BlogDetails />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/Insights" element={<Insights />} />
        <Route path="/AI" element={<AI />} />
        <Route path="/GPT" element={<GPT />} />
        <Route path="/Maps" element={<Maps />} />
        <Route path="/propertyvaluecalculator" element={<Calculator />} />
        <Route path="/TaskManager" element={<TaskManager />} />
        <Route path="/SalesListingInfo/:salesId" element={<SalesListingInfo />} />
        <Route path="/edit-sales-listing/:salesId" element={<EditSalesInfo />} />
        <Route path="/RentListingInfo/:rentId" element={<RentListingInfo />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/customer-view" element={<CustomerView />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

// Wrap the App component with AuthContextProvider and Router
function AppWrapper() {
  return (
    <AuthContextProvider>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  );
}

export default AppWrapper;
