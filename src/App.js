import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import Blog from "./Pages/Blog"
import Listing from './Pages/Listing';
import Media from "./Pages/Media"
import ScheduledInspection from "./Pages/ScheduledInspection"
import StaffMembers from "./Pages/StaffMembers"
import Rent from "./Pages/Rent"
import Sale from "./Pages/Sale"
import Shortlet from './Pages/Shortlet';
import SalesListingInfo from './components/SalesListingInfo';
import NewSalesListing from './Pages/NewSalesListing';
import CreateStaff from './components/CreateStaff';







function App() {
  return (
    <Router>
    <Routes>

    <Route path="/" element={<Dashboard />} />
    <Route path="/Blog" element={<Blog/>} />
    <Route path="/Listing" element={<Listing/>} />
    <Route path="/Media" element={<Media />} />
    <Route path="/ScheduledInspection" element={<ScheduledInspection />} />
    <Route path="/StaffMembers" element={<StaffMembers />} />
    <Route path="/Shortlet" element={<Shortlet />} />
    <Route path="/Rent" element={<Rent />} />
    <Route path="/Sale" element={<Sale />} />
    <Route path="/SalesListingInfo" element={<SalesListingInfo />} />
    <Route path="/NewSalesListing" element={<NewSalesListing />} />
    <Route path="/CreateStaff" element={<CreateStaff />} />

  </Routes>
  </Router>


  
  );
}



export default App;
