import React from 'react';
import Nav from '../components/Nav';
import { Link, useNavigate } from 'react-router-dom';

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className='bg-black h-screen'>
      <Nav />

      <Link>
        <button onClick={() => navigate(-1)}>
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

      <div className='grid grid-cols-2 px-2 mt-9'>
        <div className='col-span-1'>
          <h1 className='text-6xl text-white tracking-tighter'>AugustFlow</h1>
        </div>

        <div className='col-span-1'>
          <h1 className='text-5xl text-white tracking-tighter '>Help</h1>
        </div>
      </div>

      <hr className='my-4' />

      <div className='grid grid-cols-2 gap-8 px-2 '>
        <div className='col-span-1'>
          <p className='text-white tracking-tighter '>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>

          <p className='text-white tracking-tighter '>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>

          <p className='text-white tracking-tighter '>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. Lorem Ipsum is simply dummy text of
            the printing and typesetting industry.
          </p>
        </div>

        <div className='col-span-1'>
          <div className='grid grid-cols-2'>
            <div className='col-span-1'>
              {' '}
              <p className='text-white tracking-tighter text-lg'>
                Support
              </p>{' '}
            </div>

            <div className='col-span-1'>
              {' '}
              <p className='text-white tracking-tighter text-lg'>
                Support@augustdeeptech.com
              </p>
              <hr className='my-6' />
              <p className='text-white tracking-tighter text-lg'>
                hello@augustdeeptech.com
              </p>
            </div>
          </div>

          <hr className='my-6' />

          <div className='grid grid-cols-2'>
            <div className='col-span-1'>
              {' '}
              <p className='text-white tracking-tighter text-lg'>
                Feedback
              </p>{' '}
            </div>

            <div className='col-span-1'>
              {' '}
              <p className='text-white tracking-tighter text-lg'>
                hello@augustdeeptech.com
              </p>
              <hr className='my-6' />
              <p className='text-white tracking-tighter'>
                Kindly follow our social media accounts and support August Deep
                Tech.
              </p>
              <p className='text-white tracking-tighter text-2xl my-3'>
                Instagram
              </p>
              <p className='text-white tracking-tighter text-2xl my-3'>
                Twitter
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
