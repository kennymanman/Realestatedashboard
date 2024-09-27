import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import contactimagefive from '../Images/contactimagefive.jpg';
import testtwo from '../Images/testtwo.jpg';
// import dashvideo from "../Video/dashvideo.mp4"
import floorplan from '../Images/floorplan.jpg';
import { Link } from 'react-router-dom';

import { db } from '../config/firebaseConfig';
import { updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';

import virtual from '../Images/virtual.jpg';

import { getDownloadURL, ref, uploadBytes, getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { imageDB } from '../config/firebaseConfig'


// import { Pannellum } from "pannellum-react";

import BeatLoader from "react-spinners/BeatLoader";
import RefreshEvery5Seconds from '../components/RefreshEvery5Seconds';















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
  }, [document, id]);

  return <div>doc is {JSON.stringify(document)}</div>;
}












export default function SalesListingInfo(props) {
  let { salesId } = useParams();

  console.log('<SalesListingInfo> salesId param: ', salesId);

  const location = useLocation();
  const navigate = useNavigate();

  console.log('location.state is:', location.state);
  const sale = location.state.sale;
  // sale.id = location.state.sale.id;

  const [saleName, setSaleName] = useState(sale.name);
  const [saleLocation, setSaleLocation] = useState(sale.location);
  const [firstImage, setFirstImage] = useState(sale.imageUrls[0]);
  const [imageOne, setImageOne] = useState(sale.imageUrls[1]);

  // const RefreshEvery5Seconds = (props) => {
  //   const [count, setCount] = useState(0);

  //   useEffect( () => {
  //       const intervalHandle = setInterval( () => {
  //           setCount( currVal => currVal + 1 );
  //         }, 5000 );

  //       return () => clearInterval(intervalHandle)
  //     }, [] );

  //   return <div><p className='text-white'>count: {count}</p></div>;
  // }

  // //Edit Sale
  // const editSale = async ({id}) => {
  //   const saleDoc = doc(db, "sale",id, location.state.sale.id, location.state.sale.name , location.state.sale.imageUrls[0], location.state.sale.imageUrls[1] );
  //   // const newDate = {date: new Date().toLocaleString() }
  //   await updateDoc(saleDoc, {})

  // };

  // const editSale = () => {
  //   const saleDoc = doc(db, "sale", sale.id);
  //   const newData = {
  //     name: saleName,
  //     location: saleLocation,
  //     imageUrls: [firstImage, imageOne],
  //     //  date: new Date().toLocaleString()  // << if you want to add this
  //   };

  //   return updateDoc(saleDoc, newData)
  // };


  
  const editSale = async (event) => {
    event.preventDefault();

    let imageUrls = [];

    if (firstImage !== null) {
      const firstImageRef = ref(imageDB, `forsale/${uuidv4()}`);
      const value = await uploadBytes(firstImageRef, firstImage);
      console.log('uploadBytes returned:', value);
      const firstImageUrl = await getDownloadURL(value.ref);
      if (firstImageUrl) {
        imageUrls.push(firstImageUrl);
      }
    }

    if (imageOne !== null) {
      const imageOneRef = ref(imageDB, `forsale/${uuidv4()}`);
      const value = await uploadBytes(imageOneRef, imageOne);
      console.log('uploadBytes returned:', value);
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

      //  date: new Date().toLocaleString()  // << if you want to add this
    };
    console.log('updating sale doc to:', newData);
    return updateDoc(saleDoc, newData);
  };

  console.log('sale is', location.state.sale);

  // Delete Sale
  const deleteSale = async (id) => {
    await deleteDoc(doc(db, 'sale', id));
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

            <img
              className='object-cover h-full w-full'
              src={sale.imageUrls[0]}
              alt=''
            />

            <input
              className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
              onChange={(e) => setFirstImage(e.target.files[0])}
              type='file'
            />


{/* <div>
      {imageUrl && <img src={imageUrl} alt="Downloadable Image" />}
      <button className='bg-white px-4' onClick={handleDownload} disabled={!downloadUrl}>
        Download Image
      </button>
    </div> */}
       
      
    




            <img
              className='object-cover h-full w-full'
              src={sale.imageUrls[1]}
              alt=''
            />

            <input
              className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
              onChange={(e) => setImageOne(e.target.value)}
              type='file'
            />

            <button className='bg-green-200 px-4'>Update</button>
          </form>

          <div className='flex justify-between my-7 '>
            <h1 className='text-xl tracking-tighter text-white '>
              Property Location:
            </h1>
            <h1 className='text-xl tracking-tighter text-white max-w-md  '>
              {location.state.sale.location}
            </h1>
          </div>

          <div className='flex justify-between my-7 '>
            <h1 className='text-xl tracking-tighter text-white '>Price:</h1>
            <h1 className='text-xl tracking-tighter text-white max-w-md  '>
              40,000
            </h1>
          </div>

          <div className='flex justify-between my-7 '>
            <h1 className='text-xl tracking-tighter text-white '>Type:</h1>
            <h1 className='text-xl tracking-tighter text-white max-w-md  '>
              Apartment
            </h1>
          </div>

          <div className='flex justify-between my-7 '>
            <h1 className='text-xl tracking-tighter text-white '>Size:</h1>
            <h1 className='text-xl tracking-tighter text-white max-w-md  '>
              1200SQM
            </h1>
          </div>

          <div className='flex justify-between my-7 '>
            <h1 className='text-xl tracking-tighter text-white '>Parking:</h1>
            <h1 className='text-xl tracking-tighter text-white max-w-md  '>
              Available
            </h1>
          </div>

          <div className='flex justify-between my-7 '>
            <h1 className='text-xl tracking-tighter text-white '>
              Availability:
            </h1>
            <h1 className='text-xl tracking-tighter text-white max-w-md  '>
              Available
            </h1>
          </div>

          <div className='flex justify-between my-7 '>
            <h1 className='text-xl tracking-tighter text-white '>Floor:</h1>
            <h1 className='text-xl tracking-tighter text-white max-w-md  '>
              Available
            </h1>
          </div>

          <div className='flex justify-between my-7 '>
            <h1 className='text-xl tracking-tighter text-white '>Bedrooms:</h1>
            <h1 className='text-xl tracking-tighter text-white max-w-md  '>
              4
            </h1>
          </div>

          <div className='flex justify-between my-7 '>
            <h1 className='text-xl tracking-tighter text-white '>Bathrooms:</h1>
            <h1 className='text-xl tracking-tighter text-white max-w-md  '>
              4
            </h1>
          </div>

          <div className='flex justify-between my-7 '>
            <h1 className='text-xl tracking-tighter text-white '>Serviced:</h1>
            <h1 className='text-xl tracking-tighter text-white max-w-md  '>
              No
            </h1>
          </div>

          <div className='flex justify-between my-7 '>
            <h1 className='text-xl tracking-tighter text-white '>
              Realtor&apos;s Note:
            </h1>
            <h1 className='text-lg tracking-tighter text-white max-w-sm  '>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry&apos;s
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen
              book..
            </h1>
          </div>

          <div className='flex justify-between'>
            <button
              onClick={() => {
                navigate('/NewSalesListing', { state: { sale } });
              }}
              className='bg-green-500 rounded-full px-5  tracking-tighter'
            >
              Edit{' '}
            </button>

            <button
              onClick={() => {
                navigate('/Sale', deleteSale(location.state.sale.id));
              }}
              className='bg-red-500 rounded-full px-5  tracking-tighter'
            >
              Delete{' '}
            </button>
          </div>
        </div>

        <div className='col-span-3'>
          <h1 className='text-xl tracking-tighter text-white my-3 '>
            First Impression
          </h1>
          <div className=''>
            <img
              className='object-cover h-full w-full'
              src={location.state.sale.imageUrls[0]}
              alt=''
            />

            <input
              className='object-cover h-full w-full'
              src={location.state.sale.imageUrls[0]}
              alt=''
              type='file'
            />
          </div>
        </div>
      </div>

      <hr className='bg-white my-3' />

      <div className='grid grid-cols-3 p-2 gap-3'>
        <div className='col-span-1'>
          <h1 className='text-xl tracking-tighter text-white my-2 '>Image 1</h1>
          <div className='h-5/6'>
            <img
              className='object-cover h-full w-full'
              src={contactimagefive}
              alt=''
            />
          </div>
        </div>

        <div className='col-span-1'>
          <h1 className='text-xl tracking-tighter text-white my-2 '>Image 2</h1>
          <div className='h-5/6'>
            <img className='object-cover h-full w-full' src={testtwo} alt='' />
          </div>
        </div>

        <div className='col-span-1'>
          <h1 className='text-xl tracking-tighter text-white my-2 '>Image 3</h1>
          <div className='h-5/6'>
            <img
              className='object-cover h-full w-full'
              src={contactimagefive}
              alt=''
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 p-2 gap-3'>
        <div className='col-span-1'>
          <h1 className='text-xl tracking-tighter text-white my-2 '>Image 4</h1>
          <div className='h-5/6'>
            <img
              className='object-cover h-full w-full'
              src={contactimagefive}
              alt=''
            />
          </div>
        </div>

        <div className='col-span-1'>
          <h1 className='text-xl tracking-tighter text-white my-2 '>Image 5</h1>
          <div className='h-5/6'>
            <img className='object-cover h-full w-full' src={testtwo} alt='' />
          </div>
        </div>

        <div className='col-span-1'>
          <h1 className='text-xl tracking-tighter text-white my-2 '>Image 6</h1>
          <div className='h-5/6'>
            <img
              className='object-cover h-full w-full'
              src={contactimagefive}
              alt=''
            />
          </div>
        </div>
      </div>

      <hr className='bg-white my-3' />

      <h1 className='text-xl tracking-tighter text-white my-2 text-center '>
        Video of Property
      </h1>
      <div className='h-2/4 p-2'>
        <video
          autoPlay
          loop
          className='object-fit h-full w-full'
          src={
            'https://player.vimeo.com/external/510522235.sd.mp4?s=dcd6cb044aa36f8acb85d68789e34c735a4f10ec&profile_id=164&oauth2_token_id=57447761'
          }
          type='mp4'
        />
      </div>

      <h1 className='text-xl tracking-tighter text-white my-2 text-center '>
        Floor Plan
      </h1>

      <div className='h-1/3 p-2'>
        <img className='object-cover h-full w-full' src={floorplan} alt='' />
      </div>

      {/* <Pannellum
        width="100%"
        height="500px"
        image={virtual}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        onLoad={() => {
            console.log("panorama loaded");
        }}
    >
      <Pannellum.Hotspot
        type="info"
        pitch={11}
        yaw={-167}
        text="Info Hotspot Text 3"
        URL="https://github.com/farminf/pannellum-react"
      />

      <Pannellum.Hotspot
        type="info"
        pitch={31}
        yaw={-107}
        text="Info Hotspot Text 4"
        URL="https://github.com/farminf/pannellum-react"
      />
    </Pannellum> */}

      {/* <Pannellum
        width="100%"
        height="500px"
        image={virtual}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        showZoomCtrl={false}
        onLoad={() => {
          console.log("panorama loaded");
        }}
      >
        <Pannellum.Hotspot
          type="custom"
          pitch={31}
          yaw={150}
          handleClick={(evt, name) => console.log(name)}
          name="hs1"
        />
      </Pannellum> */}

      {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"/>

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>

<div className='w-full h-screen'>


</div> */}

      {/* <div className="h-screen flex">
                <Pannellum
                    width="100%"
                    height="100%"
                    image={virtual}
                    yaw={300}
                    hfov={110}
                    autoLoad
                    autoRotate={-5}
                    compass={true}
                    showZoomCtrl={false}
                    mouseZoom={false}
                    onLoad={() => {
                        console.log("panorama loaded");
                    }}
                >
                  
                </Pannellum>

            </div> */}

      {/* 
<div className="h-screen flex">

            <PannellumVideo
      video={virtualvideo}
      loop
      width="100%"
      height="600px"
      pitch={10}
      yaw={180}
      hfov={140}
      minHfov={50}
      maxHfov={180}
    >
      <Pannellum.Hotspot
        type="custom"
        pitch={31}
        yaw={150}
        handleClick={(evt , name) => this.hanldeClick(name)}
        name="hs1"
      />

      <Pannellum.Hotspot
        type="info"
        pitch={31}
        yaw={-57}
        text="Info"
        URL="https://github.com/farminf"
      />
    </PannellumVideo>

</div> */}
    </div>
  );
}
