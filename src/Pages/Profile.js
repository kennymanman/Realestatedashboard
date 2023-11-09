import React, {useState} from 'react'
import Nav from '../components/Nav'
import { UserAuth } from '../context/AuthContext';
import {updateProfile } from "firebase/auth";
import {Link} from 'react-router-dom'
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../config/firebaseConfig"






export default function Profile() {


    const { user } = UserAuth();
    const [displayName, setDisplayName] = useState("");
  
    const [photoURL, setPhotoUrl] = useState("")

    const updateuserdata = async () => {

        updateProfile(user, {
          displayName, photoURL:"https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/05/Shell_logo.svg-e1659037248878.png?auto=format&q=60&fit=max&w=930"
        }).then(() => {
      
          console.log(user.displayName)
          // Profile updated!
          // ...
        }).catch((error) => {
          console.log("Error.")
          // An error occurred
          // ...
        });
      
      }



      const [email, setEmail] = useState("")
      const [error, setError] = useState('');
  
  
      const Reset = async () => {
  
          sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
  
      console.log("Reset Activated.")
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  
  }




  return (
    <div className='bg-black h-screen'>

<Nav/>

<div className='px-2'>
<h1 className='text-6xl text-white tracking-tighter mt-5'>Profile</h1>

<h1 className='text-4xl text-white tracking-tighter mt-5'>Hey {user.displayName} .</h1> 

<div className='grid grid-cols-2'>

<div className='col-span-1'>
<h1 className='text-4xl text-white tracking-tighter mt-40'>Edit Username:</h1> 

<input onChange={(e) => setDisplayName(e.target.value)} className='border-b-2 border-white py-4 w-full relative bg-transparent rounded-t-lg placeholder: font-custom text-white p-2 tracking-tighter text-5xl' type='text' value={displayName} placeholder={user.displayName}   />

<button className='w-full mt-7 bg-black text-black rounded-lg py-3 font-medium tracking-tighter font-custom text-xl bg-gradient-to-r from-white to-white hover:from-pink-500 hover:to-yellow-500 ' disabled={!displayName} onClick={updateuserdata}> Update</button>
</div>

<div className='col-span-1'>

  <div className='bg-green-600'>

  <input onChange={(e) => setEmail(e.target.value)} className='mt-5 border-b-2 border-white py-4 w-full relative bg-transparent rounded-t-lg placeholder: font-custom text-white p-2 tracking-tighter text-4xl' type='text' value={email} placeholder={user.email}   />

<button onClick={Reset} className='w-full mt-7 text-black rounded-lg py-3 font-medium tracking-tighter font-custom text-xl bg-white '> Reset Password</button>
    </div>  
</div>

</div>



</div>


    </div>
  )
}
