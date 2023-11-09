import React, {useState, useEffect} from 'react'
import Nav from '../components/Nav'
import { db } from '../config/firebaseConfig';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { useLocation } from "react-router-dom";
import { imageDB } from '../config/firebaseConfig';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";









export default function NewSalesListing(props) {


  
const location = useLocation()


  const [sale, setSale] = useState([]);
  const [saleName, setSaleName] = useState('');
  const [saleLocation, setSaleLocation] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [saleType, setSaleType] = useState('');
 

  const [firstImage, setFirstImage]= useState('');
  const [firstImageUrl, setFirstImageUrl]= useState('');


  const [imageOne, setImageOne]= useState('');
  const [imageOneUrl, setImageOneUrl]= useState('');




   // Create todo
  //  const createSaleListing = async (e) => {
  //   e.preventDefault(e);
  //   // if (input === '') {
  //   //   alert('Please enter a valid todo');
  //   //   return;
  //   // }
  //   await addDoc(collection(db, 'sale'), {
  //     id: uuidv4(),
  //     name: saleName,
  //     location: saleLocation,
  //     price: salePrice,
  //     type: saleType,
      
  //     createdAt: new Date(),
    
  //   });


    
  //   if(firstImage !==null){
  //     const firstImageRef =  ref(imageDB,`forsale/${uuidv4()}`)
  //     uploadBytes(firstImageRef,firstImage).then(value=>{
  //         console.log(value)
  //         getDownloadURL(value.ref).then(url=>{
  //          setFirstImageUrl(data=>[...data,url])
  //      })
        
  //     })
      
  //    }


  //    if(imageOne !==null){
  //     const imageOneRef =  ref(imageDB,`forsale/${uuidv4()}`)
  //     uploadBytes(imageOneRef,imageOne).then(value=>{
  //         console.log(value)
  //         getDownloadURL(value.ref).then(url=>{
  //          setImageOneUrl(data=>[...data,url])
  //      })
        
  //     })
      
  //    }










  // };





  const createSaleListing = async (e) => {
    e.preventDefault(e);
  
    let imageUrls = [];
  
    if (firstImage !== null) {
      const firstImageRef = ref(imageDB, `forsale/${uuidv4()}`);
      const value = await uploadBytes(firstImageRef, firstImage);
      console.log("uploadBytes returned:", value);
      const firstImageUrl = await getDownloadURL(value.ref);
      if (firstImageUrl) {
        imageUrls.push(firstImageUrl);
      }
    }
    if (imageOne !== null) {
      const imageOneRef = ref(imageDB, `forsale/${uuidv4()}`);
      const value = await uploadBytes(imageOneRef, imageOne)
      console.log("uploadBytes returned:", value);
      const imageOneUrl = await getDownloadURL(value.ref);
      if (imageOneUrl) {
        imageUrls.push(imageOneUrl);
      }
    }
  
    await addDoc(collection(db, 'sale'), {
      id: uuidv4(),
      name: saleName,
      location: saleLocation,
      price: salePrice,
      type: saleType,
      imageUrls: imageUrls,
  
      createdAt: new Date(),
    });


 
  
  };







  const handleSubmitImages = () =>{
    
    if(firstImage !==null){
       const firstImageRef =  ref(imageDB,`files/${uuidv4()}`)
       uploadBytes(firstImageRef,firstImage).then(value=>{
           console.log(value)
           getDownloadURL(value.ref).then(url=>{
            setFirstImageUrl(data=>[...data,url])
        })
         
       })

      }
   }



  

    // Read todo from firebase
    useEffect(() => {
      const q = query(collection(db, 'sale'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let saleArr = [];
        querySnapshot.forEach((doc) => {
          saleArr.push({ ...doc.data(), id: doc.id });
        });
        setSale(saleArr)
        
      });
      return () => unsubscribe();
    }, []);






    const Sale = ({ sale, toggleComplete, deleteSale }) => {
      return (
        <li >
          <div >
           
            <p className='text-white '  >
              {sale.name}
            </p>
          </div>
          <button className='bg-red-400 px-4' onClick={() => deleteSale(sale.id)}>Delete</button>
        </li>
      );
    };

 

  


  return (
    <div className='bg-black h-fit'>
      
      <Nav/>
      
      
      
      


<div className='grid grid-cols-2 p-2 '>





<div className='col-span-1'>

<Link to="/Sale">
  <button>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white m-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
</button>
</Link>

<h1 className='text-6xl text-white tracking-tighter mt-8'>New Sale listing details</h1>
<p className='text-white tracking-tighter w-3/4 mt-5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>





<ol>
          {sale.map((sale, index) => (
            <Sale
              key={index}
              sale={sale}
             
              // deleteSale={deleteSale}
            />
          ))}
        </ol>


</div>




<div className='col-span-1'>

  <form onSubmit={createSaleListing}>

    <div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Listing Name*</h1>
<input
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3 '
placeholder='Type property name'
value={saleName}
type="text"
onChange={(e) => setSaleName(e.target.value)}
/>
 </div> 





 


 <div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Listing Location*</h1>
<input
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
placeholder='Type location'
value={saleLocation}
onChange={(e) => setSaleLocation(e.target.value)}
/>
 </div> 





 <div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Listing Price*</h1>
<input
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
placeholder='Type sale price'
type='number'
value={salePrice}
onChange={(e) => setSalePrice(e.target.value)}
/>
 </div> 






 <div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Listing Type*</h1>
<input
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
placeholder='Studio Apartment/Duplex'
value={saleType}
onChange={(e) => setSaleType(e.target.value)}
/>
 </div> 





 <div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Listing Size*</h1>
<input
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
placeholder='Type listing size'
type='number'
/>
 </div> 





 <div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Parking*</h1>
<input
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
placeholder='Yes or No'

/>
 </div> 







 <div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Availability*</h1>
<input
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
placeholder='Yes or No'

/>
 </div> 








 <div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Floor*</h1>
<input
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
placeholder='1st/2nd/3rd'

/>
 </div> 






 <div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Bedrooms*</h1>
<input
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
placeholder='Number of bedrooms'
type='number'
/>
 </div> 







 <div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Bathrooms*</h1>
<input
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
placeholder='Number of bathrooms'
type='number'
/>
 </div> 





 <div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Serviced*</h1>
<input
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
placeholder='Yes or No'

/>
 </div> 





 <div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Realtor's Note</h1>
<textarea
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
placeholder='Quick note '
/>


 </div> 


<hr/>


<div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>First Impression Image</h1>
<input
type='file'
onChange={(e)=>setFirstImage(e.target.files[0])}
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
/>
</div>





<div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Image 1</h1>
<input
type='file'
onChange={(e)=>setImageOne(e.target.files[0])}
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
/>
</div>





<div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Image 2</h1>
<input
type='file'
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
/>
</div>






<div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Image 3</h1>
<input
type='file'
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
/>
</div>






<div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Image 4</h1>
<input
type='file'
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
/>
</div>






<div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Image 5</h1>
<input
type='file'
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
/>
</div>







<div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Image 6</h1>
<input
type='file'
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
/>
</div>



<hr/>


<div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Video</h1>
<p className='text-white tracking-tighter text-md my-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
<input
type='file'
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
/>
</div>





<div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>Floorplan</h1>
<p className='text-white tracking-tighter text-md my-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
<input
type='file'
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
/>
</div>




<div className='my-5'>
<h1 className='text-white text-xl tracking-tighter'>360 Images & Videos</h1>
<p className='text-white tracking-tighter text-md my-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
<input
type='file'
className='bg-transparent border-b-2 border-slate-400 text-white w-96 text-xl tracking-tighter mt-3'
/>
</div>




<button className='bg-white tracking-tighter rounded-full px-12 py-2 mt-16 hover:bg-green-500'>Submit</button>

  </form>



</div>

  </div>







      
{/* <form onSubmit={createTodo} > */}



{/* <textarea 
className=' w-full rounded-md h-96 bg-slate-100 border-black border-2 relative first-line:uppercase first-line:font-bold first-line:mb-11 place-holder:lowercase  '
placeholder ={todos.text}
value={input}
onChange={(e) => setInput(e.target.value)}
> */}




{/*
<textarea
  className='text-black text-2xl font-medium absolute top-0 '
  placeholder='Title'
  value={topic}
  onChange={(e) => setTopic(e.target.value)}
  />*/}



{/* </textarea> */}


<button className='bg-black w-full rounded-md text-white font-custom text-2xl font-medium tracking-tighter py-2'>
  Announce
</button>

{/* </form> */}
      

    
      
      
      
      </div>
  )
}
