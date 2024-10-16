import React, { useState, useEffect, useRef } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";






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

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { imageDB } from '../config/firebaseConfig'


import Scheduler from '../components/Scheduler';





import { getStorage } from "firebase/storage";








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

const SalesRistingInfo = () => {
  

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("12:00");
  const [amPm, setAmPm] = useState("AM");
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

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



  //  const handleDateSelect = (selectedDate) => {
   
  // };

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
      // Reset form and close dialog
      setFormData({ name: '', phone: '', email: '' });
      setDate(null);
      // setShowForm(false);
    } catch (error) {
      console.error("Error scheduling inspection: ", error);













function FetchDocument(props) {
  const { id } = props;
  const [document, setDocument] = useState(null);
  useEffect(() => {
    if (!document && id) {
      console.log(`<FetchDocument> useEffect() - fetching doc: `, id);
      console.log(`<FetchDocument> useEffect() - fetching db: `, db);
      const docRef = doc(db, 'sales', id);
      console.log(`<FetchDocument> useEffect() - fetching PATH: `, docRef.path);
      getDoc(docRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            setDocument(docSnapshot.data());
          } else {
            console.log('Document not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });

    }
  };






  const property = {
    name: "Villa Serenity",
    location: "123 Ocean Drive, Malibu, CA 90265",
    price: 12500000,
    type: "Villa",
    size: 8500,
    parking: true,
    floors: 3,
    bedrooms: 6,
    bathrooms: 7.5,
    serviced: true,
    realtorsNote: "This stunning oceanfront villa offers breathtaking views and luxurious amenities. Perfect for those seeking the ultimate in coastal living.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1613977257431-9a35543ced9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1613977257372-718d42e6b5ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    videoUrl: "https://player.vimeo.com/external/510850877.hd.mp4?s=d5e9ed9ea40ba755e28512cce6c1ad00d92506f7&profile_id=174",
    panoramaUrl: "https://pannellum.org/images/alma.jpg",
    mapLocation: { lat: 34.0259, lng: -118.7798 },
  };












  const { salesId } = useParams();
  const location = useLocation();
 
  const sale = location.state.sale;

  const [saleName, setSaleName] = useState(sale.name);
  const [saleLocation, setSaleLocation] = useState(sale.location);
  const [firstImage, setFirstImage] = useState(sale.imageUrls[0]);
  const [imageOne, setImageOne] = useState(sale.imageUrls[1]);
  const [isSold, setIsSold] = useState(sale.sold || false);
  const [coordinates, setCoordinates] = useState([0, 0]);

  const [isAvailable, setIsAvailable] = useState(!sale.sold);

  const [image360Url, setImage360Url] = useState('');
  const viewerRef = useRef(null);
  const containerRef = useRef(null);


// Previous panorama thing
  // useEffect(() => {
  //   const fetchImage360Url = async () => {
  //     if (sale.image360Url) {
  //       const storage = getStorage();
  //       const imageRef = ref(storage, sale.image360Url);
  //       try {
  //         const url = await getDownloadURL(imageRef);
  //         setImage360Url(url);
  //       } catch (error) {
  //         console.error("Error fetching 360 image URL:", error);
  //       }
  //     }
  //   };

  //   fetchImage360Url();
  // }, [sale.image360Url]);

  // useEffect(() => {
  //   if (image360Url && containerRef.current) {
  //     if (viewerRef.current) {
  //       viewerRef.current.destroy();
  //     }
  //     viewerRef.current = new Viewer({
  //       container: containerRef.current,
  //       panorama: image360Url,
  //     });
  //   }

  //   return () => {
  //     if (viewerRef.current) {
  //       viewerRef.current.destroy();
  //     }
  //   };
  // }, [image360Url]);

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
          // Set a fallback URL if the image doesn't exist
          setImage360Url('https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg');
        }
      } else {
        // Set a fallback URL if no 360 image is provided
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



console.log(sale.image360Url, "image360Url")

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

  const deleteSale = async () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteDoc(doc(db, 'sale', sale.id));
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
        await deleteDoc(doc(db, 'sale', sale.id));
        console.log("Listing deleted successfully");
        setShowDeleteDialog(false);
        navigate('/Sale'); // Redirect to the sales listing page after deletion
      } catch (error) {
        console.error("Error deleting listing: ", error);
        alert("An error occurred while deleting the listing. Please try again.");
      }
    } else {
      alert("Please type 'delete' to confirm.");
    }
  };

  return (
    <div className='bg-black h-fit'>


        
      <Nav />

      <Link to='/Sale'>
        <button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8 stroke-white m-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
            />
          </svg>
        </button>
      </Link>

      <div className='grid grid-cols-5 gap-7 p-2'>
        <div className=' mt-60 col-span-2'>
          <form onSubmit={editSale}>
            <FetchDocument id={salesId} />

            <div className='flex justify-between my-7 '>
              <h1 className='text-xl tracking-tighter text-zinc-400 '>
                Property Name:
              </h1>
              <h1 className='text-2xl tracking-tighter text-white max-w-sm '>
                {sale.name}
              </h1>
              <input
                className='text-xl tracking-tighter text-white max-w-sm bg-transparent'
                placeholder={saleName}
                value={sale.name}
                onChange={(e) => setSaleName(e.target.value)}
              />
            </div>

            <div className='flex justify-between my-7 '>
              <h1 className='text-xl tracking-tighter text-zinc-400 '>
                Property Location:
              </h1>
              <h1 className='text-2xl tracking-tighter text-white max-w-sm '>
                {sale.location}
              </h1>
              <input
                className='text-xl tracking-tighter text-white max-w-sm bg-transparent'
                placeholder={saleLocation}
                value={saleLocation}
                onChange={(e) => setSaleLocation(e.target.value)}
              />
            </div>






<div>
      {imageUrl && <img src={imageUrl} alt="Downloadable Image" />}
      <button className='bg-white px-4' onClick={handleDownload} disabled={!downloadUrl}>
        Download Image
      </button>
    </div>
       
      
    




            <img
              className='object-cover h-full w-full'
              src={sale.imageUrls[1]}
              alt=''
            />


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


  const handleScheduleInspection = () => {

    
    // if (calApi) {
    //   calApi("openModal", {
    //     date: format(new Date(), "yyyy-MM-dd"),
    //     config: {
    //       title: `House Inspection for ${property.name}`,
    //       eventName: "House Inspection",
    //       eventDescription: `Inspection for property at ${property.location}`,
    //     },
    //   });
    // }
  };


  const handleAvailabilityChange = async (newAvailability) => {
    setIsAvailable(newAvailability);
    const saleDoc = doc(db, 'sale', sale.id);
    try {
      await updateDoc(saleDoc, { sold: !newAvailability });
      console.log("Availability updated successfully");
    } catch (error) {
      console.error("Error updating availability: ", error);
      setIsAvailable(!newAvailability); // Revert the state if update fails
    }
  };













  console.log(sale, "ekene")





  // Placeholder URLs
  const placeholderImage = "https://via.placeholder.com/150";
  const placeholderVideo = "https://videos.pexels.com/video-files/1197802/1197802-sd_640_360_25fps.mp4";
  const placeholder360Image = "https://images.unsplash.com/photo-1505252772853-08ed4d526ceb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8MzYwfGVufDB8fDB8fHww";
  const placeholderFloorPlan = "https://via.placeholder.com/600x400";

  const handleCustomerViewClick = () => {
    navigate('/customer-view', { 
      state: { 
        listing: {
          ...sale,
          image360Url: image360Url // Pass the resolved URL
        } 
      }
    });
  };

  return (

    <div className='bg-black'>
      <Nav/>

    <div className="container bg-white mx-auto px-4 py-8">


  


   

    <Card className="mb-2">
      <CardHeader>

      <button  onClick={() => navigate(-1)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8 stroke-black m-2 relative'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
            />
          </svg>
        </button>


      <div className="text-end ">
          <h2 className="text-xl font-hel tracking-tighter">
            {isAvailable ? "This Listing is Available" : "This Listing is Unavailable"}
          </h2>
        </div>


        <CardTitle className="text-5xl font-bold font-hel tracking-tight">{sale.name}</CardTitle>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 font-hel tracking-tight text-xl">
            <MapPin className="mr-2" />
            {sale.location}
          </div>
          {/* <div className="flex items-center space-x-2">
            <Switch
              id="availability-status"
              checked={isAvailable}
              onCheckedChange={handleAvailabilityChange}
              className={isAvailable ? "bg-green-500" : "bg-red-500"}
            />
            <Label htmlFor="availability-status">
              {isAvailable ? 'Available' : 'Unavailable'}
            </Label>
          </div> */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center">
          
            <span className="font-hel tracking-tighter text-2xl">Price:  {sale.currency}{property.price.toLocaleString()}</span>
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
            {property.serviced ? <Check className="mr-2" /> : <X className="mr-2" />}
            <span className='font-hel tracking-tighter text-2xl'>{sale.serviced ? 'Serviced' : 'Not Serviced'}</span>
          </div>
        </div>
        <p className="text-gray-700 mb-4 font-hel tracking-tighter text-xl">
          <span className="font-bold font-hel tracking-tighter text-2xl">Realtors Note:</span> {sale.realtorsNote}
        </p>
        <div className="flex flex-wrap gap-4">

          
        
          <Scheduler sale={sale} />



          <Link to={`/edit-sales-listing/${sale.id}`}>
            <Button className="bg-black tracking-tighter px-10 py-1 text-white mt-4" >
              {/* <Edit className="mr-2" /> */}
              Edit Listing
            </Button>
          </Link>




          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button  className="bg-black tracking-tighter px-10 py-1 text-white mt-4" onClick={handleDeleteClick} variant="destructive">
                {/* <Trash2 className="mr-2" /> */}
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
            <Eye className="mr-2" />
            Customer View
          </Button>




          {/* <div className="flex items-center space-x-2">
            <Switch
              id="availability-status"
              checked={isAvailable}
              onCheckedChange={handleAvailabilityChange}
              className={isAvailable ? "bg-green-500" : "bg-red-500"}
            />
            <Label htmlFor="availability-status">
              {isAvailable ? 'Available' : 'Unavailable'}
            </Label>
          </div> */}


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

                <p className='font-hel tracking-tighter text-slate-500 '>Toogle this switch to set this listing to available or unavailable</p>
              </div>


        </div>
      </CardContent>
    </Card>





   

    <Tabs defaultValue="gallery" className="mb-8">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger className="font-hel tracking-tighter text-xl font-bold" value="gallery">Gallery</TabsTrigger>
        <TabsTrigger  className="font-hel tracking-tighter text-xl font-bold"  value="video">Video Tour</TabsTrigger>
        <TabsTrigger  className="font-hel tracking-tighter text-xl font-bold" value="360-view">360° View</TabsTrigger>
        <TabsTrigger  className="font-hel tracking-tighter text-xl font-bold" value="floor-plan">Floor Plan</TabsTrigger>
        <TabsTrigger  className="font-hel tracking-tighter text-xl font-bold" value="map">Map</TabsTrigger>
      </TabsList>
      <TabsContent value="gallery">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4  ">
          {(sale.imageUrls.length > 0 ? sale.imageUrls : [placeholderImage]).map((image, index) => (
            <img key={index} src={image || placeholderImage } alt={`Property view ${index + 1}`} className="w-full h-screen object-cover " />
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
  </div>

  </div>
)
}

export default SalesRistingInfo;