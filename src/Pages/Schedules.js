import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const Schedules = () => {
  const [inspections, setInspections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    fetchInspections();
  }, []);

  const fetchInspections = async () => {
    const querySnapshot = await getDocs(collection(db, "inspections"));
    const inspectionsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      isDone: doc.data().isDone || false,
      createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date()
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "inspections", id));
      fetchInspections(); // Refresh the data
    } catch (error) {
      console.error("Error deleting inspection: ", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).replace(/(\d+)/, (match) => {
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const suffix = suffixes[(match > 3 && match < 21) || match % 10 > 3 ? 0 : match % 10];
      return `${match}${suffix}`;
    });
  };

  const sortInspections = (inspections) => {
    switch (sortBy) {
      case 'latest':
        return [...inspections].sort((a, b) => b.createdAt - a.createdAt);
      case 'done':
        return [...inspections].sort((a, b) => b.isDone - a.isDone);
      case 'undone':
        return [...inspections].sort((a, b) => a.isDone - b.isDone);
      default:
        return inspections;
    }
  };

  const filteredInspections = sortInspections(inspections.filter(inspection =>
    Object.values(inspection).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Scheduled Inspections</h1>
      <div className="flex gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search schedules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="latest">Latest Added</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="undone">Undone</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInspections.map((inspection) => (
            <TableRow key={inspection.id}>
              <TableCell>
                <Checkbox
                  checked={inspection.isDone}
                  onCheckedChange={() => handleCheckboxChange(inspection.id, inspection.isDone)}
                />
              </TableCell>
              <TableCell>{formatDate(inspection.date)}</TableCell>
              <TableCell>{inspection.time}</TableCell>
              <TableCell>{inspection.name}</TableCell>
              <TableCell>{inspection.phone}</TableCell>
              <TableCell>{inspection.email}</TableCell>
              <TableCell>{inspection.saleName}</TableCell>
              <TableCell>{inspection.saleLocation}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(inspection.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Schedules;
