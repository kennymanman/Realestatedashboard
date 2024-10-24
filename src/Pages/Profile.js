import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { UserAuth } from "../context/AuthContext";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { Separator } from "../components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useLocation, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user } = UserAuth() || {};
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    jobTitle: "",
    jobRole: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
  });
  const [resetEmail, setResetEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setFormData({
              username: data.username || "",
              jobTitle: data.jobTitle || "",
              jobRole: data.role || "",
              email: data.email || "",
              phoneNumber: data.phoneNumber || "",
              profilePicture: data.profilePicture || "",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load user data");
        }
      }
    };
    fetchUserData();
  }, [user, db]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.uid) {
      toast.error("User not authenticated");
      return;
    }
    try {
      let profilePictureUrl = formData.profilePicture;

      if (profilePicture) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, profilePicture);
        profilePictureUrl = await getDownloadURL(storageRef);
      }

      const updatedFormData = { ...formData, profilePicture: profilePictureUrl };
      await updateDoc(doc(db, "users", user.uid), updatedFormData);
      await updateProfile(user, { 
        displayName: formData.username,
        photoURL: profilePictureUrl
      });
      setFormData(updatedFormData);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user || !user.auth) {
      toast.error("User not authenticated");
      return;
    }
    try {
      await sendPasswordResetEmail(user.auth, resetEmail);
      toast.success("Password reset email sent");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      toast.error("Error sending password reset email");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-background min-h-screen ">
      <Nav />
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="space-y-6">
          <div>

                

          
      <button onClick={() => navigate(-1)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 ml-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>
</button>







            <h3 className="text-6xl font-medium font-hel tracking-tight">My Profile</h3>
            <p className="text-sm text-muted-foreground font-hel  mt-2">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={formData.profilePicture} alt={formData.username} />
                      <AvatarFallback>{formData.username ? formData.username.charAt(0) : 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Label htmlFor="profile-picture">Profile Picture</Label>
                      <Input
                        id="profile-picture"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Job Title" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobRole">Job Role</Label>
                    <Input id="jobRole" name="jobRole" value={formData.jobRole} readOnly disabled />
                    <p className="text-sm text-muted-foreground mt-1">
                      To change your job role, please contact an administrator.
                    </p>
                  </div>
                </div>
                <CardFooter className="flex justify-end pt-6">
                  <Button type="submit" className="bg-black text-white hover:bg-gray-800">Save changes</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password or reset it if you have forgotten it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resetEmail">Email</Label>
                  <Input
                    id="resetEmail"
                    placeholder="Enter your email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter the email associated with your account to reset your password.
                </p>
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">Reset Password</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}