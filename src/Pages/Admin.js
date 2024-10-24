import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getFirestore, collection, getDocs, doc, deleteDoc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react"; // Import an icon for the dropdown trigger

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [orgCountry, setOrgCountry] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const { user } = UserAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const checkAdminAndFetchData = async () => {
      if (!user) {
        console.log("No user found, redirecting to login");
        navigate("/login");
        return;
      }

      if (!user.uid) {
        console.log("User UID is undefined, waiting for auth state to settle");
        return; // Exit early if uid is not available yet
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (!userDoc.exists()) {
          console.log("User document does not exist");
          navigate("/dashboard");
          return;
        }

        const userData = userDoc.data();
        if (userData.role !== "admin") {
          console.log("User is not an admin");
          navigate("/dashboard");
          return;
        }

        console.log("User is admin, fetching data");
        fetchUsers();
        fetchOrgInfo();
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/dashboard");
      }
    };

    checkAdminAndFetchData();
  }, [user, navigate, db]);

  const fetchUsers = async () => {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

  const fetchOrgInfo = async () => {
    const orgDoc = await getDoc(doc(db, "organization", "info"));
    if (orgDoc.exists()) {
      const data = orgDoc.data();
      setOrgName(data.name || "");
      setOrgAddress(data.address || "");
      setOrgCountry(data.country || "");
      setLogoUrl(data.logoUrl || "");
    }
  };

  const handleOrgInfoSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "organization", "info"), { 
      name: orgName,
      address: orgAddress,
      country: orgCountry
    }, { merge: true });
    toast.success("Organization information updated successfully");
  };

  const handleLogoUpload = async (e) => {
    e.preventDefault();
    if (!logoFile) {
      toast.error("Please select a file to upload");
      return;
    }

    const storageRef = ref(storage, `orgLogo/${logoFile.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, logoFile);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      await setDoc(doc(db, "organization", "info"), { logoUrl: downloadUrl }, { merge: true });
      setLogoUrl(downloadUrl);
      toast.success("Logo uploaded successfully");
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Failed to upload logo");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteDoc(doc(db, "users", userId));
      fetchUsers();
      toast.success("User deleted successfully");
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const newStatus = !currentStatus;
    await updateDoc(doc(db, "users", userId), { isActive: newStatus });
    fetchUsers();
    toast.success(`User account ${newStatus ? 'enabled' : 'disabled'} successfully`);
  };

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value => 
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <TooltipProvider>
      <Nav/>
      <div className="min-h-screen bg-white text-black p-8">
        <h1 className="text-6xl tracking-tighter mb-8 font-hel">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOrgInfoSubmit} className="space-y-4">
                <div>
                  <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">Organization Name</label>
                  <Input
                    id="orgName"
                    type="text"
                    placeholder="Organization Name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="orgAddress" className="block text-sm font-medium text-gray-700">Organization Address</label>
                  <Input
                    id="orgAddress"
                    type="text"
                    placeholder="Organization Address"
                    value={orgAddress}
                    onChange={(e) => setOrgAddress(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="orgCountry" className="block text-sm font-medium text-gray-700">Organization Country</label>
                  <Input
                    id="orgCountry"
                    type="text"
                    placeholder="Organization Country"
                    value={orgCountry}
                    onChange={(e) => setOrgCountry(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button className="bg-black text-white"  type="submit">Update Organization Information</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization Logo</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogoUpload} className="space-y-4">
                <div>
                  <label htmlFor="logoFile" className="block text-sm font-medium text-gray-700">Upload New Logo</label>
                  <Input
                    id="logoFile"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files[0])}
                    className="mt-1"
                  />
                </div>
                <Button className="bg-black text-white" type="submit">Upload Organization Logo</Button>
              </form>
              {logoUrl && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Current Logo:</h3>
                  <img src={logoUrl} alt="Organization Logo" className="w-24 h-24 rounded-full shadow-md object-cover" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
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
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>{user.username}</TooltipTrigger>
                        <TooltipContent>
                          <img src={user.profilePicture || 'default-avatar.png'} alt={user.username} className="w-24 h-24 rounded-full" />
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{user.jobTitle}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.isActive ? 'Active' : 'Disabled'}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white" align="end">
                          <DropdownMenuItem
                            onClick={() => handleToggleUserStatus(user.id, user.isActive)}
                          >
                            {user.isActive ? 'Disable' : 'Enable'} Account
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

       
      </div>

      <Footer/>
    </TooltipProvider>
  );
}
