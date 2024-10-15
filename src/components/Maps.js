import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { collection, getDocs } from 'firebase/firestore';
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

const Maps = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');

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
      
      const rentProperties = rentSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, type: 'rent' }));
      const saleProperties = saleSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, type: 'sale' }));
      
      const allProperties = [...rentProperties, ...saleProperties];
      
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
    const filtered = properties.filter(property => 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (propertyType === 'all' || property.type === propertyType)
    );
    console.log("Filtered properties:", filtered);
    setFilteredProperties(filtered);
  }, [searchTerm, propertyType, properties]);

  return (
    <div className='bg-black'>
      <Nav/>
      <div className="flex h-screen bg-gray-100">
        <div className="w-1/3 p-4 bg-white shadow-lg">
          <Input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mb-4 w-full">
                {propertyType === 'all' ? 'All Properties' : propertyType === 'rent' ? 'Rent' : 'Sale'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setPropertyType('all')}>All Properties</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setPropertyType('rent')}>Rent</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setPropertyType('sale')}>Sale</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="h-[calc(100vh-200px)] overflow-y-auto">
            {filteredProperties.map(property => (
              <div key={property.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold">{property.name}</h3>
                <p>{property.location}</p>
                <p>{property.type === 'rent' ? 'For Rent' : 'For Sale'}</p>
                <p>{property.currency}{property.price}</p>
                {property.inspectionDate && (
                  <p>Inspection scheduled for: {format(new Date(property.inspectionDate), 'PPP')} at {format(new Date(property.inspectionDate), 'p')}</p>
                )}
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
                        <p>{property.type === 'rent' ? 'For Rent' : 'For Sale'}</p>
                        <p>{property.currency}{property.price}</p>
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