import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav'
import staffdesign from "./Images/staffdesign.jpg"
import * as dayjs from 'dayjs';
import { getFirestore, doc, getDoc, getDocs, collection, query, updateDoc } from 'firebase/firestore';
import { db } from './config/firebaseConfig';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import { Checkbox } from "./components/ui/checkbox"
import { FaRegClock, FaRegCalendarAlt } from 'react-icons/fa';
import { MdLowPriority, MdOutlineCancel, MdOutlineDone, MdOutlinePlayArrow, MdOutlineList } from 'react-icons/md';
import { 
    CheckCircledIcon, 
    CircleIcon, 
    CrossCircledIcon, 
    StopwatchIcon,
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
  } from "@radix-ui/react-icons"
import AlertDialog from './components/AlertDialog'; // We'll create this component
import { UserAuth } from './context/AuthContext';





export default function Trashboard() {


    const [time, setTime] = useState(new Date());
    const [orgName, setOrgName] = useState('');
  
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [propertyType, setPropertyType] = useState('all');
    const [tasks, setTasks] = useState([]);
    const [inspectionCount, setInspectionCount] = useState(0);
    const [scheduledInspectionsCount, setScheduledInspectionsCount] = useState(0);
    const [saleCount, setSaleCount] = useState(0);
    const [rentCount, setRentCount] = useState(0);
    const [staffCount, setStaffCount] = useState(0);
    const [showAdminAlert, setShowAdminAlert] = useState(false);
    const { user } = UserAuth();
    const [isAdmin, setIsAdmin] = useState(false);
  
    const statuses = [
      {
          value: "backlog",
          label: "Backlog",
          icon: CircleIcon,
      },
      {
          value: "in_progress",
          label: "In Progress",
          icon: StopwatchIcon,
      },
      {
          value: "done",
          label: "Done",
          icon: CheckCircledIcon,
      },
      {
          value: "canceled",
          label: "Canceled",
          icon: CrossCircledIcon,
      },
  ]
  
  const priorities = [
      {
          label: "Low",
          value: "low",
          icon: ArrowDownIcon,
      },
      {
          label: "Medium",
          value: "medium",
          icon: ArrowRightIcon,
      },
      {
          label: "High",
          value: "high",
          icon: ArrowUpIcon,
      },
  ]
  
  
  
  
    
  
    useEffect(() => {
      setInterval(() => setTime(new Date()), 1000);
  
      // Fetch organization name
      const fetchOrgName = async () => {
        const db = getFirestore();
        const orgDoc = await getDoc(doc(db, "organization", "info"));
        if (orgDoc.exists()) {
          setOrgName(orgDoc.data().name);
        }
      };
  
      fetchOrgName();
  
      // Fetch tasks
      const fetchTasks = async () => {
        const tasksCollection = collection(db, 'tasks');
        const tasksSnapshot = await getDocs(query(tasksCollection));
        const tasksList = tasksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(tasksList);
      };
  
      fetchTasks();
  
      const fetchScheduledInspections = async () => {
        try {
          const inspectionsCollection = collection(db, 'inspections');
          const inspectionsSnapshot = await getDocs(inspectionsCollection);
          const count = inspectionsSnapshot.size;
          console.log("Scheduled Inspections Count:", count);
          setScheduledInspectionsCount(count);
        } catch (error) {
          console.error("Error fetching scheduled inspections:", error);
        }
      };
  
      fetchScheduledInspections();
  
      const fetchStaffCount = async () => {
        try {
          const usersCollection = collection(db, 'users');
          const usersSnapshot = await getDocs(usersCollection);
          const count = usersSnapshot.size;
          console.log("Staff Count:", count);
          setStaffCount(count);
        } catch (error) {
          console.error("Error fetching staff count:", error);
        }
      };
  
      fetchStaffCount();
  
      // Check if the current user is an admin
      const checkAdminStatus = async () => {
        if (user && user.uid) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              setIsAdmin(userDoc.data().role === 'admin');
            }
          } catch (error) {
            console.error("Error checking admin status:", error);
          }
        }
      };
  
      checkAdminStatus();
    }, [user, db]);
  
    const c = dayjs();
  
  
  
  
    
    const geocodeLocation = async (location) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
        const data = await response.json();
        if (data && data.length > 0) {
          return { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
      return null;
    };
  
    useEffect(() => {
      const fetchProperties = async () => {
        const rentSnapshot = await getDocs(collection(db, 'rent'));
        const saleSnapshot = await getDocs(collection(db, 'sale'));
        
        const rentProperties = rentSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, type: 'rent' }));
        const saleProperties = saleSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, type: 'sale' }));
        
        const allProperties = [...rentProperties, ...saleProperties];
        
        // Geocode locations
        const propertiesWithCoordinates = await Promise.all(allProperties.map(async (property) => {
          const coordinates = await geocodeLocation(property.location);
          return { ...property, ...coordinates };
        }));
  
        console.log("Fetched properties:", propertiesWithCoordinates);
        setProperties(propertiesWithCoordinates);
  
        // Calculate the count of scheduled inspections
        const count = propertiesWithCoordinates.filter(property => property.inspectionDate).length;
        console.log("Properties with inspection date:", count);
        setInspectionCount(count);
  
        // Set the counts for sale and rent properties
        setSaleCount(saleProperties.length);
        setRentCount(rentProperties.length);
      };
  
      fetchProperties();
    }, []);
  
    useEffect(() => {
      const filtered = properties.filter(property => 
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (propertyType === 'all' || property.type === propertyType)
      );
      console.log("Filtered properties:", filtered);
      setFilteredProperties(filtered);
    }, [searchTerm, propertyType, properties]);
  
    const handleAdminClick = (e) => {
      if (!isAdmin) {
        e.preventDefault();
        setShowAdminAlert(true);
      }
    };
  
    const handleTaskCompletion = async (taskId, completed) => {
      try {
        await updateDoc(doc(db, 'tasks', taskId), {
          completed: completed
        });
        setTasks(tasks.map(task => 
          task.id === taskId ? {...task, completed: completed} : task
        ));
      } catch (error) {
        console.error("Error updating task: ", error);
      }
    };


  return (
    <>

<Nav/>

{/* Main Container */}
      <div className='grid grid-cols-2 p-2 h-fit gap-1 '>




        <div className='col-span-1 grid grid-rows-3 gap-2 h-fit '>
         
            <div className='row-span-1 grid grid-cols-6 gap-2 h-60'>
                {/* Box with date, time */}
                <div className='bg-black col-span-2 rounded-lg p-2 '>

                    <div className='flex justify-between'><span className='text-white fon-hel text-5xl tracking-tighter'>12°</span> <span className='text-white fon-hel text-3xl tracking-tighter'>Lagos</span></div>
                    
                    <div className='grid justify-items-center'>
                    <div className='rounded-full bg-white w-20 h-20 blur-md '></div>
                   </div>

                    <div className='justify-center mt-10'><div><p className='tracking-tight text-base font-hel text-gray-400'>Today</p><span className='text-white tracking-tighter font-hel text-lg'>{c.format('DD MMMM, YYYY')}{' '} </span></div></div>
                    

                </div>


                <div className='bg-black col-span-2 rounded-lg p-2'>


        <div className='flex '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" h-8 w-8 stroke-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.49 12 3.75-3.751m0 0-3.75-3.75m3.75 3.75H3.74V19.5" />
               </svg>


               <Link to="/Profile">
                    <button className='bg-white rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
                    </Link>


        </div>

               <p className='text-white tracking-tighter font-hel text-2xl mt-3 '> {orgName}</p>
               <p className='text-gray-400 tracking-tighter font-hel text-base mt-2 '>92, Lanre Awolokun Gbagada phase 2, Lagos</p>

               <p className='text-lime-300 tracking-tighter font-hel text-2xl mt-6 '>Job role</p>


                </div>





                <div className='bg-purple-400 col-span-2 rounded-lg p-2 '>
                    <Link to="/AI">
                    <button className='bg-white rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
                    </Link>
                    <h2 className='font-hel tracking-tighter text-4xl leading-7 mt-28   '>Market<br/> Insights</h2>
                </div>

            </div>






            <div className='bg-white row-span-2 p-2 '>


            <div className='flex justify-between'> <h2 className='font-hel tracking-tighter text-6xl   text-black   '>Tasks</h2>
        <Link to="/TaskManager">
    <button className='bg-black rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-white">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
    </Link>
</div>

<div className='overflow-y-auto max-h-[calc(100%-4rem)]'>
              {tasks.map((task) => (
                <div key={task.id} className='flex items-center justify-between border-b border-gray-200 py-2'>
                  <div className='flex items-center space-x-4'>
                    <Checkbox 
                      id={`task-${task.id}`} 
                      checked={task.completed}
                      onCheckedChange={(checked) => handleTaskCompletion(task.id, checked)}
                    />
                    <div>
                      <h3 className='font-hel text-xl tracking-tighter'>{task.name}</h3>
                      <div className='flex space-x-2 text-sm text-gray-500'>
                        <span className='flex items-center'>
                          {getStatusIcon(task.status)}
                          <span className="ml-1">{task.status}</span>
                        </span>
                        <span className='flex items-center'>
                          {getPriorityIcon(task.priority)}
                          <span className="ml-1">{task.priority}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>




                
            
            </div>



        </div>














<div className='col-span-1 grid grid-rows-3 gap-2 h-fit'>

<div className='row-span-1 grid grid-cols-6 gap-2 h-60'>

    <div className='bg-black col-span-2 rounded-lg p-2'>
    <Link to="/schedules">
    <button className='bg-white rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
    </Link>

    <h2 className='text-white tracking-tighter text-7xl mt-10 '>{scheduledInspectionsCount}</h2>
    <h2 className='font-hel tracking-tighter text-4xl leading-7  text-white'>Scheduled<br/> Inspections</h2>
    </div>



    <div className='bg-yellow-300 col-span-4 rounded-lg p-2'>
        <div className='flex justify-between'> <h2 className='font-hel tracking-tighter text-4xl leading-9  text-black   '>Property<br/> Listing</h2>
        <Link to="/Listing">
    <button className='bg-white rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
    </Link>
        
        
        </div>
    </div>
</div>


{/* Second row on the right */}
<div className='row-span-1 grid grid-cols-6 gap-2 h-60'>

    <div className='col-span-2 bg-green-600 rounded-lg p-2'>
    <Link to="/propertyvaluecalculator">
    <button className='bg-white rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
    </Link>

    <h2 className='font-hel tracking-tighter text-4xl leading-8 mt-28 text-white   '>Property Value<br/>Calculator</h2>
    </div>
    
    <div className='col-span-2 grid grid-rows-2 gap-2 '>
        <div className='bg-black row-span-1 rounded-lg p-2 grid content-center'>
        <h2 className='font-hel tracking-tighter text-5xl   text-lime-300  text-center '>10:00<span className='text-gray-400'>PM</span></h2> 
        </div>

        <div className='bg-blue-700 row-span-1 rounded-lg p-2'>
        <Link to="/Admin">
    <button className='bg-white rounded-full p-2 ml-48'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
    </Link>
        <h2 className='font-hel tracking-tighter text-4xl leading-8 mt-5  text-white '>Admin Panel</h2>
        </div>
    </div>



    

    <div className='col-span-2 bg-gray-400 rounded-lg p-2 relative'>
        <img src={staffdesign} alt="" className='absolute top-0 left-0 w-full h-full object-cover rounded-lg'/>

    <Link to="/StaffMembers">
    <button className='bg-white rounded-full p-2 ml-48 relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-black">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </button>
    </Link>

    <h2 className='text-white tracking-tighter text-7xl mt-10 relative '>{staffCount}</h2>

    <h2 className='font-hel tracking-tighter text-4xl leading-8  text-white relative   '>Staff<br/>Members</h2>
    </div>






</div>




{/* Third Row on the right */}
<div className='row-span-1 bg-slate-200 h-full w-full '>
<MapContainer center={[9.082, 8.6753]} zoom={6} style={{ position:'relative', objectFit:'cover', height:'100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredProperties.map(property => {
                if (property.latitude && property.longitude) {
                  return (
                    <Marker key={property.id} position={[property.latitude, property.longitude]}>
                      <Tooltip>
                        <div>
                          <h3 className="font-bold">{property.name}</h3>
                          <p>{property.location}</p>
                          <p>{property.currency}{property.price}</p>
                        </div>
                      </Tooltip>
                      <Popup>
                        <div>
                          <h3 className="font-bold">{property.name}</h3>
                          <p>{property.location}</p>
                          <p>{property.type === 'rent' ? 'For Rent' : 'For Sale'}</p>
                          <p>{property.currency}{property.price}</p>
                        </div>
                      </Popup>
                    </Marker>
                  );
                }
                return null;
              })}
            </MapContainer>

            
            <div className='absolute bottom-4 right-4 z-[1000]'>
              <Link to='/Maps'>
                <button className='bg-black font-hel tracking-tighter text-sm text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-200'>
                  View Full Map
                </button>
              </Link>
            </div>
</div>


</div>






        </div>  
        


     <Footer/>   
        
        </>
  )
}



function getStatusIcon(status) {
    switch (status.toLowerCase()) {
      case 'backlog':
        return <CircleIcon className="text-gray-500" />;
      case 'cancelled':
        return <CrossCircledIcon className="text-gray-500 " />;
      case 'done':
        return <CheckCircledIcon className="text-gray-500" />;
      case 'in progress':
        return <StopwatchIcon className="text-gray-500" />;
      default:
        return <FaRegClock className="text-gray-500" />;
    }
  }
  
  function getPriorityIcon(priority) {
    switch (priority.toLowerCase()) {
      case 'high':
        return <ArrowRightIcon className="text-red-500 rotate-180" />;
      case 'medium':
        return <ArrowUpIcon className="text-yellow-500 -rotate-90" />;
      case 'low':
        return <ArrowDownIcon className="text-green-500" />;
      default:
        return <ArrowRightIcon className="text-gray-500" />;
    }
  }