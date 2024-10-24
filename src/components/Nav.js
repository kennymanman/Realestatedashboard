import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Augustflow4 from "../logo/Augustflow4.png";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function Nav() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [orgLogo, setOrgLogo] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchOrgLogo = async () => {
      const orgDoc = await getDoc(doc(db, "organization", "info"));
      if (orgDoc.exists() && orgDoc.data().logoUrl) {
        setOrgLogo(orgDoc.data().logoUrl);
      }
    };

    fetchOrgLogo();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between px-2 py-3">
        <div className="flex justify-between">
          <Link to="/Dashboard">
            <img
              className="w-12 h-12 rounded-full "
              src={orgLogo || Augustflow4}
              alt="Organization Logo"
            />
          </Link>

          {/* <h1 className="tracking-tighter text-3xl text-white ml-2">
            +Real Estate
          </h1> */}
        </div>

        <div className="flex gap-7">
          <div className="flex gap-2">
            <h1 className="tracking-tighter text-lg text-gray-500 mt-2">
              Logged as
            </h1>
            {user ? (
            <h1 className="tracking-tighter text-2xl  font-hel mt-1 text-black">
              {user.displayName}
            </h1>
              ) : (
                <Link to="/login">Login</Link>
              )}
          </div>

          <Link to="/Help">
            <button>
              <p className="text-white text-sm bg-black px-6 py-2 ">
                Help
              </p>
            </button>
          </Link>

          <button onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 fill-red-600 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <hr className="bg-white" />
    </div>
  );
}
