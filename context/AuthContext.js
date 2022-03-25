import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../config";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register User
  const register = async (user) => {
    console.log(user);
  };

  // Login User
  const login = async ({ email: identifier, password }) => {
    console.log(identifier, password);
  };

  // Logout User
  const logout = async () => {
    console.log("logout");
  };

  // Check if user logged in
  const checkUserLoggedIn = async (user) => {
    console.log("Check");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
