"use client";
import { WorkspaceWelcome } from "@/features/workspace/components/workspace-welcome";

export default function DashboardPage() {
  // Show workspace welcome screen if user has no workspaces
  return <WorkspaceWelcome />;
}