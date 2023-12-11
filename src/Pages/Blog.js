import React from 'react';
import Nav from '../components/Nav';
import mediaone from '../Images/mediaone.jpg';
import { Link } from 'react-router-dom';

export default function Blog() {
  return (
    <div className='bg-black h-fit'>
      <Nav />

      <Link to='/Dashboard'>
        <button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8 stroke-white m-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
            />
          </svg>
        </button>
      </Link>

      <div className='p-2'>
        <h1 className='text-6xl tracking-tighter text-white mt-9'>Blog</h1>

        <p className=' tracking-tighter text-white text-xl mt-7'>Guide:</p>

        <p className=' tracking-tighter text-white'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>

        {/* <h1 className='text-5xl tracking-tighter text-white mt-9'>Articles:</h1> */}

        <div className='grid grid-cols-4 gap-9 mt-14 '>
          <div className='col-span-1 h-fit '>
            <div className='h-4/5'>
              <img
                className='object-cover h-full w-full'
                src={mediaone}
                alt=''
              />
            </div>

            <h1 className='tracking-tighter text-white mt-2'>
              Written on 2nd April 2023
            </h1>

            <hr />

            <h1 className='tracking-tighter text-white text-3xl mt-4'>
              10 things you must look out for in house hunting
            </h1>

            <p className='tracking-tighter text-white mt-7 text-sm'>
              Quick Summary
            </p>

            <p className='tracking-tighter text-white mt-2 text-md'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </p>

            <hr className='my-3' />

            <div className='flex justify-between'>
              <Link to='/BlogDetails'>
                <button className='text-white tracking-tighter border-white border-2 rounded-full px-5 hover:bg-white hover:text-black mt-2'>
                  See More
                </button>
              </Link>
              <button className='text-white tracking-tighter border-white border-2 rounded-full px-5 hover:bg-white hover:text-black mt-2'>
                Edit
              </button>
            </div>
          </div>

          <div className='col-span-1 h-fit '>
            <div className='h-4/5'>
              <img
                className='object-cover h-full w-full'
                src={mediaone}
                alt=''
              />
            </div>

            <h1 className='tracking-tighter text-white mt-2'>
              Written on 2nd April 2023
            </h1>

            <hr />

            <h1 className='tracking-tighter text-white text-3xl mt-4'>
              10 things you must look out for in house hunting..
            </h1>

            <p className='tracking-tighter text-white mt-7 text-sm'>
              Quick Summary
            </p>

            <p className='tracking-tighter text-white mt-2 text-md'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </p>

            <hr className='my-3' />

            <div className='flex justify-between'>
              <button className='text-white tracking-tighter border-white border-2 rounded-full px-5 hover:bg-white hover:text-black mt-2'>
                See More
              </button>

              <button className='text-white tracking-tighter border-white border-2 rounded-full px-5 hover:bg-white hover:text-black mt-2'>
                Edit
              </button>
            </div>
          </div>

          <div className='col-span-1 h-fit '>
            <div className='h-4/5'>
              <img
                className='object-cover h-full w-full'
                src={mediaone}
                alt=''
              />
            </div>

            <h1 className='tracking-tighter text-white mt-2'>
              Written on 2nd April 2023
            </h1>

            <hr />

            <h1 className='tracking-tighter text-white text-3xl mt-4'>
              10 things you must look out for in house hunting
            </h1>

            <p className='tracking-tighter text-white mt-7 text-sm'>
              Quick Summary
            </p>

            <p className='tracking-tighter text-white mt-2 text-md'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </p>

            <hr className='my-3' />

            <div className='flex justify-between'>
              <button className='text-white tracking-tighter border-white border-2 rounded-full px-5 hover:bg-white hover:text-black mt-2'>
                See More
              </button>

              <button className='text-white tracking-tighter border-white border-2 rounded-full px-5 hover:bg-white hover:text-black mt-2'>
                Edit
              </button>
            </div>
          </div>

          <div className='col-span-1 h-2/5 bg-white grid'>
            <button className='text-black tracking-tighter border-black border-2 rounded-full px-5 hover:bg-lime-400 hover:text-black mt-2 place-self-center '>
              Create new
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
