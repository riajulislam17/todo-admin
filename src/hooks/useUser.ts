import { useState, useEffect } from "react";
import { handleResource } from "@/utils/APIRequester";
import Cookies from "js-cookie";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchUser = async () => {
    const token = Cookies.get(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`);

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await handleResource({
        method: "get",
        endpoint: "/users/me/",
      });
      if (response) {
        setUser(response);
      }
    } catch {
      // Error handled by handleResource
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [refreshTrigger]);

  const refreshUser = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return { user, loading, refreshUser };
};
