import React from 'react'
import Nav from '../components/Nav'
import rent from "../Images/rent.jpg"
import Sale from "../Images/Sale.jpg"
import contactimagefive from "../Images/contactimagefive.jpg"
import { Link,  useNavigate } from 'react-router-dom'





export default function Listing() {

  const navigate = useNavigate();


  return (
    <div className='  bg-black min-h-screen max-h-fit'>

<Nav/>


{/* <div className='flex justify-between'> */}


<Link to="/Dashboard">
  <button >
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white m-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
</button>
</Link>




{/* <h1 className='tracking-tighter text-2xl'>AugustFlow</h1>



</div>

<hr className='border-black mt-2'/> */}







<div className='grid grid-cols-3 gap-5 mt-32 '>

<div className='col-span-1 h-5/6 '>
<img className='h-full w-full object-cover' src={contactimagefive} alt=""  />

<div className='flex justify-between'>
  <h1 className='text-2xl tracking-tighter text-white'>Manage For Sale</h1>

<Link to="/Sale">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</Link>


</div>
</div>




<div className='col-span-1 h-5/6 '>
<img className='h-full w-full object-cover' src={contactimagefive} alt=""  />
<div className='flex justify-between'>
  <h1 className='text-2xl tracking-tighter text-white'>Manage For Rent</h1>

  <Link to="/Rent">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</Link>

</div>
</div>




<div className='col-span-1 h-5/6 '>
<img className='h-full w-full object-cover' src={contactimagefive} alt=""  />
<div className='flex justify-between'>
  <h1 className='text-2xl tracking-tighter text-white'>Manage For Shortlet</h1>

  <Link to="/Shortlet">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</Link>


</div>
</div>



</div>



<h1 className='tracking-tighter text-center text-4xl mt-4 text-white'>Keep Track of all your listing with AugustFlow.</h1>
<p className='tracking-tighter text-center px-36 text-white'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>


<hr className='border-black mt-7'/>

<h2 className='tracking-tighter text-center mt-2'>Developed & designed by August Deep Tech</h2>

    </div>
  )
}
