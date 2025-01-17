"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoPlaySharp } from "react-icons/io5";
import axiosInstance from "@/config/axiosInstance";
import type { CreateWorkspaceData, WorkspaceResponse } from "../types";

type WelcomeView = "select" | "create" | "join";

export const WorkspaceWelcome = () => {
  const router = useRouter();
  const [view, setView] = useState<WelcomeView>("select");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [workspaceData, setWorkspaceData] = useState<CreateWorkspaceData>({
    name: "",
    description: ""
  });
  const [inviteCode, setInviteCode] = useState("");

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post<WorkspaceResponse>("/workspace/create", workspaceData);
      
      if (response.data.workspace.id) {
        router.push(`/${response.data.workspace.id}/setup`);
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("Please provide a valid workspace name");
      } else if (err.response?.status === 409) {
        setError("A workspace with this name already exists");
      } else {
        setError("Failed to create workspace. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post<WorkspaceResponse>("/api/workspaces/join", {
        inviteCode
      });
      
      if (response.data.workspace.id) {
        router.push(`/${response.data.workspace.id}`);
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Invalid invite code");
      } else {
        setError("Failed to join workspace. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        {view === "select" ? (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <IoPlaySharp size={24} className="text-indigo-600" />
              <h1 className="text-2xl font-bold">Welcome to Converge AI</h1>
            </div>
            <p className="text-gray-600 mb-8">
              Get started by creating a new workspace or joining an existing one
            </p>
            <div className="space-y-4">
              <button
                onClick={() => setView("create")}
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create a New Workspace
              </button>
              <button
                onClick={() => setView("join")}
                className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Join an Existing Workspace
              </button>
            </div>
          </div>
        ) : view === "create" ? (
          <div>
            <button 
              onClick={() => setView("select")} 
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <h2 className="text-xl font-semibold mb-4">Create a New Workspace</h2>
            {error && (
              <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Workspace Name
                </label>
                <input
                  type="text"
                  value={workspaceData.name}
                  onChange={(e) => setWorkspaceData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ex: Acme Corp"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Workspace Description
                </label>
                <textarea
                  value={workspaceData.description}
                  onChange={(e) => setWorkspaceData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="What's your workspace about?"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Workspace...
                  </>
                ) : (
                  "Create Workspace"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <button 
              onClick={() => setView("select")} 
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <h2 className="text-xl font-semibold mb-4">Join a Workspace</h2>
            {error && (
              <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            <form onSubmit={handleJoinSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Workspace Invite Code
                </label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter invite code"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Joining Workspace...
                  </>
                ) : (
                  "Join Workspace"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};