import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import augustflowdashboard from './Images/augustflowdashboard.jpg';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  const [orgName, setOrgName] = useState('');

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);

    // Fetch organization name
    const fetchOrgName = async () => {
      const db = getFirestore();
      const orgDoc = await getDoc(doc(db, "organization", "info"));
      if (orgDoc.exists()) {
        setOrgName(orgDoc.data().name);
      }
    };

    fetchOrgName();
  }, []);

  const c = dayjs();

  return (
    <div className='bg-black h-fit'>
      <Nav />

      <div className='grid grid-cols-2 h-fit p-2 gap-2'>
        <div className='col-span-1 grid grid-rows-3 gap-2'>
          <div className='row-span-1 grid grid-cols-3 gap-2  h-64'>
            <div className='col-span-2  flex justify-between   '>
              <div>
                {orgName && (
                  <h1 className='text-xl tracking-tighter text-white py-2'>
                    {orgName}
                  </h1>
                )}
                <h1 className='text-6xl tracking-tighter text-white  py-4'>
                  Nigeria
                </h1>
                <p className='text-xl tracking-tighter max-w-xl text-zinc-400  '>
                  Today {c.format('DD MMMM, YYYY')}{' '}
                </p>
                <h1 className='text-6xl tracking-tighter text-green-500  py-4'>
                  {time.toLocaleTimeString()}
                </h1>
              </div>

              <Link to='/Profile'>
                <button>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6 stroke-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495'
                    />
                  </svg>
                </button>
              </Link>
            </div>

            <div className='col-span-1 bg-zinc-700 rounded-lg   grid  relative  '>
              <video
                muted
                autoPlay
                loop
                className='absolute rounded-lg h-full w-full object-cover'
                src={
                  'https://player.vimeo.com/external/662281550.sd.mp4?s=dda9250f2f8de70783f0c12b2cff4fd2bfffc52a&profile_id=164&oauth_token_id=57447761'
                }
                type='mp4'
              />
              <h1 className='tracking-tighter text-7xl  text-black relative p-2 place-self-center mt-16 '>
                AI
              </h1>

              <div className='place-self-center  relative p-2'>
                <Link to='/AI'>
                  <button className='bg-black px-8 py-1 rounded-full  place-self-end'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-6 stroke-white'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className='row-span-2 bg-lime-300   '>
            <Link to='/Insights'>
              <button className='bg-black px-8 py-1 rounded-full m-8  '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-6 stroke-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        <div className='col-span-1 grid grid-rows-3 gap-2  '>
          <div className='grid grid-cols-2 row-span-1 gap-2'>
            <div className='bg-blue-600  rounded-lg p-2 '>
              <h1 className='tracking-tighter text-3xl text-start text-white'>
                Scheduled Inspections
              </h1>
              <div className='self-end'>
                <Link to='/schedules'>
                  <button className='bg-black px-7 py-1  rounded-full  place-self-end'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-6 stroke-white'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            <div className='bg-orange-600  rounded-lg p-2 '>
              <h1 className='tracking-tighter text-3xl text-start text-black'>
                Property Listing
              </h1>
              <p className='text-md tracking-tighter max-w-xl text-zinc-600 my-3'>
                Create & manage property listing for your agency and your
                website. Real-time sync and listing manangement.{' '}
              </p>

              <div className='self-end'>
                <Link to='/Listing'>
                  <button className='bg-black px-7 py-1  rounded-full  place-self-end'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-6 stroke-white'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className=' row-span-1 grid grid-cols-7 gap-2 h-64 row-end-3 '>
            <div className='col-span-2 bg-green-600 rounded-lg p-2'>
              <div className='grid gap-20'>
                <h1 className='tracking-tighter text-3xl text-start text-black'>
                  Media & News
                </h1>

                <Link to='/propertyvaluecalculator'>
                  <button className='bg-black px-8 py-1 rounded-full  '>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-6 stroke-white'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            <div className='col-span-3 bg-white rounded-lg p-2'>
              <Link to='/StaffMembers'>
                <button className='bg-black px-8 py-1 rounded-full  place-self-end'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-6 stroke-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                    />
                  </svg>
                </button>
              </Link>
              <h1 className='tracking-tighter text-3xl text-start text-black'>
                Staff Members
              </h1>
            </div>

            <div className='col-span-2 bg-yellow-400 rounded-lg p-2'>
              <Link to='/Admin'>
                <button className='bg-black px-8 py-1 rounded-full  place-self-end'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-6 stroke-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                    />
                  </svg>
                </button>
              </Link>
              <h1 className='tracking-tighter text-3xl text-start text-black'>
                Blog
              </h1>
            </div>
          </div>

          <div className='bg-red-200 row-span-1 relative '>
            <video
              muted
              autoPlay
              loop
              className='absolute h-full w-full object-cover'
              src={
                'https://player.vimeo.com/external/360488046.sd.mp4?s=2c600a51c3ab4af64d9d77631d641e183d796263&profile_id=164&oauth2_token_id=57447761'
              }
              type='mp4'
            />
          </div>
        </div>
      </div>

      <hr className='bg-white my-4' />

      <div className='grid rounded-lg  mx-2 p-2  bg-gradient-to-r from-yellow-300 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-72'>
        <div className=' flex justify-center mt-10   '>
          <p className='text-black tracking-tighter px-2 col-span-1  text-6xl font-semibold leading-8'>
            AugustFlow
          </p>

          <p className='text-black tracking-tighter  col-span-1  text-xl font-semibold '>
            Ⓡ
          </p>
        </div>

        <p className='text-sm tracking-tighter text-center mx-10 text-zinc-600'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>
    </div>
  );
}