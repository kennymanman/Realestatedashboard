import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { updateDoc, doc, deleteDoc, getDoc,  addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import axios from 'axios'; // Make sure to install axios: npm install axios
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { Button } from "../components/ui/button";
// ... other imports

import Nav from '../components/Nav';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Input } from "../components/ui/input";
// import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
// import { Pannellum } from "pannellum-react";
import { format } from 'date-fns';
import { Calendar } from "../components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog";




import { 
  Home, 
  MapPin, 
  DollarSign, 
  Square, 
  Car, 
  Building, 
  Bed, 
  Bath, 
  Check, 
  X, 
  Trash2,
  Edit,
  Eye
} from 'lucide-react';

import { v4 as uuidv4 } from 'uuid';

// Import utilities and configurations
import { db, imageDB } from '../config/firebaseConfig';
import { cn } from "../lib/utils";

// Import icons
import { CalendarIcon } from "@radix-ui/react-icons";

// import Cal, { getCalApi } from "@calcom/embed-react";

import Scheduler from '../components/Scheduler';








// Replace with your actual Google Maps API Key
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

const CAL_USERNAME = 'wokeupbored';
const EVENT_TYPE = 'schedule-inspection';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const RentListingInfo = () => {
  

  const [date, setDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [showDialog, setShowDialog] = useState(false);



  const [showCalendar, setShowCalendar] = useState(false);

  // useEffect(() => {
  //   (function (C, A, L) {
  //     let p = function (a, ar) {
  //       a.q.push(ar);
  //     };
  //     let d = C.document;
  //     C.Cal =
  //       C.Cal ||
  //       function () {
  //         let cal = C.Cal;
  //         let ar = arguments;
  //         if (!cal.loaded) {
  //           cal.ns = {};
  //           cal.q = cal.q || [];
  //           d.head.appendChild(d.createElement("script")).src = A;
  //           cal.loaded = true;
  //         }
  //         if (ar[0] === L) {
  //           const api = function () {
  //             p(api, arguments);
  //           };
  //           const namespace = ar[1];
  //           api.q = api.q || [];
  //           typeof namespace === "string"
  //             ? (cal.ns[namespace] = api) && p(api, ar)
  //             : p(cal, ar);
  //           return;
  //         }
  //         p(cal, ar);
  //       };
  //   })(window, "https://app.cal.com/embed/embed.js", "init");
  //   Cal("init", { origin: "https://app.cal.com" });
  // }, []);





  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = "https://app.cal.com/embed/embed.js";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);


   // Open Cal.com scheduling page


   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
   const [deleteConfirmation, setDeleteConfirmation] = useState('');
 
   const navigate = useNavigate();



   const handleDateSelect = (selectedDate) => {
   
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inspectionData = {
      date: date.toISOString(),
      rentName: rent.name,
      rentLocation: rent.location,
      ...formData
    };
    
    try {
      await addDoc(collection(db, "inspections"), inspectionData);
      console.log("Inspection scheduled successfully");
      // Reset form and close dialog
      setFormData({ name: '', phone: '', email: '' });
      setDate(null);
      // setShowForm(false);
    } catch (error) {
      console.error("Error scheduling inspection: ", error);
    }
  };



















  const { rentId } = useParams();
  const location = useLocation();
 
  const rent = location.state.rent;

  const [rentName, setRentName] = useState(rent.name);
  const [rentLocation, setRentLocation] = useState(rent.location);
  const [firstImage, setFirstImage] = useState(rent.imageUrls[0]);
  const [imageOne, setImageOne] = useState(rent.imageUrls[1]);
  const [isSold, setIsSold] = useState(rent.sold || false);
  const [coordinates, setCoordinates] = useState([0, 0]);

  const [isAvailable, setIsAvailable] = useState(!rent.sold);

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: rent.location,
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
  }, [rent.location]);

  // useEffect(() => {
  //   (function (C, A, L) {
  //     let p = function (a, ar) {
  //       a.q.push(ar);
  //     };
  //     let d = C.document;
  //     C.Cal =
  //       C.Cal ||
  //       function () {
  //         let cal = C.Cal;
  //         let ar = arguments;
  //         if (!cal.loaded) {
  //           cal.ns = {};
  //           cal.q = cal.q || [];
  //           d.head.appendChild(d.createElement("script")).src = A;
  //           cal.loaded = true;
  //         }
  //         if (ar[0] === L) {
  //           const api = function () {
  //             p(api, arguments);
  //           };
  //           const namespace = ar[1];
  //           api.q = api.q || [];
  //           typeof namespace === "string"
  //             ? (cal.ns[namespace] = api) && p(api, ar)
  //             : p(cal, ar);
  //           return;
  //         }
  //         p(cal, ar);
  //       };
  //   })(window, "https://app.cal.com/embed/embed.js", "init");
  //   Cal("init", { origin: "https://app.cal.com" });
  // }, []);



  const editRent = async (event) => {
    event.preventDefault();

    let imageUrls = [];

    if (firstImage !== null) {
      const firstImageRef = ref(imageDB, `forrent/${uuidv4()}`);
      const value = await uploadBytes(firstImageRef, firstImage);
      const firstImageUrl = await getDownloadURL(value.ref);
      if (firstImageUrl) {
        imageUrls.push(firstImageUrl);
      }
    }

    if (imageOne !== null) {
      const imageOneRef = ref(imageDB, `forrent/${uuidv4()}`);
      const value = await uploadBytes(imageOneRef, imageOne);
      const imageOneUrl = await getDownloadURL(value.ref);
      if (imageOneUrl) {
        imageUrls.push(imageOneUrl);
      }
    }

    const rentDoc = doc(db, 'rent', rent.id);
    const newData = {
      name: rentName,
      location: rentLocation,
      imageUrls: imageUrls,
      sold: isSold,
    };
    return updateDoc(rentDoc, newData);
  };

  const deleteRent = async () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteDoc(doc(db, 'rent', rent.id));
        console.log("Listing deleted successfully");
        navigate('/Sale'); // Redirect to the sales listing page after deletion
      } catch (error) {
        console.error("Error deleting listing: ", error);
        alert("An error occurred while deleting the listing. Please try again.");
      }
    }
  };




  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmation.toLowerCase() === 'delete') {
      try {
        await deleteDoc(doc(db, 'rent', rent.id));
        console.log("Listing deleted successfully");
        setShowDeleteDialog(false);
        navigate('/Rent'); // Redirect to the sales listing page after deletion
      } catch (error) {
        console.error("Error deleting listing: ", error);
        alert("An error occurred while deleting the listing. Please try again.");
      }
    } else {
      alert("Please type 'delete' to confirm.");
    }
  };




  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('URL copied to clipboard!'))
      .catch(err => console.error('Failed to copy URL: ', err));
  };

  // const handleScheduleInspection = () => {
  //   if (window.Cal) {
  //     window.Cal("openModal", {
  //       calLink: `${CAL_USERNAME}/${EVENT_TYPE}`,
  //       config: {
  //         name: sale.name,
  //         notes: `Inspection for property at ${sale.location}`,
  //         theme: 'light',
  //       }
  //     });
  //   } else {
  //     console.error("Cal.com embed script not loaded");
  //   }
  // };





  const handleAvailabilityChange = async (newAvailability) => {
    setIsAvailable(newAvailability);
    const rentDoc = doc(db, 'rent', rent.id);
    try {
      await updateDoc(rentDoc, { sold: !newAvailability });
      console.log("Availability updated successfully");
    } catch (error) {
      console.error("Error updating availability: ", error);
      setIsAvailable(!newAvailability); // Revert the state if update fails
    }
  };


















  return (
    <div className="container mx-auto px-4 py-8">
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{rent.name}</CardTitle>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <MapPin className="mr-2" />
            {rent.location}
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="availability-status"
              checked={isAvailable}
              onCheckedChange={handleAvailabilityChange}
              className={isAvailable ? "bg-green-500" : "bg-red-500"}
            />
            <Label htmlFor="availability-status">
              {isAvailable ? 'Available' : 'Unavailable'}
            </Label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center">
          
            <span className="font-bold">{rent.currency}{rent.price.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <Home className="mr-2" />
            <span className="font-bold">{rent.type}</span>
          </div>
          <div className="flex items-center">
            <Square className="mr-2" />
            <span className="font-bold">{rent.size} sq ft</span>
          </div>
          <div className="flex items-center">
            <Car className="mr-2" />
            <span>{rent.parking ? 'Parking Available' : 'No Parking'}</span>
          </div>
          <div className="flex items-center">
            <Building className="mr-2" />
            <span>{rent.floors} Floors</span>
          </div>
          <div className="flex items-center">
            <Bed className="mr-2" />
            <span>{rent.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center">
            <Bath className="mr-2" />
            <span>{rent.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center">
            {rent.serviced ? <Check className="mr-2" /> : <X className="mr-2" />}
            <span>{rent.serviced ? 'Serviced' : 'Not Serviced'}</span>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          <span className="font-bold">Realtors Note:</span> {rent.realtorsNote}
        </p>
        <div className="flex flex-wrap gap-4">
          {/* <Button onClick={() => setShowCalendar(!showCalendar)}> */}
          <Scheduler sale={rent} />



{/* Check this out */}
      
          {/* <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Calendar className="mr-2" />
            Schedule Inspection
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Property Inspection</DialogTitle>
          </DialogHeader>
          {!showForm ? (
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">Phone</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="col-span-3" />
                </div>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          )}
        </DialogContent>
      </Dialog> */}

{/* 
{showDialog && (
              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule Property Inspection</DialogTitle>
                  </DialogHeader>
                  {!showForm ? (
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      className="rounded-md border"
                    />
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">Phone</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">Email</Label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="col-span-3" />
                        </div>
                      </div>
                      <Button type="submit">Submit</Button>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            )} */}


















          {/* <Cal
        calLink="your-cal-username/house-inspection"
        style={{width:"100%",height:"100%",overflow:"scroll"}}
        config={{
          name: property.name,
          notes: `Inspection for property at ${property.location}`,
        }}
      /> */}
          <Link to={`/edit-rent-listing/${rent.id}`}>
            <Button variant="outline">
              <Edit className="mr-2" />
              Edit Listing
            </Button>
          </Link>
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button onClick={handleDeleteClick} variant="destructive">
                <Trash2 className="mr-2" />
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
          <Link to="/customer-view">
            <Button variant="secondary">
              <Eye className="mr-2" />
              Customer View
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>

    <Tabs defaultValue="gallery" className="mb-8">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="video">Video Tour</TabsTrigger>
        <TabsTrigger value="360-view">360° View</TabsTrigger>
        <TabsTrigger value="floor-plan">Floor Plan</TabsTrigger>
        <TabsTrigger value="map">Map</TabsTrigger>
      </TabsList>
      <TabsContent value="gallery">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {rent.imageUrls.map((image, index) => (
            <img key={index} src={image} alt={`Property view ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="video">
        <video controls className="w-full aspect-video">
          <source src={rent.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </TabsContent>
      <TabsContent value="360-view">
        {/* <Pannellum
          width="100%"
          height="500px"
          image={property.panoramaUrl}
          pitch={10}
          yaw={180}
          hfov={110}
          autoLoad
          onLoad={() => {
            console.log("360 view loaded");
          }}
        /> */}
      </TabsContent>
      <TabsContent value="floor-plan">
        <img src={rent.floorPlanUrl} alt="Floor Plan" className="w-full h-auto" />
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
                {rent.name}<br/>{rent.location}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </TabsContent>
    </Tabs>
  </div>
)
}

export default RentListingInfo;