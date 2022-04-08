import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../config";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);

  // Register User
  const register = async (user) => {
    console.log(user);
  };

  // Login User
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Logout User
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/logout`, { method: "POST" });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  // Check if user logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/user`);
    const data = await res.json();

    console.log(data);

    if (res.ok) {
      setUser(data);
    } else {
      setUser(null);
    }
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
