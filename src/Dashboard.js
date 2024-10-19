import React, { useState, useEffect, useContext } from 'react';
import Nav from './components/Nav';
import { Link } from 'react-router-dom';
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
import Footer from './components/Footer';




export default function Dashboard() {
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
    <div className='bg-black h-fit'>
      <Nav />

      <div className='grid grid-cols-2 h-fit p-2 gap-2'>
        <div className='col-span-1 grid grid-rows-3 gap-2'>
          <div className='row-span-1 grid grid-cols-3 gap-2  h-64'>
            <div className='col-span-2  flex justify-between'>
              <div>

              <p className='text-xl tracking-tighter max-w-xl text-zinc-400 font-hel  '>
                  Today {c.format('DD MMMM, YYYY')}{' '}
                </p>
                {orgName && (
                  <h1 className='text-2xl tracking-tighter text-white pt-7 font-hel'>
                    {orgName}
                  </h1>
                )}
                <h1 className='text-6xl tracking-tighter text-white   font-hel'>
                  Nigeria
                </h1>
                {/* <p className='text-xl tracking-tighter max-w-xl text-zinc-400 font-hel  '>
                  Today {c.format('DD MMMM, YYYY')}{' '}
                </p> */}
                <h1 className='text-6xl tracking-tighter text-green-500 pt-4 font-hel'>
                  {time.toLocaleTimeString()}
                </h1>
              </div>

              <Link to='/Profile'>
                <button>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6 stroke-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495'
                    />
                  </svg>
                </button>
              </Link>
            </div>

            <div className='col-span-1 bg-pink-600 rounded-lg   grid  relative  '>
              <video
                muted
                autoPlay
                loop
                className='absolute rounded-lg h-full w-full object-cover'
                src={
                  'https://player.vimeo.com/external/662281550.sd.mp4?s=dda9250f2f8de70783f0c12b2cff4fd2bfffc52a&profile_id=164&oauth_token_id=57447761'
                }
                type='mp4'
              />
              <h1 className='tracking-tighter text-6xl font-hel text-black relative p-2 place-self-center mt-16 '>
                A.I
              </h1>

              <div className='place-self-center  relative p-2'>
                <Link to='/trash'>
                  <button className='bg-black px-8 py-1 rounded-full  place-self-end'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-6 stroke-white'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>



          <div className='row-span-2 bg-white py-2 px-4'>
            <div className='flex justify-between items-center mb-4'>
              <h1 className='text-6xl font-hel text-black tracking-tighter'>Tasks</h1>

              <Link to='/TaskManager'>
                <button className='bg-black px-8 py-1 rounded-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-6 stroke-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                    />
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

        <div className='col-span-1 grid grid-rows-3 gap-2  '>
          <div className='grid grid-cols-2 row-span-1 gap-2'>
            <div className='bg-gray-900  rounded-lg p-2 '>
              <h1 className='tracking-tighter text-5xl text-start text-white font-hel leading-10'>
                Scheduled<br/> Inspections
              </h1>
              
              <div className='flex justify-between mt-16' >
                <h2 className='text-8xl font-hel tracking-tighter text-white'>{scheduledInspectionsCount}</h2>

                <div className='self-end'>
                  <Link to='/schedules'>
                    <button className='bg-black px-7 py-1  rounded-full  place-self-end'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-6 stroke-white'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className='bg-orange-600  rounded-lg p-2 '>
              <h1 className='tracking-tighter text-5xl text-end  text-black font-hel leading-10'>
                Property Listing
              </h1>

              <div className='grid grid-cols-3  mt-24 '>
                <div className='flex '>
                  <p className='font-hel tracking-tighter text-slate-600 text-sm'>Sale</p>
                  <p className='font-hel tracking-tighter text-7xl '>{saleCount}</p>
                </div>

                <div className='flex'>
                  <p className='font-hel tracking-tighter text-slate-600 text-sm'>Rent</p>
                  <p className='font-hel tracking-tighter text-7xl'>{rentCount}</p>
                </div>

                <div className='flex'>
                  <p className='font-hel tracking-tighter text-slate-600 text-sm'>Short Let</p>
                  <p className='font-hel tracking-tighter text-7xl'>0</p>
                </div>
              </div>

              <div className='self-end mt-1'>
                <Link to='/Listing'>
                  <button className='bg-black px-7 py-1  rounded-full  place-self-end'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-6 stroke-white'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                      />
                    </svg>
                  </button>
                </Link>
              </div>

            </div>
          </div>

          <div className=' row-span-1 grid grid-cols-7 gap-2 h-64 row-end-3 '>
            <div className='col-span-2 bg-green-600 rounded-lg p-2'>
              <div className='grid gap-20'>
                <h1 className='tracking-tighter text-5xl text-start font-hel leading-10'>
                  Property Value Calculator
                </h1>

                <Link to='/propertyvaluecalculator'>
                  <button className='bg-black px-8 py-1 rounded-full mt-2  '>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-6 stroke-white'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            <div className='col-span-3 bg-white rounded-lg p-2 text-center'>
              <h1 className='tracking-tighter text-5xl text-center font-hel'>
                Staff Members
              </h1>

              <h1 className='tracking-tighter text-8xl text-center font-hel mt-9'>
                {staffCount}
              </h1>

              <Link to='/StaffMembers'>
                <button className='bg-black px-8 py-1 rounded-full mt-7 '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-6 stroke-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                    />
                  </svg>
                </button>
              </Link>
            </div>

            <div className='col-span-2 bg-yellow-400 rounded-lg p-2 text-end'>
              <h1 className='tracking-tighter text-5xl font-hel leading-10  text-black'>
                Admin Panel
              </h1>

              <Link to='/Admin' onClick={handleAdminClick}>
                <button className='bg-black px-8 py-1 rounded-full  mt-32'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-6 stroke-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25'
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>


          <div className='bg-red-200 row-span-1  h-full w-full'>
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
                <button className='bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-200'>
                  View Full Map
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr className='bg-white my-4' />

      {/* <div className='grid rounded-lg  mx-2 p-2  bg-gradient-to-r from-yellow-300 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-72'>
        <div className=' flex justify-center mt-10   '>
          <p className='text-black tracking-tighter px-2 col-span-1  text-6xl font-semibold leading-8'>
            AugustFlow
          </p>

          <p className='text-black tracking-tighter  col-span-1  text-xl font-semibold '>
            Ⓡ
          </p>
        </div>

        <p className='text-sm tracking-tighter text-center mx-10 text-zinc-600'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div> */}

<Footer/>

      <AlertDialog
        isOpen={showAdminAlert}
        onClose={() => setShowAdminAlert(false)}
        message="Only Admins are allowed to access this page"
      />
    </div>
  );
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
