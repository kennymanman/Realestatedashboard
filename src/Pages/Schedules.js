import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Checkbox } from "../components/ui/checkbox";

const Schedules = () => {
  const [inspections, setInspections] = useState([]);

  useEffect(() => {
    fetchInspections();
  }, []);

  const fetchInspections = async () => {
    const querySnapshot = await getDocs(collection(db, "inspections"));
    const inspectionsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      isDone: doc.data().isDone || false
    }));
    setInspections(inspectionsData);
  };

  const handleCheckboxChange = async (id, isDone) => {
    try {
      await updateDoc(doc(db, "inspections", id), { isDone: !isDone });
      fetchInspections(); // Refresh the data
    } catch (error) {
      console.error("Error updating inspection status: ", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Scheduled Inspections</h1>
      <Table>
        <TableCaption>A list of all scheduled property inspections.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Done</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Property Name</TableHead>
            <TableHead>Property Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inspections.map((inspection) => (
            <TableRow key={inspection.id}>
              <TableCell>
                <Checkbox
                  checked={inspection.isDone}
                  onCheckedChange={() => handleCheckboxChange(inspection.id, inspection.isDone)}
                />
              </TableCell>
              <TableCell>{inspection.date}</TableCell>
              <TableCell>{inspection.time}</TableCell>
              <TableCell>{inspection.name}</TableCell>
              <TableCell>{inspection.phone}</TableCell>
              <TableCell>{inspection.email}</TableCell>
              <TableCell>{inspection.saleName}</TableCell>
              <TableCell>{inspection.saleLocation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Schedules;