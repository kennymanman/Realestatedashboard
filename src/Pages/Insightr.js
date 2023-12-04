import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function Insights() {


  const [response, setResponse] = useState(null);

    const options = {
        method: 'GET',
        url: 'https://realtor.p.rapidapi.com/locations/v2/auto-complete',
        params: {
          input: 'new york',
          limit: '10'
        },
        headers: {
          'X-RapidAPI-Key': '46ef5a1703mshb3f96774499d89bp11de13jsnd9087a0e8b4a',
          'X-RapidAPI-Host': 'realtor.p.rapidapi.com'
        }
      };


  
const fetchQuotes = async () => {
	try {
		const res = await axios.get(
			`https://realtor.p.rapidapi.com/locations/v2/auto-complete`,
			{
				headers: {
          'X-RapidAPI-Key': '46ef5a1703mshb3f96774499d89bp11de13jsnd9087a0e8b4a',
          'X-RapidAPI-Host': 'realtor.p.rapidapi.com'
				},

				params: {input: 'new york',  limit: '10'}
			}
		);
	} catch (err) {
		console.log(err);
	}
};



    



      useEffect(()=> {

        fetchQuotes();
        
      })



  return (
    
      

  
    <div>

{
				// If the response is not null, display the quote.
				response && <p>{response.text}</p>
			}


    </div>
  )
}

