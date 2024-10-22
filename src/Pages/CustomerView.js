import React, {useEffect, useState, useRef} from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Copy, Maximize2 } from "lucide-react"
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";
import Scheduler from '../components/Scheduler';
import axios from 'axios';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Footer from "../components/Footer"



// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export default function CustomerView() {
  const navigate = useNavigate();
  const location = useLocation();
  const listing = location.state?.listing;
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [image360Url, setImage360Url] = useState('');
  const viewerRef = useRef(null);
  const containerRef = useRef(null);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('URL copied to clipboard!'))
      .catch(err => console.error('Failed to copy URL: ', err));
  };


  // Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: listing.location,
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
  }, [listing.location]);


console.log(listing.image360Url, "Panorama")

  useEffect(() => {
    const fetchImage360Url = async () => {
      if (listing && listing.image360Url) {
        const storage = getStorage();
        const imageRef = ref(storage, listing.image360Url);
        try {
          const url = await getDownloadURL(imageRef);
          setImage360Url(url);
        } catch (error) {
          console.error("Error fetching 360 image URL:", error);
        }
      }
    };

    fetchImage360Url();
  }, [listing]);

  useEffect(() => {
    if (image360Url && containerRef.current) {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
      viewerRef.current = new Viewer({
        container: containerRef.current,
        panorama: image360Url,
      });
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, [image360Url]);

  const getListingType = () => {
    if (!listing) return '';
    switch(listing.dbOrigin) {
      case 'sale':
        return 'For Sale';
      case 'rent':
        return 'For Rent';
      case 'shortlet':
        return 'Shortlet';
      default:
        return 'Property Listing';
    }
  };

  const handleEnlargeImage = (imageUrl) => {
    setEnlargedImage(imageUrl);
  };

  return (

    <>
    <div className='grid grid-cols-9 p-3 gap-2 h-screen w-full'>
      {/* Display the listing type at the very top */}
      <div className='col-span-9 mb-2'>
        <div className='text-4xl font-bold text-end font-hel tracking-tighter text-black'>
         
          {getListingType()}
        </div>
      </div>



        

      <div className='col-span-4 mb-4'>
        <div className='flex items-center space-x-2'>
          <Input 
            value={window.location.href} 
            readOnly 
            className='flex-grow'
          />
          <Button onClick={copyUrlToClipboard} variant="outline" className="bg-green-500 text-black text-sm font-hel px-8 py-2 rounded-none">
            Copy
          </Button>

          <Button onClick={() => navigate(-1)} className="bg-black text-white tracking-tighter rounded-none font-hel w-full">Return to Previous Page</Button>


       
    
        </div>
      </div>

      <Tabs defaultValue="gallery" className="col-span-9 grid grid-cols-9 gap-2">
        <div className='col-span-3 flex flex-col space-y-4'>

        {listing && (
          <div className={`text-lg font-hel tracking-tighter ${!listing.isSold ? 'text-green-500' : 'text-red-500'}`}>
            {!listing.isSold ? 'Currently Available' : 'Currently Unavailable'}
          </div>
        )}
          <section>
            {/* <h1 className='tracking-tighter font-hel text-gray-500'>Property Name</h1> */}
            <h1 className='text-5xl tracking-tighter font-hel'>{listing ? listing.name : 'Property Name Not Available'}</h1>
          </section>


          <section>
            {/* <h1 className='tracking-tighter font-hel text-gray-500'>Location</h1> */}
            <h1 className='text-4xl tracking-tighter font-hel text-gray-500'>{listing ? listing.location : 'Location Not Available'}</h1>
          </section>

          <section>
            {/* <h1 className='tracking-tighter font-hel text-gray-500'>Price</h1> */}
            <h1 className='text-2xl tracking-tight font-hel'>{listing ? `${listing.currency}${listing.price.toLocaleString()}` : 'Price Not Available'}</h1>
          </section>

          {/* <section>
            <h1 className='tracking-tighter font-hel text-gray-500'>Location</h1> 
            <h1 className='text-4xl tracking-tight font-hel'>{listing ? listing.location : 'Location Not Available'}</h1>
          </section> */}

          <section>
            <h1 className='tracking-tighter font-hel text-gray-500'>Realtors Note</h1>
            <p className='text-md tracking-tighter font-hel'>{listing ? listing.realtorsNote : 'Realtor\'s Note Not Available'}</p>
          </section>



          <Scheduler sale={listing} />

          {/* <Button className='w-full mt-7 bg-black text-white rounded-none'>
            Schedule Inspection
          </Button> */}

          <section className='grid grid-cols-2 gap-4'>
            <div>
              <h1 className='tracking-tighter font-hel text-gray-500'>Apartment Type</h1>
              <h1 className='text-2xl tracking-tight font-hel'>{listing ? listing.type : 'Not Available'}</h1>
            </div>
            <div>
              <h1 className='tracking-tighter font-hel text-gray-500'>Size</h1>
              <h1 className='text-2xl tracking-tight font-hel'>{listing ? `${listing.size} sq ft` : 'Not Available'}</h1>
            </div>
            <div>
              <h1 className='tracking-tighter font-hel text-gray-500'>Parking Space</h1>
              <h1 className='text-2xl tracking-tight font-hel'>{listing ? (listing.parking ? 'Available' : 'Not Available') : 'Not Available'}</h1>
            </div>
            <div>
              <h1 className='tracking-tighter font-hel text-gray-500'>Floor</h1>
              <h1 className='text-2xl tracking-tight font-hel'>{listing ? `${listing.floors}` : 'Not Available'}</h1>
            </div>
            <div>
              <h1 className='tracking-tighter font-hel text-gray-500'>Bedrooms</h1>
              <h1 className='text-2xl tracking-tight font-hel'>{listing ? listing.bedrooms : 'Not Available'}</h1>
            </div>
            <div>
              <h1 className='tracking-tighter font-hel text-gray-500'>Serviced</h1>
              <h1 className='text-2xl tracking-tight font-hel'>{listing ? (listing.serviced ? 'Yes' : 'No') : 'Not Available'}</h1>
            </div>
              <div>
              <h1 className='tracking-tighter font-hel text-gray-500'>Call</h1>
              <h1 className='text-xl tracking-tight font-hel'>{listing ? listing.contactPhone : 'Not Available'}</h1>
            </div>


            
            <div>
              <h1 className='tracking-tighter font-hel text-gray-500'>Email</h1>
              <h1 className='text-xl tracking-tight font-hel'>{listing ? listing.contactEmail : 'Not Available'}</h1>
            </div>

            
          </section>

          <TabsList className="grid grid-cols-1 gap-2">
            <TabsTrigger value="gallery" asChild>
              <Button variant="outline" className="w-full bg-black text-white font-hel tracking-tighter">View Gallery</Button>
            </TabsTrigger>
            <hr className='my-4'/>
            <TabsTrigger value="video" asChild>
              <Button variant="outline" className="w-full bg-black text-white font-hel tracking-tighter">Watch Video</Button>
            </TabsTrigger>
            <hr className='my-4'/>
            <TabsTrigger value="tour360" asChild>
              <Button variant="outline" className="w-full bg-black text-white font-hel tracking-tighter">View 360 tour</Button>
            </TabsTrigger>
            <hr className='my-4'/>
            <TabsTrigger value="floorplan" asChild>
              <Button variant="outline" className="w-full bg-black text-white font-hel tracking-tighter">Floorplan</Button>
            </TabsTrigger>
            <hr className='my-4'/>
            <TabsTrigger value="map" asChild>
              <Button variant="outline" className="w-full bg-black text-white font-hel tracking-tighter ">Map Location</Button>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className='col-span-6 w-full '>
          <TabsContent value="gallery">
            <div className="grid grid-cols-2 gap-4">
              {listing && listing.imageUrls ? 
                listing.imageUrls.map((image, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={image} 
                      alt={`Gallery Image ${index + 1}`}
                      className="w-full h-[400px] object-cover rounded-none"
                    />
                    <div 
                      className='absolute top-2 right-2 cursor-pointer bg-black bg-opacity-50 rounded-full p-1'
                      onClick={() => handleEnlargeImage(image)}
                    >
                      <Maximize2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ))
                :
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative">
                    <img 
                      src={`/placeholder.svg?height=300&width=400&text=Gallery Image ${i}`} 
                      alt={`Gallery Image ${i}`}
                      className="w-full h-auto object-cover rounded-none"
                    />
                    <div 
                      className='absolute top-2 right-2 cursor-pointer bg-black bg-opacity-50 rounded-full p-1'
                      onClick={() => handleEnlargeImage(`/placeholder.svg?height=300&width=400&text=Gallery Image ${i}`)}
                    >
                      <Maximize2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ))
              }
            </div>
          </TabsContent>
          <TabsContent value="video">
            <div className="aspect-w-16 aspect-h-9">
              {listing && listing.videoUrl ? 
                <video controls className="w-full h-700px ">
                  <source src={listing.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                :
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              }
            </div>
          </TabsContent>
          <TabsContent value="tour360">
            {image360Url ? 
              <div ref={containerRef} style={{ width: '100%', height: '500px' }}></div>
              :
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-2xl text-gray-600">360° Tour Placeholder</p>
                <p className="text-lg text-gray-500">Actual 360° tour would be implemented here</p>
              </div>
            }
          </TabsContent>
          <TabsContent value="floorplan">
            {listing && listing.floorPlanUrl ? 
              <div className="relative">
                <img src={listing.floorPlanUrl} alt="Floorplan" className='w-full h-auto object-cover rounded-none' />
                <div 
                  className='absolute top-2 right-2 cursor-pointer bg-black bg-opacity-50 rounded-full p-1'
                  onClick={() => handleEnlargeImage(listing.floorPlanUrl)}
                >
                  <Maximize2 className="h-6 w-6 text-white" />
                </div>
              </div>
              :
              <div className="aspect-w-16 aspect-h-screen bg-gray-200 flex items-center justify-center">
                <p className="text-2xl text-black tracking-tighter font-hel text-center">No Floorplan Available</p>
              </div>
            }
          </TabsContent>

          <TabsContent value="map">
            {listing && listing.location ? 
              <div style={{ height: '400px', width: '100%' }}>
                {/* <MapContainer 
                  center={[listing.mapLocation.lat, listing.mapLocation.lng]} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[listing.mapLocation.lat, listing.mapLocation.lng]}>
                    <Popup>
                      {listing.name}<br/>{listing.location}
                    </Popup>
                  </Marker>
                </MapContainer> */}


                <MapContainer center={coordinates} zoom={13} style={{ height: '600px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordinates}>
              <Popup>
                {listing.name}<br/>{listing.location}
              </Popup>
            </Marker>
          </MapContainer>

          
              </div>
              :
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-2xl text-gray-600">Map Location Placeholder</p>
                <p className="text-lg text-gray-500">Actual map would be embedded here</p>
              </div>
            }
          </TabsContent>
        </div>
      </Tabs>
    </div>

    {/* Add this modal for enlarged images */}
    {enlargedImage && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
        onClick={() => setEnlargedImage(null)}
      >
        <div className="max-w-4xl max-h-4xl">
          <img 
            src={enlargedImage} 
            alt="Enlarged view" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    )}

    </>
  )
}
