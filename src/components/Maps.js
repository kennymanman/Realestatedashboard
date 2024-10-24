import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from "react-router-dom";
import { db } from '../config/firebaseConfig';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { format } from 'date-fns';
import 'leaflet/dist/leaflet.css';
import Nav from './Nav';
import { useLocation, useNavigate } from 'react-router-dom';

const Maps = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const navigate = useNavigate();

  const geocodeLocation = async (location) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        return { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    return null;
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const rentSnapshot = await getDocs(collection(db, 'rent'));
      const saleSnapshot = await getDocs(collection(db, 'sale'));
      const shortletSnapshot = await getDocs(collection(db, 'shortlet'));
      
      const rentProperties = rentSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, type: 'rent' }));
      const saleProperties = saleSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, type: 'sale' }));
      const shortletProperties = shortletSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, type: 'shortlet' }));
      
      const allProperties = [...rentProperties, ...saleProperties, ...shortletProperties];
      
      // Geocode locations
      const propertiesWithCoordinates = await Promise.all(allProperties.map(async (property) => {
        const coordinates = await geocodeLocation(property.location);
        return { ...property, ...coordinates };
      }));

      console.log("Fetched properties:", propertiesWithCoordinates);
      setProperties(propertiesWithCoordinates);
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const filtered = properties.filter(property => {
      const searchLower = searchTerm.toLowerCase();
      const nameLower = property.name.toLowerCase();
      const locationLower = property.location.toLowerCase();
      const priceLower = property.price.toString().toLowerCase();
      
      return (nameLower.includes(searchLower) ||
              locationLower.includes(searchLower) ||
              priceLower.includes(searchLower)) &&
             (propertyType === 'all' || property.type === propertyType);
    });
    console.log("Filtered properties:", filtered);
    setFilteredProperties(filtered);
  }, [searchTerm, propertyType, properties]);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('URL copied to clipboard!'))
      .catch(err => console.error('Failed to copy URL: ', err));
  };

  const handleCustomerViewClick = (property) => {
    navigate('/customer-view', { 
      state: { 
        listing: {
          ...property,
          isRented: property.rented,
          dbOrigin: property.type
        } 
      } 
    });
  };

  return (
    <div className=''>
      <Nav/>
      <div className="flex h-screen bg-gray-100">
        <div className="w-1/3 p-4 bg-white shadow-lg overflow-scroll">
          <div className='flex items-center space-x-2 mb-4'>
            <button className='bg-black text-white font-hel tracking-tighter px-6 text-sm py-2' onClick={() => navigate(-1)}>
              Go back
            </button>
            <Input 
              value={window.location.href} 
              readOnly 
              className='w-60'
            />
            <Button onClick={copyUrlToClipboard} variant="outline" className="bg-green-500 text-black text-sm font-hel px-8 py-2 rounded-none">
              Copy
            </Button>
          </div>

          <h1 className="font-hel text-6xl tracking-tighter mt-4">Maps.</h1>
          <p className="text-gray-500 tracking-tighter text-sm mt-2 font-hel">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>

          <Input
            type="text"
            placeholder="Search by name, location, or price..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 mt-4"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mb-4 w-full bg-black text-white rounded-none font-hel tracking-tighter">
                {propertyType === 'all' ? 'All Properties' : propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuItem onSelect={() => setPropertyType('all')}>All Properties</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setPropertyType('rent')}>Rent</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setPropertyType('sale')}>Sale</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setPropertyType('shortlet')}>Shortlet</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="h-[calc(100vh-200px)] overflow-y-auto">
            {filteredProperties.map(property => (
              <div key={property.id} className="mb-4 p-4 bg-gray-50 rounded-lg flex ">
                <img src={property.imageUrls[0]} alt={property.name} className="w-20 h-20 rounded-lg object-cover mr-4" />
                <div>
                  <h3 className="font-hel tracking-tighter text-xl truncate ...">{property.name}</h3>
                  <p className='font-hel tracking-tighter text-base text-gray-500 truncate ...'>{property.location}</p>
                  <p className='font-hel tracking-tighter text-base truncate ...'>{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</p>
                  <p className='font-hel tracking-tighter text-xl truncate ... '>{property.currency}{property.price}</p>
                  {property.inspectionDate && (
                    <p>Inspection scheduled for: {format(new Date(property.inspectionDate), 'PPP')} at {format(new Date(property.inspectionDate), 'p')}</p>
                  )}
                </div>
                <Button onClick={() => handleCustomerViewClick(property)} className="ml-4 bg-black text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4  stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3">
          <MapContainer center={[9.082, 8.6753]} zoom={6} style={{ height: '100vh', width: '100%'}}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredProperties.map(property => {
              if (property.latitude && property.longitude) {
                return (
                  <Marker key={property.id} position={[property.latitude, property.longitude]}>
                    <Tooltip>
                      <div>
                        <h3 className="font-bold">{property.name}</h3>
                        <p>{property.location}</p>
                        <p>{property.currency}{property.price}</p>
                      </div>
                    </Tooltip>
                    <Popup>
                      <div>
                        <h3 className="font-bold">{property.name}</h3>
                        <p>{property.location}</p>
                        <p>{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</p>
                        <p>{property.currency}{property.price}</p>
                        <Button onClick={() => handleCustomerViewClick(property)} className="mt-2 bg-black text-white rounded-none">
                          View Details
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Maps;
