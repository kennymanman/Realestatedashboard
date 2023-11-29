import React, {useState, useEffect} from 'react'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import { db } from '../config/firebaseConfig';
import {
  query,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import { imageDB } from '../config/firebaseConfig';
import { getDownloadURL, listAll, ref } from "firebase/storage";

import BeatLoader from "react-spinners/BeatLoader";









export default function Sale(props) {

  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(true)
  
  const [sale, setSale] = useState([]);
  // const [saleId, setSaleId] = useState('');
  // const [saleName, setSaleName] = useState('');
  // const [saleLocation, setSaleLocation] = useState('');
  // const [salePrice, setSalePrice] = useState('');
  // const [saleType, setSaleType] = useState('');


  const [firstImageUrl, setFirstImageUrl]= useState('');
  const [imageOneUrl, setImageOneUrl]= useState('');


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
 

  console.log(props,sale)



   // Read todo from firebase
   useEffect(() => {
    const q = query(collection(db, 'sale'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let saleArr = [];
      querySnapshot.forEach((doc) => {
        saleArr.push({ ...doc.data(), id: doc.id });
      });
      setSale(saleArr)
      
    });
    return () => unsubscribe();
  }, []);





  const deleteSale = async (id) => {
    await deleteDoc(doc(db, 'sale', id));
  };




  useEffect(()=>{
    listAll(ref( imageDB,"forsale")).then(imgs=>{
        console.log(imgs)
        imgs.items.forEach(val=>{
            getDownloadURL(val).then(url=>{
                setFirstImageUrl(data=>[...data,url])
                setImageOneUrl(data=>[...data,url])
            })
        })
    })
},[])

 





  const Sale = ({ sale, toggleComplete, deleteSale, index }) => {
    setIsPending(false)
    return (
<>

{/* Create New Button */}
<Link to="/NewSalesListing">
<button className='tracking-tighter text-lg  bg-green-500 px-10 rounded-full py-2 border-black border-2 place-self-center'>Create New</button>
</Link>


  
<div className='h-4/6'>
      <img className='object-fit h-full w-full' src={sale.imageUrls[0]} alt=""  />
       <h1 className='tracking-tighter text-white text-xl mt-3'>{sale.id}</h1> 
      <h1 className='tracking-tighter text-white text-2xl mt-3'>{sale.name}</h1>
      <hr className='border-white my-1'/>
      <h1 className='tracking-tighter text-white text-xl '>${sale.price}</h1>
      <hr className='border-white my-1'/>
      <h1 className='tracking-tighter text-white text-xl '>{sale.location}</h1>
      <hr className='border-white my-1'/>
      <h1 className='tracking-tighter text-white text-xl '>Type: {sale.type}</h1>

<div className='text-end'>
{/* <button onClick={()=> {navigate("/SalesListingInfo", {state:{sale}})}}  className='bg-green-500 rounded-full px-3  tracking-tighter'>
 More info
</button> */}

<button onClick={()=> {navigate("/SalesListingInfo/5i0buXSUr6JlDY01UmcR")}} className='bg-green-500 rounded-full px-3  tracking-tighter'> 
More info
</button>

</div>



</div>

</>


);
};










  return (
    <div className='bg-black min-h-screen max-h-fit  '>
      
     <Nav /> 


<div className='flex justify-between my-5 mx-2'>

<div className='flex gap-10'>
<h1 className='text-4xl text-white text-center tracking-tighter'>For Sale.</h1>

<input className='bg-slate-200 rounded-full w-96' type="search" />
</div>


<div className='flex '>

<h2 className='text-3xl text-white text-center tracking-tighter'>Listings:

{sale.length < 1 ? <>0</> : (
      <>{`${sale.length} `}</>
    )}
</h2>

</div>


</div>

     <hr className='border-white my-1'/>


     <Link to="/Listing">
  <button>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white m-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
</button>
</Link>




{ isPending && 
  
  <div className='text-center m-40'>
  <BeatLoader
  color={"#3fa158"}
  // loading={loading}
  // cssOverride={override}
  size={15}
  aria-label="Loading Spinner"
  data-testid="loader"
/>
 </div> 
  
  }


<div className='grid grid-cols-4 gap-4 p-3'>



{sale.map((sale, index) => (


            <Sale
              key={index}
              sale={sale}
              
              deleteSale={deleteSale}
            />
            
          ))
             
          }





{/* <div className='h-4/6 bg-white opacity-100 p-3 grid'>
   
   <Link to="/NewSalesListing">
       <button className='tracking-tighter text-base  bg-green-500 px-4 rounded-full py-1 border-black border-2 place-self-center'>Create New</button>
       </Link>
       </div>  */}



</div>








      <div className='grid grid-cols-4 gap-4 p-3'>
    











 



      </div>
      






     








      </div>
  )
}
