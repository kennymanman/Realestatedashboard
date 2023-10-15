import React from 'react'
import Nav from '../components/Nav'
import testone from "../Images/testone.jpg"
import { Link } from 'react-router-dom'




export default function Sale() {
  return (
    <div className='bg-black h-fit  '>
      
     <Nav /> 


<div className='flex justify-between my-5 mx-2'>

<div className='flex gap-10'>
<h1 className='text-4xl text-white text-center tracking-tighter'>For Sale.</h1>

<input className='bg-slate-200 rounded-lg w-96' type="search" />
</div>



<h1 className='text-3xl text-white text-center tracking-tighter'>Listings: 4</h1>
</div>

     <hr className='border-white my-1'/>


     <Link to="/Listing">
  <button>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white m-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
</button>
</Link>







      <div className='grid grid-cols-4 gap-4 p-3'>
    

    <div className='h-4/6'>
      <img className='object-fit h-full w-full' src={testone} alt=""  />
      <h1 className='tracking-tighter text-white text-xl mt-3'>Shoreline View Apartment</h1>
      <hr className='border-white my-1'/>
      <h1 className='tracking-tighter text-white text-xl '>$53,000</h1>
      <hr className='border-white my-1'/>
      <h1 className='tracking-tighter text-white text-xl '>Madrid, Spain.</h1>
      <hr className='border-white my-1'/>
      <h1 className='tracking-tighter text-white text-xl '>Type: Apartment</h1>

      <div className='text-end'>
        <Link to="/SalesListingInfo" >
        <button className='bg-green-500 rounded-full px-3  tracking-tighter'>
         More info
        </button>
        </Link>
      </div>
    </div>








    <div className='h-4/6 bg-slate-400 opacity-100 p-3 '>
    {/* <button className='bg-green-500 rounded-full tracking-tighter px-5 py-5'>
     
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-8 stroke-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>


    </button> */}
<Link to="/NewSalesListing">
    <button className='tracking-tighter text-xl  bg-green-500 px-4 rounded-full py-1 border-black border-2'>Create New</button>
    </Link>
    </div>

 



      </div>
      




      </div>
  )
}
