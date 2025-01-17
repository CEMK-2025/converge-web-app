"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/config/axiosInstance";
import Link from "next/link";
import { IoPlaySharp } from "react-icons/io5";
import { SiGooglelens } from "react-icons/si";
import { LoadingSpinner } from "@/app/components/ui/loader";
import { AuthResponse } from "@/features/workspace/types";


export const SignUpCard = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");
  
      try {
        const response = await axiosInstance.post<AuthResponse>("/auth/signup", formData);
        
        if (response.data?.data?.user?.workspaces?.length > 0) {
          // User has workspaces, redirect to first one
          router.push(`/${response.data.data.user.workspaces[0].id}`);
        } else {
          // No workspaces, show welcome screen
          router.push("/dashboard");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Signup failed");
      } finally {
        setIsLoading(false);
      }
    };  

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 p-4 md:p-8">
      {/* Left Section */}
      <div className="flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg p-12 m-4 md:m-8 flex items-center justify-center shadow-lg max-w-xl">
        <div className="text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <IoPlaySharp size={28} className="animate-spin" />
            <h1 className="text-5xl font-bold tracking-wide">Converge AI</h1>
          </div>
          <h2 className="text-4xl font-semibold mb-4">Join the Revolution</h2>
          <p className="mt-2 text-lg leading-relaxed">
            🌟 Start your journey with Converge AI today
            <br />
            Transform the way you collaborate! 🚀
          </p>
          <div className="mt-6">
            <img
              src="futuristic-image.jpg"
              alt="Futuristic Design"
              className="w-52 mx-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 max-w-md w-full p-8 bg-white rounded-lg shadow-md m-4 md:m-8">
        <div className="flex items-center justify-center mb-6">
          <SiGooglelens size={40} />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span className="ml-2">Creating Account...</span>
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
          <span className="text-gray-500">Already have an account?</span>
          <Link
            href="/sign-in"
            className="ml-2 text-indigo-600 font-medium hover:text-indigo-500"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
