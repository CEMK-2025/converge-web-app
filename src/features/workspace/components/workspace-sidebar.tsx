"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Hash, 
  ChevronDown, 
  Plus, 
  Settings,
  Users,
  MessageSquare
} from "lucide-react";
import axiosInstance from "@/config/axiosInstance";
import type { Channel, Workspace, User } from "../types";

export const WorkspaceSidebar = () => {
  const params = useParams();
  const router = useRouter();
  
  // State
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChannelListOpen, setIsChannelListOpen] = useState(true);
  const [isDMListOpen, setIsDMListOpen] = useState(true);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/api/workspaces/${params.workspaceId}`);
        setWorkspace(response.data.workspace);
        setCurrentUser(response.data.currentUser);
        setChannels(response.data.workspace.channels);
      } catch (error: any) {
        setError(error.response?.data?.message || "Failed to load workspace");
        console.error("Failed to fetch workspace:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspaceData();
  }, [params.workspaceId]);

  const handleChannelClick = (channelId: number) => {
    router.push(`/${params.workspaceId}/channels/${channelId}`);
  };

  if (isLoading) {
    return (
      <div className="w-60 bg-gray-800 text-gray-300 flex items-center justify-center">
        <div className="text-sm">Loading workspace...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-60 bg-gray-800 text-gray-300 flex items-center justify-center">
        <div className="text-sm text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-60 bg-gray-800 text-gray-300 flex flex-col h-screen">
      {/* Workspace Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-white truncate">
            {workspace?.name || "Loading..."}
          </h1>
          <Settings 
            className="w-4 h-4 cursor-pointer hover:text-white" 
            onClick={() => {/* Open settings modal */}}
          />
        </div>
      </div>

      {/* Sidebar Sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Channels Section */}
        <div className="px-3 py-2">
          <div 
            className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => setIsChannelListOpen(!isChannelListOpen)}
          >
            <div className="flex items-center gap-1">
              <ChevronDown className={`w-4 h-4 ${isChannelListOpen ? "" : "-rotate-90"} transition-transform`} />
              <span className="text-sm font-medium">Channels</span>
            </div>
            <Plus 
              className="w-4 h-4 hover:text-white cursor-pointer" 
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Open create channel modal
              }}
            />
          </div>

          {isChannelListOpen && (
            <div className="mt-1 space-y-1">
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => handleChannelClick(channel.id)}
                  className="flex items-center gap-2 p-2 text-sm hover:bg-gray-700 rounded cursor-pointer"
                >
                  <Hash className="w-4 h-4" />
                  <span className="truncate">{channel.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Direct Messages Section */}
        <div className="px-3 py-2">
          <div 
            className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => setIsDMListOpen(!isDMListOpen)}
          >
            <div className="flex items-center gap-1">
              <ChevronDown className={`w-4 h-4 ${isDMListOpen ? "" : "-rotate-90"} transition-transform`} />
              <span className="text-sm font-medium">Direct Messages</span>
            </div>
            <MessageSquare 
              className="w-4 h-4 hover:text-white cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Open new DM modal
              }}
            />
          </div>

          {/* {isDMListOpen && (
            <div className="mt-1 space-y-1">
              {workspace?.members
                .filter(member => member.user.id !== currentUser?.id)
                .map(member => (
                  <div
                    key={member.user.id}
                    className="flex items-center gap-2 p-2 text-sm hover:bg-gray-700 rounded cursor-pointer"
                  >
                    <div className="w-4 h-4 rounded-full bg-gray-600 flex-shrink-0">
                      {member.user.avatar && (
                        <img 
                          src={member.user.avatar} 
                          alt={member.user.name}
                          className="w-full h-full rounded-full"
                        />
                      )}
                    </div>
                    <span className="truncate">{member.user.name}</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 ml-auto" />
                  </div>
                ))}
            </div>
          )} */}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0">
            {currentUser?.avatar && (
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-full h-full rounded-full"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">
              {currentUser?.name || "User"}
            </div>
            <div className="text-xs text-gray-400">Online</div>
          </div>
        </div>
      </div>
    </div>
  );
};