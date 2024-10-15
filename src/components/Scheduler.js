import * as React from "react"
import { Calendar } from "./ui/calendar"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'; // Ensure this path is correct

export default function Scheduler({ sale }) {
  const [date, setDate] = React.useState(new Date())
  const [time, setTime] = React.useState("12:00")
  const [amPm, setAmPm] = React.useState("AM")
  const [isTimePickerOpen, setIsTimePickerOpen] = React.useState(false)
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({ name: '', phone: '', email: '' })

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate)
    }
  }

  const handleTimeSelect = (value) => {
    setTime(value)
  }

  const handleAmPmSelect = (value) => {
    setAmPm(value)
  }

  const handleConfirm = () => {
    console.log("Selected Date and Time:", date.toDateString(), time, amPm)
    setIsTimePickerOpen(false)
    setIsFormOpen(true)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const inspectionData = {
      date: date.toISOString(),
      time: `${time} ${amPm}`,
      saleName: sale.name,
      saleLocation: sale.location,
      ...formData,
    }

    console.log("Submitting inspection data:", inspectionData)

    try {
      await addDoc(collection(db, "inspections"), inspectionData)
      console.log("Inspection scheduled successfully")
      setFormData({ name: '', phone: '', email: '' })
      setIsFormOpen(false)
    } catch (error) {
      console.error("Error scheduling inspection: ", error)
    }
  }

  return (
    <div className="p-1 space-y-4">
      <AlertDialog open={isTimePickerOpen} onOpenChange={setIsTimePickerOpen}>
        <AlertDialogTrigger asChild>
          <Button className="w-full mt-7 bg-black text-white rounded-none">Schedule Inspection</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Schedule Inspection for {sale.name}</AlertDialogTitle>
            <AlertDialogDescription>
              Location: {sale.location}
              <br />
              Choose a date and time for your inspection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border mx-auto"
            />
            <div className="flex justify-center space-x-2">
              <Select onValueChange={(value) => handleTimeSelect(`${value}:${time.split(':')[1]}`)}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder={time.split(':')[0]} />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-2xl">:</span>
              <Select onValueChange={(value) => handleTimeSelect(`${time.split(':')[0]}:${value}`)}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder={time.split(':')[1]} />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={handleAmPmSelect} defaultValue={amPm}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder={amPm} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Enter Your Details for {sale.name}</AlertDialogTitle>
            <AlertDialogDescription>
              Location: {sale.location}
              <br />
              Please provide your contact information for the inspection on {date.toDateString()} at {time} {amPm}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Submit</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}