"use client";

import { WorkspaceSidebar } from "./workspace-sidebar";

export const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <WorkspaceSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};