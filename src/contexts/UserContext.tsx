import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useUser } from "@/hooks/useUser";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: string;
  address?: string;
  contact_number?: string;
  birthday?: string;
  bio?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, loading, refreshUser } = useUser();

  const value = useMemo(
    () => ({ user, loading, refreshUser }),
    [user, loading, refreshUser]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
