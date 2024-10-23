import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, imageDB } from '../config/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/alert-dialog";

const EditShortletInfo = () => {
  const { shortletId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchShortletData = async () => {
      const shortletDoc = doc(db, 'shortlet', shortletId);
      const docSnap = await getDoc(shortletDoc);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };
    fetchShortletData();
  }, [shortletId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      [field]: file
    }));
  };

  const handleDeleteFile = async (field, index) => {
    try {
      if (field === 'imageUrls' && formData.imageUrls[index]) {
        const imageRef = ref(imageDB, formData.imageUrls[index]);
        await deleteObject(imageRef);
        const newImageUrls = [...formData.imageUrls];
        newImageUrls.splice(index, 1);
        setFormData(prevState => ({
          ...prevState,
          imageUrls: newImageUrls
        }));
      } else if (formData[field]) {
        const fileRef = ref(imageDB, formData[field]);
        await deleteObject(fileRef);
        setFormData(prevState => ({
          ...prevState,
          [field]: null
        }));
      }
    } catch (error) {
      console.error('Error deleting file: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shortletDoc = doc(db, 'shortlet', shortletId);

    let updatedData = { ...formData };

    try {
      // Handle image uploads
      for (let i = 0; i < 6; i++) {
        const imageField = `image${i + 1}`;
        if (formData[imageField] && formData[imageField] instanceof File) {
          const imageRef = ref(imageDB, `forshortlet/${uuidv4()}`);
          await uploadBytes(imageRef, formData[imageField]);
          const imageUrl = await getDownloadURL(imageRef);
          updatedData.imageUrls[i] = imageUrl;
        }
      }

      // Handle video upload
      if (formData.newVideo && formData.newVideo instanceof File) {
        const videoRef = ref(imageDB, `forshortlet/${uuidv4()}`);
        await uploadBytes(videoRef, formData.newVideo);
        const videoUrl = await getDownloadURL(videoRef);
        updatedData.videoUrl = videoUrl;
      }

      // Handle 360 image upload
      if (formData.new360Image && formData.new360Image instanceof File) {
        const image360Ref = ref(imageDB, `forshortlet/${uuidv4()}`);
        await uploadBytes(image360Ref, formData.new360Image);
        const image360Url = await getDownloadURL(image360Ref);
        updatedData.image360Url = image360Url;
      }

      // Handle floor plan upload
      if (formData.newFloorPlan && formData.newFloorPlan instanceof File) {
        const floorPlanRef = ref(imageDB, `forshortlet/${uuidv4()}`);
        await uploadBytes(floorPlanRef, formData.newFloorPlan);
        const floorPlanUrl = await getDownloadURL(floorPlanRef);
        updatedData.floorPlanUrl = floorPlanUrl;
      }

      // Remove temporary file fields
      delete updatedData.newVideo;
      delete updatedData.new360Image;
      delete updatedData.newFloorPlan;
      for (let i = 1; i <= 6; i++) {
        delete updatedData[`image${i}`];
      }

      await updateDoc(shortletDoc, updatedData);
      setAlertMessage('Listing Edited Successfully');
      setIsSuccess(true);
    } catch (error) {
      console.error('Error updating document: ', error);
      setAlertMessage('Edit Failed');
      setIsSuccess(false);
    }
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (isSuccess) {
      // Navigate to the refreshed ShortletListingInfo page for the specific listing
      navigate(`/Shortlet`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">Edit Listing</CardTitle>
            <FaTimes onClick={() => navigate(-1)} className="text-red-500 cursor-pointer" size={24} />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Property Name</Label>
                <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select 
                  name="currency" 
                  value={formData.currency} 
                  onValueChange={(value) => handleSelectChange('currency', value)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="NGR">NGR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Input type="text" id="type" name="type" value={formData.type} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size (sq ft)</Label>
                <Input type="number" id="size" name="size" value={formData.size} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floors">Number of Floors</Label>
                <Input type="number" id="floors" name="floors" value={formData.floors} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Number of Bedrooms</Label>
                <Input type="number" id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Number of Bathrooms</Label>
                <Input type="number" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input 
                  type="tel" 
                  id="contactPhone" 
                  name="contactPhone" 
                  value={formData.contactPhone} 
                  onChange={handleChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input 
                  type="email" 
                  id="contactEmail" 
                  name="contactEmail" 
                  value={formData.contactEmail} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="parking" 
                name="parking" 
                checked={formData.parking} 
                onCheckedChange={(checked) => handleChange({ target: { name: 'parking', type: 'checkbox', checked } })}
                className={formData.parking ? "bg-green-500" : "bg-red-500"}
              />
              <Label htmlFor="parking">Parking Available</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="serviced" 
                name="serviced" 
                checked={formData.serviced} 
                onCheckedChange={(checked) => handleChange({ target: { name: 'serviced', type: 'checkbox', checked } })}
                className={formData.serviced ? "bg-green-500" : "bg-red-500"}
              />
              <Label htmlFor="serviced">Serviced Property</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="realtorsNote">Realtors Note</Label>
              <Textarea id="realtorsNote" name="realtorsNote" value={formData.realtorsNote} onChange={handleChange} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="space-y-2">
                  <Label htmlFor={`image${num}`}>Image {num}</Label>
                  {formData.imageUrls && formData.imageUrls[num - 1] && (
                    <div className="relative">
                      <img src={formData.imageUrls[num - 1]} alt={`Current Image ${num}`} className="w-full h-32 object-cover mb-2" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-0 right-0 m-1 bg-white"
                        onClick={() => handleDeleteFile('imageUrls', num - 1)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  )}
                  <Input 
                    type="file" 
                    id={`image${num}`} 
                    name={`image${num}`} 
                    onChange={(e) => handleFileChange(e, `image${num}`)} 
                    accept="image/*" 
                  />
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newVideo">Video Tour</Label>
              {formData.videoUrl && (
                <div className="relative">
                  <video src={formData.videoUrl} controls className="w-full mb-2" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0 m-1 bg-white"
                    onClick={() => handleDeleteFile('videoUrl')}
                  >
                    <FaTrash />
                  </Button>
                </div>
              )}
              <Input type="file" id="newVideo" name="newVideo" onChange={(e) => handleFileChange(e, 'newVideo')} accept="video/*" />
              <p className="text-sm text-gray-500">Maximum file size: 100MB</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new360Image">360 Image</Label>
              {formData.image360Url && (
                <div className="relative">
                  <img src={formData.image360Url} alt="Current 360 Image" className="w-full h-32 object-cover mb-2" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0 m-1 bg-white"
                    onClick={() => handleDeleteFile('image360Url')}
                  >
                    <FaTrash />
                  </Button>
                </div>
              )}
              <Input type="file" id="new360Image" name="new360Image" onChange={(e) => handleFileChange(e, 'new360Image')} accept="image/*" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newFloorPlan">Floor Plan</Label>
              {formData.floorPlanUrl && (
                <div className="relative">
                  <img src={formData.floorPlanUrl} alt="Current Floor Plan" className="w-full h-32 object-cover mb-2" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0 m-1 bg-white"
                    onClick={() => handleDeleteFile('floorPlanUrl')}
                  >
                    <FaTrash />
                  </Button>
                </div>
              )}
              <Input type="file" id="newFloorPlan" name="newFloorPlan" onChange={(e) => handleFileChange(e, 'newFloorPlan')} accept="image/*" />
            </div>
            
            <Button type="submit" className="w-full bg-black text-white">Edit Listing</Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{isSuccess ? 'Success' : 'Error'}</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAlertClose}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditShortletInfo;
