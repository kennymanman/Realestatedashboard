import React from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import profilepic from "../Images/profilepic.jpg";

export default function StaffMembers() {
  return (
    <div className="bg-black h-screen">
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

      <div className="grid grid-cols-6 p-2 gap-5">
        <div className="col-span-1">
          <div className="h-64">
            <img
              className="object-cover h-full w-full rounded-lg"
              src={profilepic}
              alt=""
            />
          </div>

          <div className="text-center">
            <h1 className="tracking-tighter text-2xl text-white mt-1">
              Micheal Scott
            </h1>
            <h1 className="tracking-tighter text-2xl text-slate-500 ">
              Creative Director
            </h1>
            <button className="bg-green-500 tracking-tighter px-5 rounded-full mt-1 hover:bg-white">
              Edit
            </button>
          </div>
        </div>

        <div className="col-span-1">
          <div className="h-64">
            <img
              className="object-cover h-full w-full rounded-lg"
              src={profilepic}
              alt=""
            />
          </div>

          <div className="text-center">
            <h1 className="tracking-tighter text-2xl text-white mt-1">
              Mark Phillip
            </h1>
            <h1 className="tracking-tighter text-2xl text-slate-500 ">
              Head of Communications
            </h1>
            <button className="bg-green-500 tracking-tighter px-5 rounded-full mt-1 hover:bg-white">
              Edit
            </button>
          </div>
        </div>

        <div className="col-span-1 h-64 bg-slate-500 rounded-lg p-2">
          <Link to="/CreateStaff">
            <button className="bg-green-500 tracking-tighter px-5 rounded-full mt-1 hover:bg-white">
              Create New
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
