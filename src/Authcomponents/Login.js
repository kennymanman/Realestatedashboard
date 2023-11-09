import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth} from '../context/AuthContext';
// import { signInWithGoogle } from '../config/firebaseConfig';






const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/Dashboard')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };





  return (
    <div>Login




<input onChange={(e) => setEmail(e.target.value)} className='border-b-2 border-black py-4 w-full relative bg-transparent rounded-t-lg placeholder:text-black p-2 text-black text-2xl' type='email' placeholder='EMAIL'  />


{/*<label className='py-2 font-medium'>Password</label>*/}
<input onChange={(e) => setPassword(e.target.value)} className='border-b-2 border-black py-4 w-full relative bg-transparent rounded-t-lg placeholder:text-black p-2 text-black text-2xl' type='password' placeholder='PASSWORD'   />


<button onClick={handleSubmit} className='w-full bg-black text-white rounded-lg py-3 font-medium tracking-tighter font-custom text-xl bg-gradient-to-r from-black to-black hover:from-pink-500 hover:to-yellow-500 '> Sign In</button>


<Link to="/ForgotPassword">ForgotPassword?</Link>

<Link to="/Signup">Create Account</Link>

    </div>
  )
}


export default Login;
