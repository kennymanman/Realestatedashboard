import React from "react";
import Nav from "../components/Nav";
import mediaone from "../Images/mediaone.jpg";
import { Link } from "react-router-dom";

export default function Media() {
  return (
    <div className="bg-black">
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

      <div className="p-2">
        <h1 className="text-4xl tracking-tighter text-white mt-9">Media.</h1>

        <p className=" tracking-tighter text-white text-xl my-4">Guide:</p>

        <p className=" tracking-tighter text-white">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>

        <div className="grid grid-cols-3 gap-28 mt-14">
          <div className="col-span-1 ">
            <div className="h-5/6  ">
              <img
                className="h-full w-full object-cover"
                src={mediaone}
                alt=""
              />
            </div>

            <h1 className="text-white tracking-tighter text-xl mt-4">
              Award for the best Real Estate firm 2023
            </h1>
            <h1 className="text-white tracking-tighter text-md ">
              {" "}
              Published on 2nd May 2023
            </h1>

            <Link to="/MediaDetails">
              <button className="text-white tracking-tighter border-white border-2 rounded-full px-5 hover:bg-white hover:text-black mt-2">
                See More
              </button>
            </Link>
          </div>

          <div className="col-span-1 ">
            <div className="h-5/6  ">
              <img
                className="h-full w-full object-cover"
                src={mediaone}
                alt=""
              />
            </div>

            <h1 className="text-white tracking-tighter text-xl mt-4">
              Award for the best Real Estate firm 2023
            </h1>
            <h1 className="text-white tracking-tighter text-md ">
              Published on 2nd May 2023
            </h1>

            <button className="text-white tracking-tighter border-white border-2 rounded-full px-5 hover:bg-white hover:text-black mt-2">
              See More
            </button>
          </div>

          <div className="col-span-1 ">
            <div className="h-5/6  ">
              <img
                className="h-full w-full object-cover"
                src={mediaone}
                alt=""
              />
            </div>

            <h1 className="text-white tracking-tighter text-xl mt-4">
              Award for the best Real Estate firm 2023
            </h1>
            <h1 className="text-white tracking-tighter text-md ">
              Published on 2nd May 2023
            </h1>

            <button className="text-white tracking-tighter border-white border-2 rounded-full px-5 hover:bg-white hover:text-black mt-2">
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
