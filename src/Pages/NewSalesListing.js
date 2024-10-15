import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { db, imageDB } from '../config/firebaseConfig';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import Success from '../components/Success';

export default function NewSalesListing(props) {
  const [sale, setSale] = useState([]);
  const [saleName, setSaleName] = useState('');
  const [saleLocation, setSaleLocation] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [saleType, setSaleType] = useState('');

  const [firstImage, setFirstImage] = useState('');
  const [firstImageUrl, setFirstImageUrl] = useState('');

  const [imageOne, setImageOne] = useState('');
  const [imageOneUrl, setImageOneUrl] = useState('');

  const [saleSize, setSaleSize] = useState('');
  const [parking, setParking] = useState('');
  const [availability, setAvailability] = useState('');
  const [floor, setFloor] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [serviced, setServiced] = useState('');
  const [realtorsNote, setRealtorsNote] = useState('');
  
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [imageFour, setImageFour] = useState(null);
  const [imageFive, setImageFive] = useState(null);
  const [imageSix, setImageSix] = useState(null);
  
  const [video, setVideo] = useState(null);
  const [floorPlan, setFloorPlan] = useState(null);
  const [image360, setImage360] = useState(null);

  const [saleCurrency, setSaleCurrency] = useState('₦'); // Default to Naira

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const createSaleListing = async (e) => {
    e.preventDefault();

    try {
      let imageUrls = [];
      const imagesToUpload = [firstImage, imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix];

      for (let image of imagesToUpload) {
        if (image) {
          const imageRef = ref(imageDB, `forsale/${uuidv4()}`);
          const value = await uploadBytes(imageRef, image);
          const url = await getDownloadURL(value.ref);
          imageUrls.push(url);
        }
      }

      let videoUrl = '';
      if (video) {
        const videoRef = ref(imageDB, `forsale/videos/${uuidv4()}`);
        const value = await uploadBytes(videoRef, video);
        videoUrl = await getDownloadURL(value.ref);
      }

      let floorPlanUrl = '';
      if (floorPlan) {
        const floorPlanRef = ref(imageDB, `forsale/floorplans/${uuidv4()}`);
        const value = await uploadBytes(floorPlanRef, floorPlan);
        floorPlanUrl = await getDownloadURL(value.ref);
      }

      let image360Url = '';
      if (image360) {
        const image360Ref = ref(imageDB, `forsale/360images/${uuidv4()}`);
        const value = await uploadBytes(image360Ref, image360);
        image360Url = await getDownloadURL(value.ref);
      }

      await addDoc(collection(db, 'sale'), {
        id: uuidv4(),
        name: saleName,
        location: saleLocation,
        price: salePrice,
        currency: saleCurrency,
        type: saleType,
        size: saleSize,
        parking: parking,
        availability: availability,
        floor: floor,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        serviced: serviced,
        realtorsNote: realtorsNote,
        imageUrls: imageUrls,
        videoUrl: videoUrl,
        floorPlanUrl: floorPlanUrl,
        image360Url: image360Url,
        createdAt: new Date(),
      });

      // Show success message
      setIsSuccessOpen(true);

      // Reset form fields
      setSaleName('');
      setSaleLocation('');
      setSalePrice('');
      setSaleCurrency('₦');
      setSaleType('');
      setSaleSize('');
      setParking('');
      setAvailability('');
      setFloor('');
      setBedrooms('');
      setBathrooms('');
      setServiced('');
      setRealtorsNote('');
      setFirstImage(null);
      setImageOne(null);
      setImageTwo(null);
      setImageThree(null);
      setImageFour(null);
      setImageFive(null);
      setImageSix(null);
      setVideo(null);
      setFloorPlan(null);
      setImage360(null);

    } catch (error) {
      console.error("Error creating new listing: ", error);
      alert("An error occurred while creating the listing. Please try again.");
    }
  };

  const handleSubmitImages = () => {
    if (firstImage !== null) {
      const firstImageRef = ref(imageDB, `files/${uuidv4()}`);
      uploadBytes(firstImageRef, firstImage).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setFirstImageUrl((data) => [...data, url]);
        });
      });
    }
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'sale'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let saleArr = [];
      querySnapshot.forEach((doc) => {
        saleArr.push({ ...doc.data(), id: doc.id });
      });
      setSale(saleArr);
    });
    return () => unsubscribe();
  }, []);

  const Sale = ({ sale, toggleComplete, deleteSale }) => {
    return (
      <li>
        <div>
          <p className='text-white '>{sale.name}</p>
        </div>
        <button className='bg-red-400 px-4' onClick={() => deleteSale(sale.id)}>
          Delete
        </button>
      </li>
    );
  };

  return (
    <div className='bg-black h-fit'>
      <Nav />

      <div className='grid grid-cols-2 p-2 '>
        <div className='col-span-1'>
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

          <h1 className='text-7xl text-white tracking-tighter mt-8 font-hel'>
            New Sale listing details
          </h1>
          <p className='text-white tracking-tighter w-3/4 mt-5 font-hel'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>

         
        </div>

        <div className='col-span-1'>
          <form onSubmit={createSaleListing}>
            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>
                Listing Name*
              </h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3 '
                placeholder='Type property name'
                value={saleName}
                type='text'
                onChange={(e) => setSaleName(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>
                Listing Location*
              </h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
                placeholder='Type location'
                value={saleLocation}
                onChange={(e) => setSaleLocation(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>Currency*</h1>
              <Select onValueChange={setSaleCurrency} defaultValue="₦">
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
              <h1 className='text-white text-xl tracking-tighter'>
                Listing Price*
              </h1>
              <div className="flex items-center">
                <span className="text-white mr-2">{saleCurrency}</span>
                <input
                  className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
                  placeholder='Type sale price'
                  type='number'
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </div>
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>
                Listing Type*
              </h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
                placeholder='Studio Apartment/Duplex'
                value={saleType}
                onChange={(e) => setSaleType(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>
                Listing Size*
              </h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
                placeholder='Type listing size'
                type='number'
                value={saleSize}
                onChange={(e) => setSaleSize(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>Parking*</h1>
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
              <h1 className='text-white text-xl tracking-tighter'>
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
              <h1 className='text-white text-xl tracking-tighter'>Floor*</h1>
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
              <h1 className='text-white text-xl tracking-tighter'>Bedrooms*</h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
                placeholder='Number of bedrooms'
                type='number'
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>
                Bathrooms*
              </h1>
              <input
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
                placeholder='Number of bathrooms'
                type='number'
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>Serviced*</h1>
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
              <h1 className='text-white text-xl tracking-tighter'>
                Realtor&apos;s Note
              </h1>
              <textarea
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
                placeholder='Quick note '
                value={realtorsNote}
                onChange={(e) => setRealtorsNote(e.target.value)}
              />
            </div>

            <hr />

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>
                First Impression Image
              </h1>
              <input
                type='file'
                onChange={(e) => setFirstImage(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>Image 1</h1>
              <input
                type='file'
                onChange={(e) => setImageOne(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>Image 2</h1>
              <input
                type='file'
                onChange={(e) => setImageTwo(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>Image 3</h1>
              <input
                type='file'
                onChange={(e) => setImageThree(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>Image 4</h1>
              <input
                type='file'
                onChange={(e) => setImageFour(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>Image 5</h1>
              <input
                type='file'
                onChange={(e) => setImageFive(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>Image 6</h1>
              <input
                type='file'
                onChange={(e) => setImageSix(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <hr />

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>Video</h1>
              <p className='text-white tracking-tighter text-md my-4'>
                Upload a video tour of the property.
              </p>
              <input
                type='file'
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
              />
              <p className="text-sm text-gray-500">Maximum file size: 100MB</p>
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>Floorplan</h1>
              <p className='text-white tracking-tighter text-md my-4'>
                Upload the floorplan image.
              </p>
              <input
                type='file'
                accept="image/*"
                onChange={(e) => setFloorPlan(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <div className='my-5'>
              <h1 className='text-white text-xl tracking-tighter'>360 Images & Videos</h1>
              <p className='text-white tracking-tighter text-md my-4'>
                Upload 360-degree images .
              </p>
              <input
                type='file'
                accept="image/*,video/*"
                onChange={(e) => setImage360(e.target.files[0])}
                className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
              />
            </div>

            <button className='bg-white tracking-tighter rounded-xl w-full px-12 py-2 mt-16 hover:bg-green-500'>
              Submit
            </button>
          </form>
        </div>
      </div>
      <Success isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
    </div>
  );
}