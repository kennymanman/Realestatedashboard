import React, {useEffect, useState} from 'react'








const RefreshEvery5Seconds = (props) => {
    const [count, setCount] = useState(0);
  
    useEffect( () => {
        const intervalHandle = setInterval( () => {
            setCount( currVal => currVal + 1 );
          }, 500 );
  
        return () => clearInterval(intervalHandle)
      }, [] );
  
    return <div></div>;
  }   



  export default RefreshEvery5Seconds








