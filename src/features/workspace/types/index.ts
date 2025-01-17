export interface User {
    id: number;
    email: string;
    name: string;
    avatar?: string | null;
    status?: string | null;
    role: "ADMIN" | "USER" | "MEMBER";
    createdAt: Date;
    workspaces: Workspace[];
  }
  
  export interface Workspace {
    id: number;
    name: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface AuthResponse {
    message: string;
    data: {
      user: User;
      auth: {
        token: string;
        type: "Bearer";
      };
    };
  }
  
  export interface SignUpData {
    name: string;
    email: string; 
    password: string;
  }
  
  export interface SignInData {
    email: string;
    password: string;
  }
  
  export interface ApiError {
    message: string;
    status?: number;
  }