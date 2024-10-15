import React from 'react'
import footerimage from '../Images/footerimage.jpg'

export default function Footer() {
  return (
    <div className='grid grid-cols-5 gap-2 p-2 bg-slate-200 h-fit'>

        <div className='col-span-1 text-center w-full h-full  '>
            <img src={footerimage} alt="footerimage" className='object-cover rounded-lg w-fit ' />

            <h2 className='text-3xl tracking-tighter font-hel text-center mt-3 '>AugustFlow+ Real Estate.</h2>
            <p className='text-slate-700 font-hel tracking-tighter text-sm mt-4 text-center'>Learn more</p>
        </div>

        <div className='col-span-2 '>
  
        </div>

        <div className='col-span-2 bg-slate-400'>one</div>
        
    </div>
  )
}
