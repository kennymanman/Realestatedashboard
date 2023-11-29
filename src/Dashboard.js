import React, {useState, useEffect} from 'react'
import Nav from "./components/Nav"
import augustflowdashboard from "./Images/augustflowdashboard.jpg"
// import dashvideo from "./Video/dashvideo.mp4"
import { Link } from 'react-router-dom'
import * as dayjs from "dayjs"





export default function Dashboard() {

//Regular code to get the time
const [time,setTime] =useState(new Date())
useEffect(()=>{
        setInterval(()=>setTime(new Date()),1000)
},[])


//For date by Day.JS
   const c = dayjs()






  return (
    <div className='bg-black h-fit'>
        
      <Nav/>  
        


{/* <h1 className='text-5xl tracking-tighter text-white px-2 py-4'>Nigeria</h1>

<p className='text-lg tracking-tighter max-w-xl text-zinc-400  px-2'>Today, 29 October, 2023</p> */}


        
    <div className='grid grid-cols-2 h-fit p-2 gap-2'>


<div className='col-span-1 grid grid-rows-3 gap-2'>




<div className='row-span-1 grid grid-cols-3 gap-2  h-64'>

<div className='col-span-2  flex justify-between   '>

<div>
<h1 className='text-6xl tracking-tighter text-white  py-4'>Nigeria</h1>
{/* Day Format */}
<p className='text-xl tracking-tighter max-w-xl text-zinc-400  '>Today {c.format('DD MMMM, YYYY')}   </p>
{/* <img className='absolute object-cover h-full w-full rounded-xl' src={augustflowdashboard} alt=""  />
<h1 className='relative text-5xl tracking-tighter text-white px-2  place-self-center'>Dashboard.</h1> */}

<h1 className='text-6xl tracking-tighter text-green-500  py-4'>{time.toLocaleTimeString()}</h1>
</div>

<Link to="/Profile">
  <button>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
</svg>
</button>
</Link>


</div>





<div className='col-span-1 bg-zinc-700 rounded-lg   grid  relative  '>

  
<video muted autoPlay loop  className='absolute rounded-lg h-full w-full object-cover' src={"https://player.vimeo.com/external/662281550.sd.mp4?s=dda9250f2f8de70783f0c12b2cff4fd2bfffc52a&profile_id=164&oauth_token_id=57447761"} type="mp4" />
    {/* <h1 className='tracking-tighter text-xl text-center self-start'>Scheduled Inspections</h1> */}

    <h1 className='tracking-tighter text-7xl  text-black relative p-2 place-self-center mt-16 '>AI</h1>

<div className='place-self-center  relative p-2' >
<Link  to="/AI">
    <button className='bg-black px-8 py-1 rounded-full  place-self-end'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
</svg>
</button>
</Link>
</div>


</div>


</div>




<div className='row-span-2 bg-lime-300   '>


<Link  to="/Insights">
    <button className='bg-black px-8 py-1 rounded-full m-8  '>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
</svg>
</button>
</Link>



</div>




</div>











<div className='col-span-1 grid grid-rows-3 gap-2  '>

<div className='grid grid-cols-2 row-span-1 gap-2'>

<div className='bg-blue-600  rounded-lg p-2 '>
<h1 className='tracking-tighter text-3xl text-start text-white'>Scheduled Inspections</h1>
{/* <hr className='my-2'/> */}
{/* <p className='text-md tracking-tighter max-w-xl text-zinc-600 my-3'>Create & manage property listing for your agency and your website. Real-time sync and listing manangement. </p> */}

<div className='self-end' >
<Link  to="/ScheduledInspection">
    <button className='bg-black px-7 py-1  rounded-full  place-self-end'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
</svg>

</button>
</Link>
</div>

</div>

<div className='bg-orange-600  rounded-lg p-2 '>
<h1 className='tracking-tighter text-3xl text-start text-black'>Property Listing</h1>
{/* <hr className='my-2'/> */}
<p className='text-md tracking-tighter max-w-xl text-zinc-600 my-3'>Create & manage property listing for your agency and your website. Real-time sync and listing manangement. </p>

<div className='self-end' >
<Link  to="/Listing">
    <button className='bg-black px-7 py-1  rounded-full  place-self-end'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
</svg>

</button>
</Link>
</div>

</div>

</div>




<div className=' row-span-1 grid grid-cols-7 gap-2 h-64 row-end-3 '>

<div className='col-span-2 bg-green-600 rounded-lg p-2'>

<div className='grid gap-20'>
<h1 className='tracking-tighter text-3xl text-start text-black'>Media & News</h1>

<Link  to="/Media">
    <button className='bg-black px-8 py-1 rounded-full  '>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
</svg>
</button>
</Link>
</div>
</div>


<div className='col-span-3 bg-white rounded-lg p-2'>
<Link  to="/StaffMembers">
    <button className='bg-black px-8 py-1 rounded-full  place-self-end'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
</svg>
</button>
</Link>
<h1 className='tracking-tighter text-3xl text-start text-black'>Staff Members</h1>
</div>




<div className='col-span-2 bg-yellow-400 rounded-lg p-2'>
<Link  to="/Blog">
    <button className='bg-black px-8 py-1 rounded-full  place-self-end'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
</svg>
</button>
</Link>
<h1 className='tracking-tighter text-3xl text-start text-black'>Blog</h1>
</div>

</div>




<div className='bg-red-200 row-span-1 relative '>
<video muted autoPlay loop  className='absolute h-full w-full object-cover' src={"https://player.vimeo.com/external/360488046.sd.mp4?s=2c600a51c3ab4af64d9d77631d641e183d796263&profile_id=164&oauth2_token_id=57447761"} type="mp4" />

</div>

</div>




    </div>




    <hr className='bg-white my-4'/>


<div className='grid rounded-lg  mx-2 p-2  bg-gradient-to-r from-yellow-300 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-72'>


<div className=' flex justify-center mt-10   '>
<p className='text-black tracking-tighter px-2 col-span-1  text-6xl font-semibold leading-8'>AugustFlow</p>

<p className='text-black tracking-tighter  col-span-1  text-xl font-semibold '>Ⓡ</p>
</div>


<p className='tracking-tighter text-center mx-10 text-zinc-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>



{/* 
<div className='col-span-2'>

  <div className='flex'>
<p className='text-black tracking-tighter px-2 col-span-1 text-start text-5xl font-semibold leading-8 mt-3'>Dashboard</p>

<p className='text-black tracking-tighter  col-span-1 text-start text-xl font-semibold '>Ⓡ</p>
</div>


<p className='text-black tracking-tighter px-2 col-span-1 text-start text-2xl font-semibold mt-2'>by August Deep Tech.</p>

    <p className='text-black tracking-tighter px-2 col-span-1 mt-8 '>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
.</p>

</div> */}




  

{/* <div className='flex gap-3 col-span-3 flex-row-reverse '>
 


    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
</svg>



<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
</svg>

</div> */}


 </div> 

        </div>
  )
}



