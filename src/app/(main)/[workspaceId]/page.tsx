"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import type { WorkspaceResponse } from "@/features/workspace/types";

export default function WorkspacePage({ 
  params 
}: { 
  params: { workspaceId: string } 
}) {
  const [workspace, setWorkspace] = useState<WorkspaceResponse | null>(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      const response = await axiosInstance.get(`/api/workspaces/${params.workspaceId}`);
      setWorkspace(response.data);
    };

    fetchWorkspace();
  }, [params.workspaceId]);

  if (!workspace) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{workspace.workspace?.name}</h1>
      {/* Workspace content will go here */}
    </div>
  );
}