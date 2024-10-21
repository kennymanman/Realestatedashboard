import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { updateDoc, doc, deleteDoc, addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, getStorage } from 'firebase/storage';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { Button } from "../components/ui/button";
import Nav from '../components/Nav';
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

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const SalesListingInfo = () => {
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
  const [isAvailable, setIsAvailable] = useState(!sale.sold);
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
    <div className=' h-fit'>
      <Nav />
      <Card>
        <CardHeader>
          <CardTitle className="text-5xl font-bold font-hel tracking-tight">{sale.name}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 font-hel tracking-tight text-xl">
              <MapPin className="mr-2" />
              {sale.location}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <span className="font-hel tracking-tighter text-2xl">Price: {sale.currency}{sale.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Home className="mr-2" />
              <span className="font-hel tracking-tighter text-2xl">{sale.type}</span>
            </div>
            <div className="flex items-center">
              <Square className="mr-2" />
              <span className="font-hel tracking-tighter text-xl">{sale.size} SQ ft</span>
            </div>
            <div className="flex items-center">
              <Car className="mr-2" />
              <span className='font-hel tracking-tighter text-2xl'>{sale.parking ? 'Parking Available' : 'No Parking'}</span>
            </div>
            <div className="flex items-center">
              <Building className="mr-2" />
              <span className='font-hel tracking-tighter text-2xl'>{sale.floors} Floors</span>
            </div>
            <div className="flex items-center">
              <Bed className="mr-2" />
              <span className='font-hel tracking-tighter text-2xl'>{sale.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-2" />
              <span className='font-hel tracking-tighter text-2xl'>{sale.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center">
              {sale.serviced ? <Check className="mr-2" /> : <X className="mr-2" />}
              <span className='font-hel tracking-tighter text-2xl'>{sale.serviced ? 'Serviced' : 'Not Serviced'}</span>
            </div>
          </div>
          <p className="text-gray-700 mb-4 font-hel tracking-tighter text-xl">
            <span className="font-bold font-hel tracking-tighter text-2xl">Realtors Note:</span> {sale.realtorsNote}
          </p>
          <div className="flex flex-wrap gap-4">
            <Scheduler sale={sale} />

            <Link to={`/edit-sales-listing/${sale.id}`}>
              <Button className="bg-black tracking-tighter px-10 py-1 text-white mt-4">
                Edit Listing
              </Button>
            </Link>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogTrigger asChild>
                <Button className="bg-black tracking-tighter px-10 py-1 text-white mt-4" onClick={handleDeleteClick} variant="destructive">
                  Delete Listing
                </Button>
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

            <Button className="bg-black tracking-tighter px-10 py-1 text-white mt-4" onClick={handleCustomerViewClick}>
              <Eye  className="mr-2" />
              Customer View
            </Button>

            <div className="flex items-center space-x-2">
              <Switch
                id="availability-status"
                checked={isAvailable}
                onCheckedChange={handleAvailabilityChange}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
              >
                <span className={`transform transition-transform duration-200 ease-in-out inline-block w-4 h-4 bg-white rounded-full ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
              </Switch>
              
              <Label htmlFor="availability-status">
                {isAvailable ? 'Available' : 'Unavailable'}
              </Label>

              <p className='font-hel tracking-tighter text-slate-500'>Toggle this switch to set this listing to available or unavailable</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="gallery" className="mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger className="font-hel tracking-tighter text-xl font-bold" value="gallery">Gallery</TabsTrigger>
          <TabsTrigger className="font-hel tracking-tighter text-xl font-bold" value="video">Video Tour</TabsTrigger>
          <TabsTrigger className="font-hel tracking-tighter text-xl font-bold" value="360-view">360° View</TabsTrigger>
          <TabsTrigger className="font-hel tracking-tighter text-xl font-bold" value="floor-plan">Floor Plan</TabsTrigger>
          <TabsTrigger className="font-hel tracking-tighter text-xl font-bold" value="map">Map</TabsTrigger>
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

      <div className='relative flex justify-center mt-52'>
        <button className='border-2 border-white rounded-full px-4 text-white tracking-tighter hover:bg-white hover:text-black'>
          To the top
        </button>
      </div>
    </div>
  );
};

export default SalesListingInfo;