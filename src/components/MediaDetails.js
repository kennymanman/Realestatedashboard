import React from 'react'
import Nav from './Nav'
import contactimagefive from "../Images/contactimagefive.jpg"
import { Link } from 'react-router-dom'




export default function MediaDetails() {
  return (
    <div className='bg-black h-fit'>

  <Nav/>


  <Link to="/Media">
  <button>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white m-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
</button>
</Link>




<div className='p-5'>
<h1 className='text-5xl text-white tracking-tighter text-center mt-4'> Award for the best Real Estate firm 2023</h1>
<h1 className='text-2xl text-white tracking-tighter text-center mt-3 mb-10'>Published on 2nd March 2023</h1>

<div className='h-2/4'>

<img className='object-cover  w-full' src={contactimagefive} alt=""  />





<div className='grid grid-cols-2 gap-7 mt-20'>

    <div className='col-span-1'>
    <h1 className='text-lg text-white tracking-tighter  '> Article written by</h1>
    <div className='flex gap-6'>
    <h1 className='text-2xl text-white tracking-tighter mt-4'> Micheal Law</h1>
    <h1 className='text-2xl text-white tracking-tighter mt-4'> Janet Francis</h1>
    </div>
    </div>







    <div className='col-span-1'>
    <h1 className='text-lg text-white tracking-tighter  '> Full details</h1>

    <p className='text-xl text-white tracking-tighter mt-9'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>



    <h1 className='text-lg text-white tracking-tighter mt-20  '>Link to original article</h1>

    <button className='text-white tracking-tighter border-white border-2 rounded-full px-5 hover:bg-white hover:text-black mt-10'>Original</button>
    </div>




</div>




</div>



</div>

    </div>
  )
}
