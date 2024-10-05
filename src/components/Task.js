import { useState } from "react"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export function Task({ setTasks, user }) {
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskPriority, setTaskPriority] = useState("medium")
  const [taskLink, setTaskLink] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateTask = async (e) => {
    e.preventDefault()
    if (taskName.trim() === '') return

    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        name: taskName,
        description: taskDescription,
        completed: false,
        priority: taskPriority,
        status: "backlog",
        link: taskLink,
        createdAt: serverTimestamp(),
        createdBy: user ? user.displayName : 'Unknown User',
      });

      setTasks(prevTasks => [...prevTasks, { 
        id: docRef.id, 
        name: taskName, 
        description: taskDescription,
        completed: false, 
        priority: taskPriority,
        status: "backlog",
        link: taskLink,
        createdAt: new Date().toISOString(),
        createdBy: user ? user.displayName : 'Unknown User',
      }])

      // Reset form fields
      setTaskName("")
      setTaskDescription("")
      setTaskPriority("medium")
      setTaskLink("")

      // Close the dialog
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error adding task: ", error)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add a new task to your list. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateTask}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="taskName" className="text-right">
                Task Title
              </Label>
              <Input
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="taskDescription" className="text-right">
                Description
              </Label>
              <Textarea
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="taskPriority" className="text-right">
                Priority
              </Label>
              <Select
                value={taskPriority}
                onValueChange={setTaskPriority}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="taskLink" className="text-right">
                Add Link
              </Label>
              <Input
                id="taskLink"
                type="url"
                value={taskLink}
                onChange={(e) => setTaskLink(e.target.value)}
                placeholder="https://example.com"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}