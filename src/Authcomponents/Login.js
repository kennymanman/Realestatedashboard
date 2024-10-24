import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import backgroundImage from "../Images/Aione.jpg";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { getFirestore, doc, updateDoc, serverTimestamp } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signIn(email, password);
      const user = userCredential.user;

      // Update lastSeen timestamp
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        lastSeen: serverTimestamp()
      });

      navigate("/Dashboard");
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        toast.error("The email is not associated with any account. Please create an account.");
      } else if (error.code === 'auth/wrong-password') {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error("An error occurred during sign in. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`}}></div>
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email below to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full bg-black text-white" onClick={handleSubmit}>
              Sign In
            </Button>
            <div className="mt-4 text-center text-sm">
              <Link to="/ForgotPassword" className="underline text-sm text-muted-foreground">
                Forgot password?
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              Dont have an account?{" "}
              <Link to="/Signup" className="underline text-sm text-muted-foreground">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
