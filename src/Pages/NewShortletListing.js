import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, imageDB } from '../config/firebaseConfig';
import { v4 } from 'uuid';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Success from '../components/Success';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from 'sonner';

export default function NewShortletListing(props) {
  const navigate = useNavigate();
  const [shortlet, setShortlet] = useState([]);
  const [shortletName, setShortletName] = useState('');
  const [shortletLocation, setShortletLocation] = useState('');
  const [shortletCurrency, setShortletCurrency] = useState('₦');
  const [shortletPrice, setShortletPrice] = useState('');
  const [shortletType, setShortletType] = useState('');
  const [shortletSize, setShortletSize] = useState('');
  const [parking, setParking] = useState('');
  const [availability, setAvailability] = useState('');
  const [floor, setFloor] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [serviced, setServiced] = useState('');
  const [realtorsNote, setRealtorsNote] = useState('');
  const [firstImage, setFirstImage] = useState(null);
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [imageFour, setImageFour] = useState(null);
  const [imageFive, setImageFive] = useState(null);
  const [imageSix, setImageSix] = useState(null);
  const [video, setVideo] = useState(null);
  const [floorPlan, setFloorPlan] = useState(null);
  const [image360, setImage360] = useState(null);
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const createShortletListing = async (e) => {
    e.preventDefault();
    
    const missingFields = [];

    if (!shortletName) missingFields.push('Shortlet Name');
    if (!shortletLocation) missingFields.push('Location');
    if (!shortletPrice) missingFields.push('Price');
    if (!shortletType) missingFields.push('Type');
    if (!shortletSize) missingFields.push('Size');
    if (!parking) missingFields.push('Parking');
    if (!availability) missingFields.push('Availability');
    if (!floor) missingFields.push('Floor');
    if (!bedrooms) missingFields.push('Bedrooms');
    if (!bathrooms) missingFields.push('Bathrooms');
    if (!serviced) missingFields.push('Serviced');
    if (!firstImage) missingFields.push('First Image');

    if (missingFields.length > 0) {
      toast.error('Please fill in the following required fields:', {
        description: missingFields.join(', '),
        duration: 5000,
      });
      return;
    }

    try {
      const imageUrls = await Promise.all([
        uploadImage(firstImage),
        uploadImage(imageOne),
        uploadImage(imageTwo),
        uploadImage(imageThree),
        uploadImage(imageFour),
        uploadImage(imageFive),
        uploadImage(imageSix),
      ]);

      let videoUrl = null;
      if (video) {
        videoUrl = await uploadVideo(video);
      }

      let floorPlanUrl = null;
      if (floorPlan) {
        floorPlanUrl = await uploadImage(floorPlan);
      }

      let image360Url = null;
      if (image360) {
        image360Url = await uploadImage(image360);
      }

      await addDoc(collection(db, 'shortlet'), {
        name: shortletName,
        location: shortletLocation,
        currency: shortletCurrency,
        price: shortletPrice,
        type: shortletType,
        size: shortletSize,
        parking: parking === 'yes',
        availability: availability === 'yes',
        floors: floor,
        bedrooms,
        bathrooms,
        serviced: serviced === 'yes',
        realtorsNote,
        imageUrls,
        videoUrl,
        floorPlanUrl,
        image360Url,
        contactPhone,
        contactEmail,
      });

      setIsSuccessOpen(true);
      toast.success('Listing created successfully!');
      setTimeout(() => {
        setIsSuccessOpen(false);
        navigate('/Shortlet');
      }, 2000);
    } catch (error) {
      toast.error('An error occurred while creating the listing', {
        description: error.message,
        duration: 5000,
      });
    }
  };

  const uploadImage = async (image) => {
    if (!image) return null;
    const imageRef = ref(imageDB, `forshortlet/${image.name + v4()}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const uploadVideo = async (video) => {
    if (!video) return null;
    const videoRef = ref(imageDB, `forshortlet/${video.name + v4()}`);
    await uploadBytes(videoRef, video);
    const url = await getDownloadURL(videoRef);
    return url;
  };

  useEffect(() => {
    const q = query(collection(db, 'shortlet'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let shortletArr = [];
      querySnapshot.forEach((doc) => {
        shortletArr.push({ ...doc.data(), id: doc.id });
      });
      setShortlet(shortletArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
    <Nav/>
    <div className=' h-fit mb-10'>
      <div className='grid grid-cols-2 p-2 '>
        <div className='col-span-1'>
          <Link to='/Shortlet'>
            <button>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-8 h-8 stroke-black m-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>
            </button>
          </Link>

          <h1 className='text-7xl text-black tracking-tighter mt-8 font-hel'>
            Create a new listing for shortlet.
          </h1>
          <p className='text-gray-500 tracking-tighter w-3/4 mt-5 font-hel'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className='col-span-1'>
          <form onSubmit={createShortletListing}>
            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>
                Listing Name*
              </h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
                placeholder='Type property name'
                value={shortletName}
                required
                type='text'
                onChange={(e) => setShortletName(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>
                Listing Location*
              </h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
                placeholder='Type location'
                required
                value={shortletLocation}
                onChange={(e) => setShortletLocation(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Currency*</h1>
              <Select onValueChange={setShortletCurrency} required defaultValue="₦">
                <SelectTrigger className="w-96 bg-white text-black">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="₦">₦ (Naira)</SelectItem>
                  <SelectItem value="$">$ (Dollar)</SelectItem>
                  <SelectItem value="£">£ (Pounds)</SelectItem>
                  <SelectItem value="€">€ (Euros)</SelectItem>
                  <SelectItem value="C$">C$ (Canadian Dollar)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>
                Listing Price*
              </h1>
              <div className="flex items-center">
                <span className="text-white mr-2">{shortletCurrency}</span>
                <input
                  className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
                  placeholder='Type shortlet price'
                  type='number'
                  required
                  value={shortletPrice}
                  onChange={(e) => setShortletPrice(e.target.value)}
                />
              </div>
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>
                Listing Type*
              </h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
                placeholder='Studio Apartment/Duplex'
                value={shortletType}
                onChange={(e) => setShortletType(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>
                Listing Size*
              </h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
                placeholder='Type listing size'
                type='number'
                value={shortletSize}
                onChange={(e) => setShortletSize(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Parking*</h1>
              <Select onValueChange={setParking}>
                <SelectTrigger className="w-96 bg-white text-black">
                  <SelectValue placeholder="Select parking availability" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>
                Availability*
              </h1>
              <Select onValueChange={setAvailability}>
                <SelectTrigger className="w-96 bg-white text-black">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Floor*</h1>
              <Select onValueChange={setFloor}>
                <SelectTrigger className="w-96 bg-white text-black">
                  <SelectValue placeholder="Select floor" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black max-h-60 overflow-y-auto">
                  <SelectItem value="none">None</SelectItem>
                  {[...Array(50)].map((_, i) => (
                    <SelectItem key={i} value={`${i + 1}`}>{`${i + 1}${['st', 'nd', 'rd'][i] || 'th'}`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Bedrooms*</h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
                placeholder='Number of bedrooms'
                type='number'
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>
                Bathrooms*
              </h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
                placeholder='Number of bathrooms'
                type='number'
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Serviced*</h1>
              <Select onValueChange={setServiced}>
                <SelectTrigger className="w-96 bg-white text-black">
                  <SelectValue placeholder="Is it serviced?" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>
                Realtor&apos;s Note
              </h1>
              <textarea
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
                placeholder='Quick note '
                value={realtorsNote}
                onChange={(e) => setRealtorsNote(e.target.value)}
              />
            </div>

            <hr />

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>
                First Impression Image
              </h1>
              <input
                type='file'
                onChange={(e) => setFirstImage(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Image 1</h1>
              <input
                type='file'
                onChange={(e) => setImageOne(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Image 2</h1>
              <input
                type='file'
                onChange={(e) => setImageTwo(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Image 3</h1>
              <input
                type='file'
                onChange={(e) => setImageThree(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Image 4</h1>
              <input
                type='file'
                onChange={(e) => setImageFour(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Image 5</h1>
              <input
                type='file'
                onChange={(e) => setImageFive(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Image 6</h1>
              <input
                type='file'
                onChange={(e) => setImageSix(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <hr />

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Video</h1>
              <p className='text-black font-hel tracking-tighter text-md my-4'>
                Upload a video tour of the property.
              </p>
              <input
                type='file'
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
              />
              <p className="text-sm text-gray-500">Maximum file size: 100MB</p>
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>Floorplan</h1>
              <p className='text-black font-hel tracking-tighter text-md my-4'>
                Upload the floorplan image.
              </p>
              <input
                type='file'
                accept="image/*"
                onChange={(e) => setFloorPlan(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>360 Images & Videos</h1>
              <p className='text-black font-heltracking-tighter text-md my-4'>
                Upload 360-degree images .
              </p>
              <input
                type='file'
                accept="image/*,video/*"
                onChange={(e) => setImage360(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>
                Contact Phone Number
              </h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
                placeholder='Enter contact phone number'
                required
                type='tel'
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-black font-hel text-xl tracking-tighter'>
                Contact Email
              </h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-black w-96 text-xl tracking-tighter mt-3'
                placeholder='Enter contact email'
                type='email'
                value={contactEmail}
                required
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <button className='bg-black font-hel tracking-tighter text-white w-full px-12 py-2 mt-16 hover:bg-green-500'>
              Submit
            </button>
          </form>
        </div>
      </div>
      <Success isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
    </div>
    <Footer/>
    </>
  );
}
