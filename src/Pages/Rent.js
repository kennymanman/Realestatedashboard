import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import {
  query,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { imageDB } from "../config/firebaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import BeatLoader from "react-spinners/BeatLoader";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function Rent(props) {
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(true);

  const [rent, setRent] = useState([]);
  // const [saleId, setSaleId] = useState('');
  // const [saleName, setSaleName] = useState('');
  // const [saleLocation, setSaleLocation] = useState('');
  // const [salePrice, setSalePrice] = useState('');
  // const [saleType, setSaleType] = useState('');

  const [firstImageUrl, setFirstImageUrl] = useState("");
  const [imageOneUrl, setImageOneUrl] = useState("");

  // const RefreshEvery5Seconds = (props) => {
  //   const [count, setCount] = useState(0);

  //   useEffect( () => {
  //       const intervalHandle = setInterval( () => {
  //           setCount( currVal => currVal + 1 );
  //         }, 5000 );

  //       return () => clearInterval(intervalHandle)
  //     }, [] );

  //   return <div>count: {count}</div>;
  // }

  console.log(props, rent);

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "rent"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let rentArr = [];
      querySnapshot.forEach((doc) => {
        rentArr.push({ ...doc.data(), id: doc.id });
      });
      setRent(rentArr);
    });
    return () => unsubscribe();
  }, []);

  const deleteRent = async (id) => {
    await deleteDoc(doc(db, "rent", id));
  };

  useEffect(() => {
    listAll(ref(imageDB, "forrent")).then((imgs) => {
      console.log(imgs);
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setFirstImageUrl((data) => [...data, url]);
          setImageOneUrl((data) => [...data, url]);
        });
      });
    });
  }, []);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('URL copied to clipboard!'))
      .catch(err => console.error('Failed to copy URL: ', err));
  };

  const RentItem = ({ rent, deleteRent }) => {
    return (
      <div className="h-5/6">
        <div className="h-96 relative grid">
          <img
            className="object-cover h-full w-full  absolute "
            src={rent.imageUrls[0]}
            alt=""
          /> 
          <div className="p-3 text-end">
            <button onClick={() => {
              navigate("/RentListingInfo/5i0buXSUr6JlDY01UmcR", {
                state: { rent },
              });
            }}  className='bg-white rounded-full p-2 ml-48 relative'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </div>
          <div className="p-3 grid content-end ">
            <p className="text-slate-500 relative tracking-tighter text-lg font-hel"> {rent.location} . {rent.type}</p>
            <div className="flex justify-between ">
              <p className="text-black relative tracking-tighter text-2xl font-hel"> {rent.name}</p>
              <p className="text-slate-700 relative tracking-tighter font-hel text-2xl"> {rent.currency} {rent.price}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Add this function to filter rents based on search term
  const filteredRents = rent.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Nav />
      <div className="min-h-screen max-h-fit mb-10">
        <div className='flex items-center space-x-2 justify-between mx-6 my-4'>
          <div className='flex items-center space-x-2'>
            <Link to="/Listing">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 stroke-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
              </button>
            </Link>

            <Input 
              value={window.location.href} 
              readOnly 
              className='w-72'
            />
            <Button onClick={copyUrlToClipboard} variant="outline" className="bg-green-500 text-black text-sm font-hel px-8 py-2 rounded-none">
              Copy
            </Button>
          </div>

          {/* Add the search bar here */}
          <Input 
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80"
          />
        </div>

        {/* {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <BeatLoader color="#000000" loading={isLoading} size={15} />
          </div>
        ) : ( */}
          <div className="grid grid-cols-3 gap-4 mx-7 ">
            <div>
              <h1 className="font-hel text-6xl tracking-tighter mt-4">Rent.</h1>
              <p className="text-gray-500 tracking-tighter text-lg font-hel">
                Created number of listings for rent: 
                <span className="text-black font-hel tracking-tighter text-4xl ml-2">
                  {filteredRents.length}
                </span>
              </p>

              <Link to="/NewRentListing">
                <button className="bg-black w-full font-hel text-white tracking-tighter mt-6 py-2">Create a new listing</button>
              </Link>
             
              <p className="tracking-tighter text-gray-500 text-sm font-hel mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>

            

            {filteredRents.map((rent, index) => (
              <RentItem key={index} rent={rent} deleteRent={deleteRent} />
            ))}
          </div>
        {/* )} */}
      </div>

      <Footer/>
    </>
  );
}
