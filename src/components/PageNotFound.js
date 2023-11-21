import React from 'react'
import { Link } from 'react-router-dom';


export default function PageNotFound() {
  return (
    <div>


      <h1 className='text-center text-2xl tracking-tighter'>Almost there</h1>

      
      <h2 className='text-center text-2xl tracking-tighter'>no connection</h2>



      <Link to="/Dashboard">
      <p className='text-center'>Return Home</p>
      </Link>
    </div>
  )
}

