import React, {useState} from 'react'
import {sendPasswordResetEmail} from "firebase/auth";
import {database} from "../config/firebaseConfig"
// import { UserAuth } from '../context/AuthContext';

import { Link, useNavigate } from 'react-router-dom'





export default function ForgotPassword() {

    const history = useNavigate();

    // const { user } = UserAuth();
    const navigate = useNavigate()

    // const [email, setEmail] = useState("")
      const [error, setError] = useState('');
  
  
//       const Reset = async () => {
  
//           sendPasswordResetEmail(auth, email)
//     .then(() => {
//       // alertPassword reset email sent!
//       // ..
//     })
//     .catch((error) => {
  
//       console.log("Reset Activated.")
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
  
//   }


  const handleSubmit = async(e)=>{
    e.preventDefault()
    const emalVal = e.target.email.value;
    sendPasswordResetEmail(database,emalVal).then(data=>{
        alert("Check your gmail")
        history("/")
    }).catch(err=>{
        alert("This Email is not linked to any account.")
    })
}






  return (
    <div>
        
        
        <h2>Reset Password</h2>



<Link >
  <button onClick={() => navigate(-1)}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-black m-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
</button>
</Link>




<div className='bg-blue-600 m-5'>

{/* <form onSubmit={(e)=>handleSubmit(e)}>
<input name="email"  className='mt-5 border-b-2 border-white py-4 w-full relative bg-transparent rounded-t-lg placeholder: font-custom text-white p-2 tracking-tighter text-4xl' type='text' value={email} placeholder="Type Email"   />

<button className='w-full mt-7 text-black rounded-lg py-3 font-medium tracking-tighter font-custom text-xl bg-white '> Reset Password</button>

</form> */}




<form onSubmit={(e)=>handleSubmit(e)}>
                <input name="email" className='m-5 border-b-2 border-white py-4 w-full relative bg-transparent rounded-t-lg placeholder:font-custom text-white p-6 tracking-tighter text-4xl' type='text' placeholder="Type Email" /><br/><br/>
                <button className='w-full mt-7 text-black rounded-lg py-3 font-medium tracking-tighter font-custom text-xl bg-slate-300 '>Reset</button>
            </form>



  </div> 





    </div>
  )
}
