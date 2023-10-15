import React from 'react'
import Nav from "../components/Nav"
import { Link } from 'react-router-dom'


export default function CreateStaff() {
  return (

    <div className='bg-black h-screen'>

        <Nav/>


        <Link to="/StaffMembers">
  <button>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white m-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
</button>
</Link>



        
     <div className='grid grid-cols-3 p-2 gap-8'>

    <div className='col-span-1  '>

<div className='grid'>
<img className='place-self-center' src={"https://placehold.co/400x500"} alt="" />


</div>

<div className='text-center'>
<button className='bg-green-500  tracking-tighter  mt-6 px-5 py-2 rounded-lg'>Upload Image.</button>
</div>


     </div>




     <div className='col-span-1 flex flex-col gap-8   p-2 '>

    <input placeholder='Full Name' className='p-3  border-b-2 border-slate-500 bg-transparent text-white' type='text'  />

    <input placeholder='Job Role' className='p-3  border-b-2 border-slate-500 bg-transparent text-white' type='text'  />

    <div className='text-center'>
<button className='bg-green-500  tracking-tighter  mt-6 px-5 py-2 rounded-lg'>Submit</button>
</div>


     </div>




<div className='col-span-1'>


<p className='text-white tracking-tighter'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

</p>
</div>






</div>





        </div>
  )
}
