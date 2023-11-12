import React from 'react'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Augustflow4 from "../logo/Augustflow4.png"



export default function Nav() {



  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  
    const handleLogout = async () => {
      try {
        await logout();
        navigate('/');
        console.log('You are logged out')
      } catch (e) {
        console.log(e.message);
      }
    };





  return (



<div>


<div className='flex  justify-between pt-4 px-2 py-2'>

{/* <h1 className='tracking-tighter text-3xl text-white  '>AugustFlow + Real Estate</h1> */}

<div className='flex justify-between'>

  <Link to="/Dashboard">
<img className='w-44 ' src={Augustflow4} alt="AugustFlow by August Deep Tech" />
</Link>


<h1 className='tracking-tighter text-3xl text-white  '>+Real Estate</h1>
</div>





<div className='flex gap-7'>
  <div className='flex gap-2'>
<h1 className='tracking-tighter text-lg text-zinc-400 mt-1'>Logged as</h1>
<h1 className='tracking-tighter text-2xl text-white'>{user.displayName}</h1>
</div>

<Link to="/Help">
<button>
<p className='text-white text-sm bg-slate-600 px-6 py-2 rounded-full'>Help</p>
</button>
</Link>



<button onClick={handleLogout}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-7 fill-red-600 stroke-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</button>


</div>




    </div>

<hr className='bg-white'/>

</div>
  )
}
