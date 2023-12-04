import React, {useEffect, useState} from 'react'
import axios from 'axios';











const options = {
  method: 'POST',
  url: 'https://realtor.p.rapidapi.com/properties/v3/list',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '46ef5a1703mshb3f96774499d89bp11de13jsnd9087a0e8b4a',
    'X-RapidAPI-Host': 'realtor.p.rapidapi.com'
  },
  data: {
    limit: 200,
    offset: 0,
    postal_code: '90004',
    status: [
      'for_sale',
      'ready_to_build'
    ],
    sort: {
      direction: 'desc',
      field: 'list_date'
    }
  }
};










export default function Insights() {

   const [data, setData] = useState([]);


 


  

  useEffect(() => {


    const fetchRealtorData = async () => {



      const response = await axios.request(options);
      console.log(response.data)
      const data = response.data;
      setData(data);
    
    };
  
    fetchRealtorData();
  }, []);



  return (


    <div>


{/* {realtorData.length > 0 ? (
  <ul>
    {realtorData.map((realtor) => (
      <li key={realtor.id}>
        {realtor.city} 
      </li>
    ))}
  </ul>
) : (
  <p>Loading...</p>
)} */}




 {data && (
        <div>
          <h2>Property Details</h2>
          <p>Address: {data.address}</p>
          <p>City: {data.description}</p>
          <p>State: {data.state}</p>
          <p>Zip Code: {data.zipCode}</p>
        </div>
      )} 




  {/* {data.map((item) => (
        <div key={item.id}>
          <h2>{item.dogs}</h2>
          <p>{item.description}</p> 
        </div>
      ))}   */}









    </div>
  )
}
