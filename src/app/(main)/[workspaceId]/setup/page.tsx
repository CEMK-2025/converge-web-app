"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/config/axiosInstance";

export default function WorkspaceSetup({ params }: { params: { workspaceId: string } }) {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   // Unwrap the params promise and set the workspaceId
  //   if (params && params.workspaceId) {
  //     setWorkspaceId(params.workspaceId);
  //   }
  // }, [params]);

  // useEffect(() => {
  //   const setupWorkspace = async () => {
  //     if (workspaceId) {
  //       try {
  //         // Create default channels
  //         await axiosInstance.post(`/api/workspaces/${workspaceId}/channels`, {
  //           name: "general",
  //           type: "public"
  //         });

  //         // Redirect to main workspace view
  //         router.push(`/${workspaceId}`);
  //       } catch (error) {
  //         console.error("Setup failed:", error);
  //       }
  //     }
  //   };

  //   setupWorkspace();
  // }, [workspaceId, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Setting up your workspace</h1>
        <p className="text-gray-600">This will only take a moment...</p>
      </div>
    </div>
  );
}
