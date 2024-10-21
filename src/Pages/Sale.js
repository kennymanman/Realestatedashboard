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



export default function Sale(props) {
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(true);

  const [sale, setSale] = useState([]);
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

  console.log(props, sale);

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "sale"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let saleArr = [];
      querySnapshot.forEach((doc) => {
        saleArr.push({ ...doc.data(), id: doc.id });
      });
      setSale(saleArr);
    });
    return () => unsubscribe();
  }, []);

  const deleteSale = async (id) => {
    await deleteDoc(doc(db, "sale", id));
  };

  useEffect(() => {
    listAll(ref(imageDB, "forsale")).then((imgs) => {
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




  const Sale = ({ sale, toggleComplete, deleteSale, index }) => {
    setIsPending(false);




    return (
      <>
       

        {/* <div className="h-4/6">
          <img
            className="object-fit h-full w-full"
            src={sale.imageUrls[0]}
            alt=""
          />
          <h1 className="tracking-tighter text-white text-xl mt-3">
            {sale.id}
          </h1>
          <h1 className="tracking-tighter text-white text-2xl mt-3">
            {sale.name}
          </h1>
          <hr className="border-white my-1" />
          <h1 className="tracking-tighter text-white text-xl ">
            ${sale.price}
          </h1>
          <hr className="border-white my-1" />
          <h1 className="tracking-tighter text-white text-xl ">
            {sale.location}
          </h1>
          <hr className="border-white my-1" />
          <h1 className="tracking-tighter text-white text-xl ">
            Type: {sale.type}
          </h1>

          <div className="text-end">
       

            <button
              onClick={() => {
                navigate("/SalesListingInfo/5i0buXSUr6JlDY01UmcR", {
                  state: { sale },
                });
              }}
              className="bg-green-500 rounded-full px-3  tracking-tighter"
            >
              More info
            </button>
          </div>
        </div>  */}


<div className="h-5/6">
<div className="h-96 relative grid">

  <img
            className="object-cover h-full w-full  absolute "
            src={sale.imageUrls[0]}
            alt=""
          /> 

<div className="p-3 text-end">

<button onClick={() => {
                navigate("/SalesListingInfo/5i0buXSUr6JlDY01UmcR", {
                  state: { sale },
                });
              }}  className='bg-white rounded-full p-2 ml-48 relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
</div>




<div className="p-3 grid content-end ">
<p className="text-slate-500 relative tracking-tighter text-lg font-hel"> {sale.location} . {sale.type}</p>
<div className="flex justify-between ">
  <p className="text-slate-200 relative tracking-tighter text-2xl font-hel"> {sale.name}</p>

  <p className="text-slate-300 relative tracking-tighter font-hel text-2xl"> ₦ {sale.price}</p>
</div>

</div>


</div>
</div>
      </>
    );
  };



  const [searchTerm, setSearchTerm] = useState("");

  // Add this function to filter sales based on search term
  const filteredSales = sale.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              className='w-50'
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
            className="w-64"
          />
        </div>

        {/* ... (loading spinner) */}

        <div className="grid grid-cols-3 gap-4 mx-7 ">
          <div>
            <h1 className="font-hel text-6xl tracking-tighter mt-4">Sale.</h1>
            <p className="text-gray-500 tracking-tighter text-lg font-hel">
              Created number of listings for sale:
              <span className="text-black font-hel tracking-tighter text-4xl">
                {filteredSales.length}
              </span>
            </p>
            {/* ... (rest of the content) */}
          </div>

          {filteredSales.map((sale, index) => (
            <Sale key={index} sale={sale} deleteSale={deleteSale} />
          ))}
        </div>
      </div>

      <Footer/>
    </>
  );
}
