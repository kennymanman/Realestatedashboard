import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { database } from "../config/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Icons } from "../components/ui/icons"; // Changed this import

import backgroundImage from "../Images/Aione.jpg"; // Import the background image

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = e.target.email.value;
    sendPasswordResetEmail(database, emailVal)
      .then((data) => {
        alert("Check your gmail");
        navigate("/");
      })
      .catch((err) => {
        alert("This Email is not linked to any account.");
      });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center relative" style={{backgroundImage: `url(${backgroundImage})`}}>
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-white"
      >
        <Icons.arrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Card className="mx-auto max-w-sm w-full bg-white">
        <CardHeader>
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                Reset Password
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <Link to="/" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
