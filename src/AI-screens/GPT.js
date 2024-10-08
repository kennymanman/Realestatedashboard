import React, {useRef, useState, useEffect} from 'react'
import Nav from '../components/Nav'
import aiusericon from "../Images/aiusericon.jpg"
import aireplyicon from "../Images/aireplyicon.jpg"
import { sendMsgToOpenAI } from '../config/openai'
import { Link } from 'react-router-dom'


export default function GPT() {

const msgEnd = useRef(null)

// Remove this line
// const apiKey = process.env.OPENAI_API_KEY;

const [input, setInput] = useState("")
const [messages, setMessages] = useState([

{
  text:"Hey, I am AugustGPT, your artificial intelligence assistant",
  isBot: true,
}
])




useEffect(() => {
  msgEnd.current.scrollIntoView()
}, [messages])


const handleSend = async () => {
  try {
    const res = await sendMsgToOpenAI(input);
    console.log(res);

    setMessages([
      ...messages,
      {text: input, isBot: false},
      {text: res, isBot: true}
    ]);
  } catch (error) {
    console.error('Error sending message to OpenAI:', error);
    setMessages([
      ...messages,
      {text: input, isBot: false},
      {text: "Sorry, I encountered an error. Please try again later.", isBot: true}
    ]);
  }
}




const handleEnter = async (e)=> {
  if(e.key =="Enter") await handleSend()
}
 


const handleQuery = async (e) => {

  const text = e.target.value;
  setInput('')
  setMessages([
  ...messages,
  { text, isBot: false}

])

const res = await sendMsgToOpenAI(text)
setMessages([
  ...messages,
  { text, isBot: false},
  {text: res, isBot: true}
])

}




return (




<div className='bg-black h-fit'>
<Nav/>



<button>
<Link to="/AI">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 m-2 stroke-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
</Link>
</button>




<div className='min-h-screen flex py-2 ' >

<div className='basis-3/12 border-2 border-r-white rounded-xl p-2 '>



<div className='text-center mt-2'>
<button onClick={()=> {window.location.reload()}} className='bg-orange-600 px-7 tracking-tighter rounded-full text-lg '>New chat</button>
<h2 className='text-white tracking-tighter mt-9 mb-2'>Quick Links</h2>
</div>

<hr/>

<div className='bg-white rounded-full p-2 my-2 text-center'>
<button onClick={handleQuery} value={"Generate 20 real estate instagram captions"} className='text-slate-600 text-base  stracking-tighter '>Generate 20 real estate instagram captions</button>
</div>




</div>






<div className='basis-3/4 m-2'>


<div className='bg-white rounded-xl h-screen grid '>

{/* Chats box */}
<div className='mx-2 overflow-hidden overflow-y-scroll scroll-smooth  '>





{messages.map ((message, i) => 

<div key={i} className='flex gap-3 mt-3 mb-9  py-2 rounded-xl '>
<img  className="rounded-full h-9 w-9 object-cover "src={message.isBot?aireplyicon: aiusericon} alt="" />

<div>
<p className='text-lg tracking-tighter mt-1'>{message.text}</p>

</div>

</div>

)}

<div ref={msgEnd} />





</div>







<div className='flex flex-row gap-2 p-2 bg-stone-200 self-end w-full '>
  <input type="text" placeholder='Hey, ask me anything' value={input} onKeyDown={handleEnter} onChange={(e) =>{setInput(e.target.value)}}  className="w-full rounded-full p-2 "></input>
  <button onClick={handleSend} className='bg-orange-600 px-3 rounded-2xl'>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
</button>
</div>

</div>

{/* <div className='flex flex-row gap-2'>
  <input type="text" placeholder='Ask me anything' className="w-full rounded-full p-2 bg-slate-100"></input>
  <button className='bg-orange-600 px-3 rounded-2xl'>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg>
</button>
</div> */}
    
</div>





</div>




    </div>
  )
}
