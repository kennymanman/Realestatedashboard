import React from 'react'
import { Link } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav'
import staffdesign from "./Images/staffdesign.jpg"

export default function Trashboard() {
  return (
    <>

<Nav/>

{/* Main Container */}
      <div className='grid grid-cols-2 p-2 h-fit gap-1 '>




        <div className='col-span-1 grid grid-rows-3 gap-2 h-fit '>
         
            <div className='row-span-1 grid grid-cols-6 gap-2 h-60'>
                {/* Box with date, time */}
                <div className='bg-black col-span-2 rounded-lg p-2 '>

                    <div className='flex justify-between'><span className='text-white fon-hel text-5xl tracking-tighter'>12°</span> <span className='text-white fon-hel text-3xl tracking-tighter'>Lagos</span></div>
                    
                    <div className='grid justify-items-center'>
                    <div className='rounded-full bg-white w-20 h-20 blur-md '></div>
                   </div>

                    <div className='justify-center mt-10'><div><p className='tracking-tight text-base font-hel text-gray-400'>Today</p><span className='text-white tracking-tighter font-hel text-lg'>12th October, 2024 </span></div></div>
                    

                </div>


                <div className='bg-black col-span-2 rounded-lg p-2'>


        <div className='flex '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" h-8 w-8 stroke-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.49 12 3.75-3.751m0 0-3.75-3.75m3.75 3.75H3.74V19.5" />
               </svg>


               <Link to="/AI">
                    <button className='bg-white rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
                    </Link>


        </div>

               <p className='text-white tracking-tighter font-hel text-2xl mt-3 '>Organization Name</p>
               <p className='text-gray-400 tracking-tighter font-hel text-base mt-2 '>92, Lanre Awolokun Gbagada phase 2, Lagos</p>

               <p className='text-lime-300 tracking-tighter font-hel text-2xl mt-6 '>Job role</p>


                </div>





                <div className='bg-purple-400 col-span-2 rounded-lg p-2 '>
                    <Link to="/AI">
                    <button className='bg-white rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
                    </Link>
                    <h2 className='font-hel tracking-tighter text-4xl leading-7 mt-28   '>Market<br/> Insights</h2>
                </div>

            </div>

            <div className='bg-slate-400 row-span-2 '>
                omo
            </div>



        </div>














<div className='col-span-1 grid grid-rows-3 gap-2 h-fit'>

<div className='row-span-1 grid grid-cols-6 gap-2 h-60'>

    <div className='bg-black col-span-2 rounded-lg p-2'>
    <Link to="/schedules">
    <button className='bg-white rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
    </Link>

    <h2 className='text-white tracking-tighter text-7xl mt-10 '>5</h2>
    <h2 className='font-hel tracking-tighter text-4xl leading-7  text-white'>Scheduled<br/> Inspections</h2>
    </div>



    <div className='bg-yellow-300 col-span-4 rounded-lg p-2'>
        <div className='flex justify-between'> <h2 className='font-hel tracking-tighter text-4xl leading-9  text-black   '>Property<br/> Listing</h2>
        <Link to="/schedules">
    <button className='bg-white rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
    </Link>
        
        
        </div>
    </div>
</div>


{/* Second row on the right */}
<div className='row-span-1 grid grid-cols-6 gap-2 h-60'>

    <div className='col-span-2 bg-green-600 rounded-lg p-2'>
    <Link to="/schedules">
    <button className='bg-white rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
    </Link>

    <h2 className='font-hel tracking-tighter text-4xl leading-8 mt-28 text-white   '>Property Value<br/>Calculator</h2>
    </div>
    
    <div className='col-span-2 grid grid-rows-2 gap-2 '>
        <div className='bg-black row-span-1 rounded-lg p-2 grid content-center'>
        <h2 className='font-hel tracking-tighter text-5xl   text-lime-300  text-center '>10:00 <span className='text-gray-400'>PM</span></h2> 
        </div>

        <div className='bg-blue-700 row-span-1 rounded-lg p-2'>
        <Link to="/schedules">
    <button className='bg-white rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
    </Link>
        <h2 className='font-hel tracking-tighter text-4xl leading-8 mt-5  text-white '>Admin Panel</h2>
        </div>
    </div>



    

    <div className='col-span-2 bg-gray-400 rounded-lg p-2 relative'>
        <img src={staffdesign} alt="" className='absolute top-0 left-0 w-full h-full object-cover rounded-lg'/>

    <Link to="/schedules">
    <button className='bg-white rounded-full p-2 ml-48 relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
    </Link>

    <h2 className='text-white tracking-tighter text-7xl mt-10 relative '>5</h2>

    <h2 className='font-hel tracking-tighter text-4xl leading-8  text-white relative   '>Staff<br/>Members</h2>
    </div>






</div>




{/* Third Row on the right */}
<div className='row-span-1 bg-slate-200 h-full p-2'>
jj
</div>


</div>






        </div>  
        


     <Footer/>   
        
        </>
  )
}
