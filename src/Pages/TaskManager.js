import { useState, useEffect } from "react"
import { collection, getDocs, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../config/firebaseConfig';
import { Task } from "../components/Task"
import { DataTable } from "../components/DataTable"
import { 
  CheckCircledIcon, 
  CircleIcon, 
  CrossCircledIcon, 
  StopwatchIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons"

import { useLocation, useNavigate } from 'react-router-dom';
import Nav from "../components/Nav";
import Footer from "../components/Footer";





export default function TaskManager() {
	const [tasks, setTasks] = useState([])
	const [user, setUser] = useState(null)
	const navigate = useNavigate();

	useEffect(() => {
			// Set up auth state listener
			const unsubscribe = auth.onAuthStateChanged((user) => {
				setUser(user);
				if (user) {
					// Set up real-time listener for tasks
					const tasksUnsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
						const taskList = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
						setTasks(taskList);
					});

					return () => {
						tasksUnsubscribe();
					};
				}
			});

			return () => unsubscribe();
	}, []);

	const handleTaskCompletion = async (taskId, completed) => {
		try {
			await updateDoc(doc(db, 'tasks', taskId), {
				completed: completed
			});
			// No need to update local state, as it will be updated by the onSnapshot listener
		} catch (error) {
			console.error("Error updating task: ", error);
		}
	};

	const handleDeleteTask = async (taskId) => {
		try {
			await deleteDoc(doc(db, 'tasks', taskId));
			setTasks(tasks.filter(task => task.id !== taskId));
		} catch (error) {
			console.error("Error deleting task: ", error);
		}
	};

	const handleStatusChange = async (taskId, status) => {
		try {
			await updateDoc(doc(db, 'tasks', taskId), { status });
			setTasks(tasks.map(task => 
				task.id === taskId ? {...task, status} : task
			));
		} catch (error) {
			console.error("Error updating task status: ", error);
		}
	};

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

	return (
		<>

		<Nav/>

		<button onClick={() => navigate(-1)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 ml-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>
</button>



			<div className="h-screen flex-1 flex-col space-y-8 p-8 md:flex">

	
				<div className="flex items-center justify-between space-y-2">
					
						





<div>
        <h1 className="text-6xl font-hel tracking-tighter" >Tasks</h1>
		<p className="font-hel tracking-tighter text-gray-500">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
</div>


					
					<div className="flex items-center space-x-2">
						<Task setTasks={setTasks} user={user} />
					</div>
				</div>
				<DataTable 
					data={tasks} 
					onComplete={handleTaskCompletion} 
					onDelete={handleDeleteTask} 
					onStatusChange={handleStatusChange}
					statuses={statuses}
					priorities={priorities}
					
				/>
			</div>

			<Footer/>
		</>
	)
}
