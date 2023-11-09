import React from 'react'
import Nav from '../components/Nav'
import mediaone from "../Images/mediaone.jpg"
import { Link } from 'react-router-dom'







export default function BlogDetails() {
  return (
    <div className='bg-black h-fit'>

        <Nav/>



        <Link to="/Blog">
  <button>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white m-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
</button>
</Link>




        <div className='grid grid-cols-5 gap-9 p-2'>


<div className='col-span-2 '>

<div className='h-96 my-6'>
<img className='object-cover h-full w-full' src={mediaone} alt=""  />
</div>



<div className='h-96'>
<img className='object-cover h-full w-full' src={mediaone} alt=""  />
</div> 

</div>






<div className='col-span-3'>

<button className='text-white tracking-tighter border-white border-2 text-xl rounded-full px-7 hover:bg-green-400 hover:border-black hover:text-black mt-2'>Edit</button>

<h1 className='text-white text-lg tracking-tighter mt-14'>Title</h1>

    <h1 className='text-white text-4xl tracking-tighter '>10 things about house hunting</h1>


    <h1 className='text-white text-lg tracking-tighter mt-9'>Created on</h1>

    <h1 className='text-white text-2xl tracking-tighter mt-3'>10th March 2023</h1>


    <h1 className='text-white text-lg tracking-tighter mt-9'>Details</h1>

<h1 className='text-white text-xl tracking-tighter mt-5 '>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

</h1>



<hr className='my-6'/>


<h1 className='text-white text-lg tracking-tighter mt-9'>Written by</h1>

<h1 className='text-white text-xl tracking-tighter mt-5 '>Mary Smith</h1>

<h1 className='text-white text-xl tracking-tighter mt-5 '>Sullivan Narrio</h1>

</div>



        </div>




    </div>
  )
}
