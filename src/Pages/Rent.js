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

  const Rent = ({ rent, toggleComplete, deleteRent, index }) => {
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
            className="object-fit h-full w-full rounded-lg absolute brightness-75 hover:brightness-90"
            src={rent.imageUrls[0]}
            alt=""
          /> 

<div className="p-3 text-end">
  <button   onClick={() => {
                navigate("/RentListingInfo/5i0buXSUr6JlDY01UmcR", {
                  state: { rent },
                });
              }} 
              className="relative bg-white tracking-tighter px-4 rounded-full hover:bg-orange-500">Details</button>
</div>




<div className="p-3 grid content-end ">
<p className="text-slate-300 relative tracking-tighter text-lg"> {rent.location} . {rent.type}</p>
<div className="flex justify-between ">
  <p className="text-white relative tracking-tighter text-xl"> {rent.name}</p>

  <p className="text-white relative tracking-tighter text-xl"> ₦ {rent.price}</p>
</div>

</div>


</div>
</div>
      </>
    );
  };

  return (
    <div className="bg-black min-h-screen max-h-fit  ">
      <Nav />

      <Link to="/Listing">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 stroke-white m-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </button>
      </Link>

      {/* {isPending && (
        <div className="text-center m-40">
          <BeatLoader
            color={"#3fa158"}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )} */}

      <div className="grid grid-cols-3 gap-4 mx-7 ">
        <div>
          <p className="text-slate-300 tracking-tighter text-lg">Created. number of listings for rent: {rent.length < 1 ? <>0</> : <>{`${rent.length} `}</>} </p>
          <Link to="/NewRentListing">
            <button className="bg-white px-5 tracking-tighter rounded-full mt-6 hover:bg-green-600">Create a new rent listing</button>
          </Link>
        </div>

        {rent.length > 0 ? (
          rent.map((rent, index) => (
            <Rent key={index} rent={rent} deleteSale={deleteRent} />
          ))
        ) : (
          <div className="tracking-tighter col-span-3 text-center text-white text-xl mt-10 ">
          Here seems a bit empty!
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 p-3"></div>
    </div>
  );
}
