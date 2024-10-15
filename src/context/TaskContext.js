import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const TaskContext = createContext();

export function useTaskContext() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const taskSnapshot = await getDocs(collection(db, 'tasks'));
    const taskList = taskSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    setTasks(taskList);
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

  const addTask = async (newTask) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      setTasks([...tasks, { ...newTask, id: docRef.id }]);
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const value = {
    tasks,
    handleTaskCompletion,
    handleDeleteTask,
    handleStatusChange,
    addTask,
    fetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// Both useTaskContext and TaskProvider are now exported above, so we don't need to export anything here
