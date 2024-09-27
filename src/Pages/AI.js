import React from 'react'
import Nav from '../components/Nav'
import Aione from "../Images/Aione.jpg"
import { Link } from 'react-router-dom'





export default function AI() {
  return (
    <div className='bg-black '>

      <Nav/>


<img src={Aione} className='absolute h-max  w-full ' alt="artificial intelligence"   />


{/* Start of Grid */}
  <div className='grid grid-cols-2 m-2  gap-4 h-screen relative '> 
      
      
   <div className='col-span-1  relative '>

   {/* <video muted autoPlay loop className='absolute rounded-lg h-full w-full object-cover' src={"https://player.vimeo.com/progressive_redirect/playback/792828792/rendition/540p/file.mp4?loc=external&oauth2_token_id=57447761&signature=d530146041bd05c2c979c74fa1226fa1ff8a4ff93bbefdc52b5ea280b9fcbe44"}  /> */}


  <h2 className='text-white tracking-tighter relative text-6xl pt-8 pb-4   px-2'>A.I.</h2>

  <hr className='relative mx-2' />

  {/* <h2 className='text-white tracking-tighter relative text-2xl py-7 px-2'>Combining Real estate with cutting edge Artificial Intelligence Lorem Ipsum is simply dummy text of the printing and typesetting industry..</h2> */}


<div className='grid grid-cols-2 mt-7'>

  <div className='col-span-1'>
    <h2 className='tracking-tighter text-slate-300 text-lg'>August Deep Tech</h2>
   <h2 className='tracking-tighter text-white text-xl'>Artificial Intelligence meets Real Estate</h2>
  </div>


  <div className='col-span-1'>
    <h2 className='tracking-tighter text-slate-300 text-lg'>2023</h2>
   <h2 className='tracking-tighter text-white text-xl'>Combining Real estate with cutting edge Artificial Intelligence alongside property management & collaboration.</h2>
   <h2 className='tracking-tighter text-slate-300 text-lg mt-8'>support@augustdeeptech.com</h2>
  </div>


</div>
    
    </div>   








<div className='col-span-1 bg-black rounded-lg h-fit w-full p-2   '>


<div className='grid grid-cols-2 h-96 gap-2 '>

<div className='col-span-1 bg-white rounded-lg p-2 grid hover:scale-105 '>
<div className='place-self-start '>
<h3 className='tracking-tighter text-lg '>01.</h3>
</div>

<div className='place-self-center '>
<h3 className='tracking-tighter text-3xl text-center '>Prime-GPT</h3>
<p className='text-slate-400 tracking-tighter text-center mt-3'>Think of ChatGPT but designed, trained and built for just your agency.</p>
</div>

 <div className='place-self-end '>
<Link to="/GPT">
 <button className='bg-black rounded-full text-white px-9 '>T</button>
 </Link>
 </div>
</div>



<div className='col-span-1 bg-white rounded-lg p-2 grid hover:scale-105 '>
<div className='place-self-start '>
<h3 className='tracking-tighter text-lg place-content-start'>02.</h3>
</div>

<div className='place-self-center '>
<h3 className='tracking-tighter text-3xl text-center '>Chat with PDF</h3>
<p className='text-slate-400 tracking-tighter text-center mt-3'>Communicate & converse with documents with the power of A.I.</p>
</div>

 <div className='place-self-end '>
 <button className='bg-black rounded-full text-white px-9 '>T</button>
 </div>
</div>
 
</div>





    
<div className='grid grid-cols-2 h-96 gap-2 mt-2 '>

<div className='col-span-1 bg-white rounded-lg p-2 grid hover:scale-105 '>
<div className='place-self-start '>
<h3 className='tracking-tighter text-lg place-content-start'>03.</h3>
</div>


<div className='place-self-center '>
<h3 className='tracking-tighter text-3xl '>AI Summarizer</h3>
<p className='text-slate-400 tracking-tighter text-center mt-3'>Summarize and save time with A.I</p>
</div>

 <div className='place-self-end '>
 <button className='bg-black rounded-full text-white px-9 '>T</button>
 </div>
</div>
  
 
</div>

    
</div> 
      
      
      
      
      
       </div>




<div className='relative flex justify-center mt-52'>

<button className='border-2 border-white rounded-full px-4  text-white tracking-tighter hover:bg-white hover:text-black'>To the top</button>
</div>


    </div>
  )
}
