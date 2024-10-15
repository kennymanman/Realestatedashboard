import React from 'react';
import Nav from '../components/Nav';
import rent from '../Images/rent.jpg';
import Sale from '../Images/Sale.jpg';
import contactimagefive from '../Images/contactimagefive.jpg';
import { Link, useNavigate } from 'react-router-dom';
import listingsbg from "../Images/listingsbu.jpg"

export default function Listing() {
  const navigate = useNavigate();

  return (
    <div className='  bg-black min-h-screen max-h-fit'>
      <Nav />

      <img src={listingsbg} className='absolute h-fit  w-full ' alt="artificial intelligence"   />

      {/* <div className='flex justify-between'> */}

      <Link to='/Dashboard'>
        <button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8 stroke-black m-2 relative'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
            />
          </svg>
        </button>
      </Link>

      {/* <h1 className='tracking-tighter text-2xl'>AugustFlow</h1>



</div>

<hr className='border-black mt-2'/> */}


<h1 className='tracking-tighter text-center font-hel  text-6xl mt-3 text-black relative'>
        Listings.
      </h1>

      <hr className='bg-slate-600 relative mt-4'/>

      <div className='grid grid-cols-3 gap-5 mt-20 relative mx-2 '>
        <div className='col-span-1 h-96 '>
          <img
            className='h-full w-full object-cover rounded-xl hover:rounded-full'
            src={contactimagefive}
            alt=''
          />

          <div className='flex justify-between'>
        
            <h1 className='text-2xl font-hel tracking-tighter text-black'>
              Manage for sale
            </h1>

        
            <Link to='/Sale'>
              <button className='bg-black text-white px-7 rounded-full py-1 tracking-tighter mt-2 hover:bg-white hover:text-black'>See everything</button>
            </Link>
          </div>

       
          <p className='text-slate-500 text-sm tracking-tighter mt-1 font-hel'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took  specimen book.</p>

        </div>



        <div className='col-span-1 h-96  '>
          <img
            className='h-full w-full object-cover rounded-xl hover:rounded-full'
            src={contactimagefive}
            alt=''
          />
          <div className='flex justify-between'>
            <h1 className='text-2xl tracking-tighter font-hel text-black'>
              Manage for rent
            </h1>

            <Link to='/Rent'>
            <button className='bg-black text-white px-7 rounded-full py-1 tracking-tighter mt-2 hover:bg-white hover:text-black'>See everything</button>
            </Link>
          </div>
          <p className='text-slate-500 text-sm tracking-tighter mt-1 font-hel'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took  specimen book.</p>
        </div>

        <div className='col-span-1 h-96 '>
          <img
            className='h-full w-full object-cover rounded-xl hover:rounded-full'
            src={contactimagefive}
            alt=''
          />
          <div className='flex justify-between'>
            <h1 className='text-2xl tracking-tighter text-black font-hel'>
              Manage for shortlet
            </h1>

            <Link to='/Shortlet'>
            <button className='bg-black text-white px-7 rounded-full py-1 tracking-tighter mt-2 hover:bg-white hover:text-black'>See everything</button>
            </Link>
          </div>

          <p className='text-slate-500 text-sm tracking-tighter mt-1 font-hel'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took  specimen book.</p>
        </div>
      </div>

   

      

     
    </div>
  );
}
