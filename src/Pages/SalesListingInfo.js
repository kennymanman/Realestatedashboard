import React, { useState, useEffect, useRef } from 'react';
import Nav from "../components/Nav"
import shortletlisting from "../Images/shortletlisting.jpg"
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { updateDoc, doc, deleteDoc, addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, getStorage } from 'firebase/storage';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Calendar } from "../components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

import { 
  Home, 
  MapPin, 
  Square, 
  Car, 
  Building, 
  Bed, 
  Bath, 
  Check, 
  X, 
  Eye
} from 'lucide-react';

import { v4 as uuidv4 } from 'uuid';

import { db, imageDB } from '../config/firebaseConfig';
import Scheduler from "../components/Scheduler";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});








export default function SalesListingInfo() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showImageInfo, setShowImageInfo] = useState(false);
  // const [isAvailable, setIsAvailable] = useState(true);



  const { salesId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const sale = location.state.sale;

  const [saleName, setSaleName] = useState(sale.name);
  const [saleLocation, setSaleLocation] = useState(sale.location);
  const [firstImage, setFirstImage] = useState(sale.imageUrls[0]);
  const [imageOne, setImageOne] = useState(sale.imageUrls[1]);
  const [isSold, setIsSold] = useState(sale.sold || false);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [isAvailable, setIsAvailable] = useState(!sale.sold); //Come and undo this
  const [image360Url, setImage360Url] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("12:00");
  const [amPm, setAmPm] = useState("AM");
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const viewerRef = useRef(null);
  const containerRef = useRef(null);

  const placeholderImage = "https://via.placeholder.com/150";
  const placeholderVideo = "https://videos.pexels.com/video-files/1197802/1197802-sd_640_360_25fps.mp4";
  const placeholderFloorPlan = "https://via.placeholder.com/600x400";





  useEffect(() => {
    const fetchImage360Url = async () => {
      if (sale.image360Url) {
        const storage = getStorage();
        const imageRef = ref(storage, sale.image360Url);
        try {
          const url = await getDownloadURL(imageRef);
          setImage360Url(url);
        } catch (error) {
          console.error("Error fetching 360 image URL:", error);
          setImage360Url('https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg');
        }
      } else {
        setImage360Url('https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg');
      }
    };

    fetchImage360Url();
  }, [sale.image360Url]);

  useEffect(() => {
    if (image360Url && containerRef.current) {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
      viewerRef.current = new Viewer({
        container: containerRef.current,
        panorama: image360Url,
        navbar: [
          'autorotate',
          'zoom',
          'fullscreen',
        ],
        defaultZoomLvl: 0,
      });
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, [image360Url]);

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: sale.location,
            format: 'json',
            limit: 1,
          },
        });
        if (response.data && response.data.length > 0) {
          setCoordinates([
            parseFloat(response.data[0].lat),
            parseFloat(response.data[0].lon),
          ]);
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
      }
    };

    geocodeAddress();
  }, [sale.location]);

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setIsTimePickerOpen(true);
  };

  const handleTimeSelect = (value) => {
    setTime(value);
  };

  const handleAmPmSelect = (value) => {
    setAmPm(value);
  };

  const handleConfirm = async () => {
    const inspectionData = {
      date: date.toISOString(),
      time: `${time} ${amPm}`,
      saleName: sale.name,
      saleLocation: sale.location,
    };
    
    try {
      await addDoc(collection(db, "inspections"), inspectionData);
      console.log("Inspection scheduled successfully");
      setIsTimePickerOpen(false);
      setIsCalendarOpen(false);
    } catch (error) {
      console.error("Error scheduling inspection: ", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inspectionData = {
      date: date.toISOString(),
      saleName: sale.name,
      saleLocation: sale.location,
      ...formData
    };
    
    try {
      await addDoc(collection(db, "inspections"), inspectionData);
      console.log("Inspection scheduled successfully");
      setFormData({ name: '', phone: '', email: '' });
      setDate(null);
    } catch (error) {
      console.error("Error scheduling inspection: ", error);
    }
  };

  const editSale = async (event) => {
    event.preventDefault();

    let imageUrls = [];

    if (firstImage !== null) {
      const firstImageRef = ref(imageDB, `forsale/${uuidv4()}`);
      const value = await uploadBytes(firstImageRef, firstImage);
      const firstImageUrl = await getDownloadURL(value.ref);
      if (firstImageUrl) {
        imageUrls.push(firstImageUrl);
      }
    }

    if (imageOne !== null) {
      const imageOneRef = ref(imageDB, `forsale/${uuidv4()}`);
      const value = await uploadBytes(imageOneRef, imageOne);
      const imageOneUrl = await getDownloadURL(value.ref);
      if (imageOneUrl) {
        imageUrls.push(imageOneUrl);
      }
    }

    const saleDoc = doc(db, 'sale', sale.id);
    const newData = {
      name: saleName,
      location: saleLocation,
      imageUrls: imageUrls,
      sold: isSold,
    };
    return updateDoc(saleDoc, newData);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmation.toLowerCase() === 'delete') {
      try {
        await deleteDoc(doc(db, 'sale', sale.id));
        console.log("Listing deleted successfully");
        setShowDeleteDialog(false);
        navigate('/Sale');
      } catch (error) {
        console.error("Error deleting listing: ", error);
        alert("An error occurred while deleting the listing. Please try again.");
      }
    } else {
      alert("Please type 'delete' to confirm.");
    }
  };

  const handleAvailabilityChange = async (newAvailability) => {
    setIsAvailable(newAvailability);
    const saleDoc = doc(db, 'sale', sale.id);
    try {
      await updateDoc(saleDoc, { sold: !newAvailability });
      console.log("Availability updated successfully");
    } catch (error) {
      console.error("Error updating availability: ", error);
      setIsAvailable(!newAvailability);
    }
  };

  const handleCustomerViewClick = () => {
    navigate('/customer-view', { 
      state: { 
        listing: {
          ...sale,
          image360Url: image360Url
        } 
      }
    });
  };












  return (
    <>

    <Nav/>

    <div className='grid grid-cols-2 gap-2 p-2'>



      <div className='col-span-1 relative'>
        <img src={shortletlisting} alt="" className='w-full h-full object-cover' />
        <div 
          className='absolute top-2 right-2 cursor-pointer'
          onMouseEnter={() => setShowImageInfo(true)}
          onMouseLeave={() => setShowImageInfo(false)}
          onClick={() => setShowImageInfo(!showImageInfo)}
        >
          <span className='text-white bg-black bg-opacity-50 rounded-full py-1 px-3 text-sm font-hel tracking-tighter'>Tap to see Realtors Note</span>
        </div>
        {showImageInfo && (
          <div className='absolute top-10 right-2 bg-white p-2 rounded shadow-lg max-w-xs'>
            <p className='text-sm font-hel tracking-tighter'>
            {sale.realtorsNote}
            </p>
          </div>
        )}
      </div>


      <div className='col-span-1'>

        <p className='text-5xl tracking-tighter  font-hel'>{sale.name}</p>

        <p className='text-4xl tracking-tighter  font-hel text-gray-500'>{sale.location}</p>

        <p className='text-5xl tracking-tighter  font-hel pt-3 pb-10'>{sale.currency}{sale.price}</p>


        <p className='text-gray-500 tracking-tighter font-hel text-xl '>Building Type: <span className='text-black tracking-tighter text-2xl'>{sale.type}</span></p>

        <p className='text-gray-500 tracking-tighter font-hel text-xl '>Size: <span className='text-black tracking-tighter text-2xl'>{sale.size} SQ ft</span></p>

        <p className='text-gray-500 tracking-tighter font-hel text-xl '>Parking: <span className='text-black tracking-tighter text-2xl'>{sale.parking ? 'Parking Available' : 'No Parking'}</span></p>

        <p className='text-gray-500 tracking-tighter font-hel text-xl '>Floors: <span className='text-black tracking-tighter text-2xl'>{sale.floors} </span></p>

        <p className='text-gray-500 tracking-tighter font-hel text-xl '>Bedrooms: <span className='text-black tracking-tighter text-2xl'>{sale.bedrooms}</span></p>

        <p className='text-gray-500 tracking-tighter font-hel text-xl '>Bathrooms: <span className='text-black tracking-tighter text-2xl'>{sale.bathrooms}</span></p>

        <p className='text-gray-500 tracking-tighter font-hel text-xl '>Servicing: <span className='text-black tracking-tighter text-2xl'>{sale.serviced ? 'Serviced' : 'Not Serviced'}</span></p>

        <p className='text-gray-500 tracking-tighter font-hel text-xl '>Call: <span className='text-black tracking-tighter text-2xl'>09078976568</span></p>

        <div className='flex items-center mt-4'>
          <span className='text-gray-500 tracking-tighter font-hel text-xl mr-2'>Available:</span>
          <button 
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ease-in-out ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
            onClick={() => setIsAvailable(!isAvailable)}
          >
            <span 
              className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-300 ease-in-out ${isAvailable ? 'transform translate-x-7' : ''}`}
            ></span>
          </button>
        </div>

        <div className='flex mt-7'>
          
        <Link className='w-full mr-1' to={`/edit-sales-listing/${sale.id}`}>
          <button className='bg-black text-white w-full py-2 font-hel tracking-tighter mr-2'>Edit Listing</button>
          </Link>
          <div className='relative'>
            <button 
              className='bg-black text-white px-4 py-2 font-hel tracking-tighter'
              onClick={() => setShowDropdown(!showDropdown)}
            >
              ⋮
            </button>
            {showDropdown && (
              <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg'>
                <button  onClick={handleCustomerViewClick} className='block w-full text-left px-4 py-2 tracking-tighter font-hel hover:bg-gray-100'>Customer View</button>




                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogTrigger asChild>
                <button className='block w-full text-left px-4 py-2 tracking-tighter font-hel hover:bg-gray-100 text-red-600'>Delete Listing</button>
                
                </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the listing.
                    Type delete to confirm.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                  type="text"
                  placeholder="Type 'delete' to confirm"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                    Proceed
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>



              </div>
            )}
          </div>
        </div>
      </div>

    </div>



    
    <Tabs defaultValue="gallery" className="mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger className="font-hel tracking-tighter text-xl text-gray-500" value="gallery">Full Gallery</TabsTrigger>
          <TabsTrigger className="font-hel tracking-tighter text-xl text-gray-500" value="video">Video Tour</TabsTrigger>
          <TabsTrigger className="font-hel tracking-tighter text-xl text-gray-500" value="360-view">360° View</TabsTrigger>
          <TabsTrigger className="font-hel tracking-tighter text-xl text-gray-500" value="floor-plan">Floor Plan</TabsTrigger>
          <TabsTrigger className="font-hel tracking-tighter text-xl text-gray-500" value="map">Map</TabsTrigger>
        </TabsList>
        <TabsContent value="gallery">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {(sale.imageUrls.length > 0 ? sale.imageUrls : [placeholderImage]).map((image, index) => (
              <img key={index} src={image || placeholderImage} alt={`Property view ${index + 1}`} className="w-full h-screen object-cover" />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="video">
          <video controls className="w-full aspect-video">
            <source src={sale.videoUrl || placeholderVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </TabsContent>
        <TabsContent value="360-view">
          <div ref={containerRef} style={{ width: '100%', height: '500px' }}></div>
        </TabsContent>
        <TabsContent value="floor-plan">
          <img src={sale.floorPlanUrl || placeholderFloorPlan} alt="Floor Plan" className="w-full h-auto" />
        </TabsContent>
        <TabsContent value="map">
          <div style={{ height: '400px', width: '100%' }}>
            <MapContainer center={coordinates} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={coordinates}>
                <Popup>
                  {sale.name}<br/>{sale.location}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </TabsContent>
      </Tabs>


    </>
  );
}
