import React from 'react'
import Nav from "../components/Nav"
import { useCalendlyEventListener, InlineWidget } from "react-calendly";
import { Link } from 'react-router-dom';
import { PopupButton } from "react-calendly";



export default function ScheduledInspection() {

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => console.log(e.data.payload),
  });



  return (

    <div className='bg-black h-fit '>
      
      <Nav/>



      <Link to="/Dashboard">
  <button>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-white m-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
</button>
</Link>



      
   



      <PopupButton
      className='bg-green-500 py-10 px-20'
        url="https://calendly.com/primarkhills/property-inspection" 
        /*
         * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
         * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
         */
        rootElement={document.getElementById("root")}
        text="Click here to schedule!"
      />
      
      </div>
  )
}
