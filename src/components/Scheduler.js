import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { format } from 'date-fns';

const Scheduler = ({ sale }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inspectionData = {
      date: format(date, 'yyyy-MM-dd'),
      time: time,
      saleName: sale.name,
      saleLocation: sale.location,
      ...formData
    };
    
    try {
      await addDoc(collection(db, "inspections"), inspectionData);
      console.log("Inspection scheduled successfully");
      // Reset form and close dialog
      setFormData({ name: '', phone: '', email: '' });
      setDate(null);
      setTime('');
      setShowForm(false);
    } catch (error) {
      console.error("Error scheduling inspection: ", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Schedule Inspection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Property Inspection</DialogTitle>
        </DialogHeader>
        {!showForm ? (
          <>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
            <Input
              type="time"
              value={time}
              onChange={handleTimeChange}
              className="mt-4"
            />
            <Button onClick={() => setShowForm(true)} disabled={!date || !time}>
              Continue
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">{sale.name}</h3>
                <p>{sale.location}</p>
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
              </div>
            </div>
            <Button type="submit" className="mt-4">Submit</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Scheduler;