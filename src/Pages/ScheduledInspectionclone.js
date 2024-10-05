import React, { useEffect } from "react";
import Nav from "../components/Nav";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";
import { Link } from "react-router-dom";
import { PopupButton } from "react-calendly";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import Cal, { getCalApi } from "@calcom/embed-react";

// import Calendar from "@ericz1803/react-google-calendar";

export default function ScheduledInspectionclone({ inspectionDate, sale }) {
  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => console.log(e.data.payload),
  });

  //Cal.com code

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const Schedule = () => {
    <Cal
      calLink="wokeupbored/schedule-inspection"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />;
  };

  return (
    <div className="bg-black h-fit ">
      <Nav />
      <Link to="/Dashboard">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 stroke-white m-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </button>
      </Link>
      <button
        className="px-7 py-1 bg-blue-500 rounded-full"
        data-cal-link="wokeupbored/schedule-inspection"
        data-cal-config='{"layout":"month_view"}'
      >
        Inspect
      </button>
      ;
      <div className="m-4">
        <iframe
          className="w-full h-screen "
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Africa%2FLagos&title=Scheduled%20Inspections&src=NjI1ZWE0YTFjZWM0NzQ4MzBhMTFiOTllZTljNTI1ZDEyODkxNGEyYTk2ODg3ZjdiODExYmQyMmU2MDc1OWQ5NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4ubmcjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23F4511E&color=%230B8043"
        ></iframe>
      </div>
      {/* 
      <PopupButton
      className='bg-green-500 py-10 px-20'
        url="https://calendly.com/primarkhills/property-inspection" 
       
        rootElement={document.getElementById("root")}
        text="Click here to schedule!"
      />
       */}







<div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Scheduled Inspection Details</h2>
      <Table>
        <TableCaption>Inspection details for uu</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Property</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Inspection Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">nn</TableCell>
            <TableCell>nn</TableCell>
            <TableCell>{inspectionDate}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>




    </div>
  );
}
