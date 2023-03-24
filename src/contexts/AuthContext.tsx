import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";
import {
  getTokenFromStorage,
  removeTokenFromStorage,
  saveTokenToStorage,
} from "../utils/storage/token";
import {
  getUserDataFromStorage,
  removeUserDataFromStorage,
  saveUserDataToStorage,
} from "../utils/storage/user";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tel: string;
};

type AuthContextData = {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isStoredUserDataLoading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isStoredUserDataLoading, setIsStoredUserDataLoading] = useState(false);

  async function signIn(email: string, password: string) {
    try {
      setIsStoredUserDataLoading(true);
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token && data.refresh_token) {
        setUser(data.user);
        await saveUserDataToStorage(data.user);
        await saveTokenToStorage({
          token: data.token,
          refresh_token: data.refresh_token,
        });

        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsStoredUserDataLoading(false);
    }
  }

  async function loadUserData() {
    try {
      const loggedUser = await getUserDataFromStorage();

      const { token } = await getTokenFromStorage();

      if (token && loggedUser) {
        setUser({ ...loggedUser, token } as User);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      throw error;
    } finally {
      setIsStoredUserDataLoading(false);
    }
  }

  async function signOut() {
    try {
      setUser({} as User);
      await removeUserDataFromStorage();
      await removeTokenFromStorage();
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.interceptTokenManagement(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{ user, signIn, isStoredUserDataLoading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
