import React from 'react'
import footerimage from '../Images/footerimage.jpg'

export default function Footer() {
  return (

    <div className='bg-black h-fit py-3'>

<h1 className='text-white font-hel tracking-tighter text-2xl text-center'>AugustFlow+ Real Estate.</h1>
    <div className='grid grid-cols-3 gap-4 p-2  '>



      <div className='col-span-1 '>
        {/* <h1 className='text-white font-hel tracking-tighter text-2xl'>AugustFlow+ Real Estate.</h1> */}
        <p className='text-gray-400 tracking-tight font-hel mt-5'>Created by</p>
        <p className='text-white tracking-tight font-hel'>August Deep Tech</p>

      </div>





      <div className='col-span-1 flex justify-between '>
        {/* <h1 className='text-white font-hel tracking-tighter text-2xl'>AugustFlow+ Real Estate.</h1> */}
        <div>
        <p className='text-gray-400 tracking-tight font-hel mt-5'>Instagram</p>
        <p className='text-white tracking-tight font-hel'>@AugustDeepTech</p>
        </div>


        <div>
        <p className='text-gray-400 tracking-tight font-hel mt-5'>Twitter</p>
        <p className='text-white tracking-tight font-hel'>@AugustDeepTech</p>
        </div>



        <div>
        <p className='text-gray-400 tracking-tight font-hel mt-5'>Web</p>
        <p className='text-white tracking-tight font-hel'>Augustdeeptech.com</p>
        </div>
      </div>








      <div className='col-span-1'>
      <p className='text-gray-400 tracking-tight font-hel mt-5 text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

      </div>




       
        
    </div>

    </div>
  )
}
