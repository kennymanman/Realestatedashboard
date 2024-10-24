import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { useLocation, useNavigate } from 'react-router-dom';





const Schedules = () => {
  const [inspections, setInspections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const navigate = useNavigate();

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
    <>
      <Nav/>
      <div className="container mx-auto px-4 py-8">

<button onClick={() => navigate(-1)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>
</button>




        <h1 className="text-6xl font-hel tracking-tighter  mb-5" >Scheduled Inspections</h1>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Search schedules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Select className="" onValueChange={setSortBy} defaultValue={sortBy}>
            <SelectTrigger className="w-[180px] bg-black text-white font-hel tracking-tight">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="latest">Latest Added</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="undone">Undone</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table className="min-h-screen">
          <TableCaption>A list of all scheduled property inspections.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-hel tracking-tight text-base text-gray-500">Done</TableHead>
              <TableHead className="font-hel tracking-tight text-base text-gray-500">Image</TableHead>
              <TableHead className="font-hel tracking-tight text-base text-gray-500">Date</TableHead>
              <TableHead className="font-hel tracking-tight text-base text-gray-500">Time</TableHead>
              <TableHead className="font-hel tracking-tight text-base text-gray-500">Client Name</TableHead>
              <TableHead className="font-hel tracking-tight text-base text-gray-500">Phone</TableHead>
              <TableHead className="font-hel tracking-tight text-base text-gray-500">Email</TableHead>
              <TableHead className="font-hel tracking-tight text-base text-gray-500">Property Name</TableHead>
              <TableHead className="font-hel tracking-tight text-base text-gray-500">Property Location</TableHead>
              <TableHead className="font-hel tracking-tight text-base text-gray-500">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInspections.length > 0 ? (
              filteredInspections.map((inspection) => (
                <TableRow 
                  key={inspection.id}
                  className="transition-colors hover:bg-black hover:text-white"
                >
                  <TableCell>
                    <Checkbox
                      checked={inspection.isDone}
                      onCheckedChange={() => handleCheckboxChange(inspection.id, inspection.isDone)}
                    />
                  </TableCell>
                  <TableCell>
                    {inspection.sale && inspection.sale.firstImage && (
                      <img
                        src={inspection.sale.firstImage}
                        alt={`Image of ${inspection.saleName}`}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        className="rounded"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-hel text-lg tracking-tight">{formatDate(inspection.date)}</TableCell>
                  <TableCell className="font-hel text-lg tracking-tight">{inspection.time}</TableCell>
                  <TableCell className="font-hel text-lg tracking-tight">{inspection.name}</TableCell>
                  <TableCell className="font-hel text-lg tracking-tight">{inspection.phone}</TableCell>
                  <TableCell className="font-hel text-lg tracking-tight">{inspection.email}</TableCell>
                  <TableCell className="font-hel text-lg tracking-tight">{inspection.saleName}</TableCell>
                  <TableCell className="font-hel text-lg tracking-tight">{inspection.saleLocation}</TableCell>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-10">
                  <p className="text-xl font-hel tracking-tighter text-gray-500">No Scheduled Inspection history yet</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Footer/>
    </>
  );
};

export default Schedules;
