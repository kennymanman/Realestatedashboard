import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import profilepic from "../Images/profilepic.jpg";
import { Input } from "../components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";

export default function StaffMembers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <>
    <Nav />
    <div className=" min-h-screen">
      

      <div className="flex justify-between items-center mb-8 px-4 py-2">


        <div>
      <button onClick={() => navigate(-1)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 ml-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>
</button>

<h2 className="text-6xl font-hel tracking-tighter">Staff Members</h2>

</div>
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search staff members..."
            className="pl-10 pr-4 py-2 w-full  text-black rounded-lg focus:outline-none focus:ring-2 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-6 p-2 gap-5">
        {filteredUsers.map((user) => (
          <div key={user.id} className="col-span-1">
            <div className="h-64">
              <img
                className="object-cover h-full w-full rounded-lg"
                src={user.profilePicture || profilepic}
                alt=""
              />
            </div>

            <div className="text-center">
              <h1 className="tracking-tighter text-2xl text-black mt-1">
                {user.username}
              </h1>
              <h2 className="tracking-tighter text-xl text-slate-600">
                {user.jobTitle}
              </h2>
              <p className="tracking-tighter text-lg text-slate-500">
                {user.role}
              </p>
              <p className="tracking-tighter text-base text-slate-400">
                {user.email}
              </p>
              <p className="tracking-tighter text-lg text-black">
                {user.phoneNumber}
              </p>
              {/* <button className="bg-green-500 tracking-tighter px-5 rounded-full mt-1 hover:bg-white">
                Edit
              </button> */}
            </div>
          </div>
        ))}

        {/* <div className="col-span-1 h-64 bg-slate-500 rounded-lg p-2">
          <Link to="/CreateStaff">
            <button className="bg-green-500 tracking-tighter px-5 rounded-full mt-1 hover:bg-white">
              Create New
            </button>
          </Link>
        </div> */}
      </div>

    </div>

<Footer/>

</>
  );
}
