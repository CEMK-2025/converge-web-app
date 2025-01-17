"use client";
import { useState } from "react";
import { IoPlaySharp } from "react-icons/io5";

type WelcomeView = "select" | "create" | "join";

export const WorkspaceWelcome = () => {
  const [view, setView] = useState<WelcomeView>("select");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        {view === "select" ? (
          // Initial Selection View
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
          // Create Workspace Form
          <div>
            <button onClick={() => setView("select")} className="mb-4 text-gray-600">
              ← Back
            </button>
            <h2 className="text-xl font-semibold mb-4">Create a New Workspace</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Workspace Name
                </label>
                <input
                  type="text"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="What's your workspace about?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Create Workspace
              </button>
            </form>
          </div>
        ) : (
          // Join Workspace Form
          <div>
            <button onClick={() => setView("select")} className="mb-4 text-gray-600">
              ← Back
            </button>
            <h2 className="text-xl font-semibold mb-4">Join a Workspace</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Workspace Invite Code
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter invite code"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Join Workspace
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};