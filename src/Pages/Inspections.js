import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const Inspections = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inspections, setInspections] = useState([]);

  useEffect(() => {
    const fetchInspections = async () => {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const q = query(
        collection(db, "inspections"),
        where("date", ">=", startOfDay.toISOString()),
        where("date", "<=", endOfDay.toISOString())
      );

      try {
        const querySnapshot = await getDocs(q);
        const fetchedInspections = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: new Date(doc.data().date)
        }));
        setInspections(fetchedInspections);
      } catch (error) {
        console.error("Error fetching inspections: ", error);
      }
    };

    fetchInspections();
  }, [selectedDate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Scheduled Inspections</h1>
      <div className="flex space-x-4">
        <div className="w-1/3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </div>
        <div className="w-2/3">
          <Table>
            <TableCaption>Inspections for {selectedDate.toDateString()}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspections.map((inspection) => (
                <TableRow key={inspection.id}>
                  <TableCell>{inspection.saleName}</TableCell>
                  <TableCell>{inspection.saleLocation}</TableCell>
                  <TableCell>{inspection.name}</TableCell>
                  <TableCell>{inspection.phone}</TableCell>
                  <TableCell>{inspection.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Inspections;