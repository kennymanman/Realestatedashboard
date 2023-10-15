import React from 'react'
import Nav from "./components/Nav"
import augustflowdashboard from "./Images/augustflowdashboard.jpg"
import dashvideo from "./Video/dashvideo.mp4"
import { Link } from 'react-router-dom'




export default function Dashboard() {
  return (
    <div className='bg-black h-fit'>
        
      <Nav/>  
        
        
        
    <div className='grid grid-cols-2 h-fit p-2 gap-2'>


<div className='col-span-1 grid grid-rows-3 gap-2'>




<div className='row-span-1 grid grid-cols-3 gap-2  h-64'>

<div className='col-span-2  relative grid   '>
<img className='absolute object-cover h-full w-full rounded-xl' src={augustflowdashboard} alt=""  />
<h1 className='relative text-5xl tracking-tighter text-white px-2  place-self-center'>Dashboard.</h1>
</div>



<div className='col-span-1 bg-white rounded-lg p-2 flex items-stretch'>
    {/* <h1 className='tracking-tighter text-xl text-center self-start'>Scheduled Inspections</h1> */}


<div className='self-end' >
<Link  to="/ScheduledInspection">
    <button className='bg-black px-8 py-1 rounded-full  place-self-end'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>
</button>
</Link>
</div>

</div>


</div>




<div className='row-span-2 bg-orange-200   '>


</div>




</div>











<div className='col-span-1 grid grid-rows-3 gap-2  '>

<div className='bg-white row-span-1 rounded-lg p-2 '>
<h1 className='tracking-tighter text-xl text-center'>Property Listing</h1>

<div className='self-end' >
<Link  to="/Listing">
    <button className='bg-black px-8 py-1 rounded-full  place-self-end'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>
</button>
</Link>
</div>

</div>



<div className=' row-span-1 grid grid-cols-7 gap-2 h-64 row-end-3 '>

<div className='col-span-2 bg-white rounded-lg p-2'>
<Link  to="/Media">
    <button className='bg-black px-8 py-1 rounded-full  place-self-end'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>
</button>
</Link>
<h1 className='tracking-tighter text-xl text-center'>Media & News</h1>
</div>


<div className='col-span-3 bg-white rounded-lg p-2'>
<Link  to="/StaffMembers">
    <button className='bg-black px-8 py-1 rounded-full  place-self-end'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>
</button>
</Link>
<h1 className='tracking-tighter text-xl text-center'>Staff Members</h1>
</div>


<div className='col-span-2 bg-white rounded-lg'>
<h1 className='tracking-tighter text-xl text-center'>Blog</h1>
</div>

</div>




<div className='bg-red-200 row-span-1 relative '>
<video autoPlay loop  className='absolute h-full w-full object-cover' src={dashvideo} type="mp4" />

</div>

</div>




    </div>




    <hr className='bg-white my-4'/>


<div className='grid grid-cols-3'>
    <p className='text-white tracking-tighter px-2 col-span-1 '>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy.</p>



    <p className='text-white tracking-tighter px-2 col-span-1 text-center'>Designed & built by August Deep Tech.</p>


    <p className='text-white tracking-tighter px-2 col-span-1 text-end text-2xl'>12:22 AM</p>
 </div> 

        </div>
  )
}



