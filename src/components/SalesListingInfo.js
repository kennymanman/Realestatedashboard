import React from 'react'
import Nav from './Nav'
import contactimagefive from "../Images/contactimagefive.jpg"
import testtwo from "../Images/testtwo.jpg"
import dashvideo from "../Video/dashvideo.mp4"
import floorplan from "../Images/floorplan.jpg"
import { Link } from 'react-router-dom'





export default function SalesListingInfo() {
  return (

  <div className='bg-black h-fit'>
        
  <Nav />

<Link to="/Sale">
  <button>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white m-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
</button>
</Link>


<div className='grid grid-cols-5 gap-7 p-2'>

<div className=' mt-60 col-span-2'>


<div className='flex justify-between my-7 '>
    <h1 className='text-xl tracking-tighter text-white '>Property Name:</h1>
    <h1 className='text-xl tracking-tighter text-white max-w-sm '>Shoreside Vale.</h1>
</div>


<div className='flex justify-between my-7 '>
    <h1 className='text-xl tracking-tighter text-white '>Property Location:</h1>
    <h1 className='text-xl tracking-tighter text-white max-w-md  '>Lagos, Nigeria</h1>
</div>



<div className='flex justify-between my-7 '>
    <h1 className='text-xl tracking-tighter text-white '>Price:</h1>
    <h1 className='text-xl tracking-tighter text-white max-w-md  '>40,000</h1>
</div>



<div className='flex justify-between my-7 '>
    <h1 className='text-xl tracking-tighter text-white '>Type:</h1>
    <h1 className='text-xl tracking-tighter text-white max-w-md  '>Apartment</h1>
</div>




<div className='flex justify-between my-7 '>
    <h1 className='text-xl tracking-tighter text-white '>Parking:</h1>
    <h1 className='text-xl tracking-tighter text-white max-w-md  '>Available</h1>
</div>



<div className='flex justify-between my-7 '>
    <h1 className='text-xl tracking-tighter text-white '>Availability:</h1>
    <h1 className='text-xl tracking-tighter text-white max-w-md  '>Available</h1>
</div>





<div className='flex justify-between my-7 '>
    <h1 className='text-xl tracking-tighter text-white '>Floor:</h1>
    <h1 className='text-xl tracking-tighter text-white max-w-md  '>Available</h1>
</div>



<div className='flex justify-between my-7 '>
    <h1 className='text-xl tracking-tighter text-white '>Bedrooms:</h1>
    <h1 className='text-xl tracking-tighter text-white max-w-md  '>4</h1>
</div>


<div className='flex justify-between my-7 '>
    <h1 className='text-xl tracking-tighter text-white '>Bathrooms:</h1>
    <h1 className='text-xl tracking-tighter text-white max-w-md  '>4</h1>
</div>



<div className='flex justify-between my-7 '>
    <h1 className='text-xl tracking-tighter text-white '>Serviced:</h1>
    <h1 className='text-xl tracking-tighter text-white max-w-md  '>No</h1>
</div>




<div className='flex justify-between my-7 '>
    <h1 className='text-xl tracking-tighter text-white '>Note from you:</h1>
    <h1 className='text-lg tracking-tighter text-white max-w-sm  '>Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..</h1>
</div>



 </div>       
        











<div className='col-span-3'>

<h1 className='text-xl tracking-tighter text-white my-3 '>First Impression</h1>
<div className=''>
  <img className='object-cover h-full w-full' src={contactimagefive} alt=""   />
</div>


</div>


</div>


<hr className='bg-white my-3'/>




<div className='grid grid-cols-3 p-2 gap-3'>

<div className='col-span-1'>
<h1 className='text-xl tracking-tighter text-white my-2 '>Image 1</h1>
<div className='h-5/6'>
<img className='object-cover h-full w-full' src={contactimagefive} alt=""  />
</div>
</div>


<div className='col-span-1'>
<h1 className='text-xl tracking-tighter text-white my-2 '>Image 2</h1>
<div className='h-5/6'>
<img className='object-cover h-full w-full' src={testtwo} alt=""  />
</div>
</div>



<div className='col-span-1'>
<h1 className='text-xl tracking-tighter text-white my-2 '>Image 3</h1>
<div className='h-5/6'>
<img className='object-cover h-full w-full' src={contactimagefive} alt=""  />
</div>
</div>

</div>











<div className='grid grid-cols-3 p-2 gap-3'>

<div className='col-span-1'>
<h1 className='text-xl tracking-tighter text-white my-2 '>Image 4</h1>
<div className='h-5/6'>
<img className='object-cover h-full w-full' src={contactimagefive} alt=""  />
</div>
</div>


<div className='col-span-1'>
<h1 className='text-xl tracking-tighter text-white my-2 '>Image 5</h1>
<div className='h-5/6'>
<img className='object-cover h-full w-full' src={testtwo} alt=""  />
</div>
</div>



<div className='col-span-1'>
<h1 className='text-xl tracking-tighter text-white my-2 '>Image 6</h1>
<div className='h-5/6'>
<img className='object-cover h-full w-full' src={contactimagefive} alt=""  />
</div>
</div>

</div>


<hr className='bg-white my-3'/>

<h1 className='text-xl tracking-tighter text-white my-2 text-center '>Video of Property</h1>
<div className='h-2/4 p-2'>
<video autoPlay loop className='object-fit h-full w-full'  src={dashvideo} type="mp4"  />
</div>





<h1 className='text-xl tracking-tighter text-white my-2 text-center '>Floor Plan</h1>

<div className='h-1/3 p-2'>
<img className='object-cover h-full w-full' src={floorplan} alt=""  />
</div>




        </div>
  )
}
