import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getFirestore, collection, getDocs, doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { toast } from "sonner";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orgName, setOrgName] = useState("");
  const { user } = UserAuth();
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const checkAdminAndFetchUsers = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists() || userDoc.data().role !== "admin") {
        navigate("/dashboard");
        return;
      }

      fetchUsers();
      fetchOrgName();
    };

    checkAdminAndFetchUsers();
  }, [user, navigate, db]);

  const fetchUsers = async () => {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

  const fetchOrgName = async () => {
    const orgDoc = await getDoc(doc(db, "organization", "info"));
    if (orgDoc.exists()) {
      setOrgName(orgDoc.data().name);
    }
  };

  const handleOrgNameSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "organization", "info"), { name: orgName });
    toast.success("Organization name updated successfully");
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteDoc(doc(db, "users", userId));
      fetchUsers();
      toast.success("User deleted successfully");
    }
  };

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <form onSubmit={handleOrgNameSubmit} className="mb-8">
        <Input
          type="text"
          placeholder="Organization Name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          className="mb-2"
        />
        <Button type="submit">Update Organization Name</Button>
      </form>

      <Input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <Table>
        <TableCaption>A list of all users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.jobTitle}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDeleteUser(user.id)}
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
}