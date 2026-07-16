"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: async () => false,
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

/* ── Dummy credentials ────────────────────────────── */
const DUMMY_EMAIL = "admin@callinggen.com";
const DUMMY_PASSWORD = "admin123";
/* ────────────────────────────────────────────────── */

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      const stored = localStorage.getItem("callinggen-auth");
      if (stored) {
        try {
          const parsedUser = JSON.parse(stored);
          if (parsedUser.name === "Authenticated User" && parsedUser.email) {
            const username = parsedUser.email.split('@')[0];
            parsedUser.name = username.charAt(0).toUpperCase() + username.slice(1);
            localStorage.setItem("callinggen-auth", JSON.stringify(parsedUser));
          }
          setUser(parsedUser);
        } catch {
          localStorage.removeItem("callinggen-auth");
        }
      }
    }, 0);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ identifier: email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          const username = email.split('@')[0];
          const derivedName = username.charAt(0).toUpperCase() + username.slice(1);
          const displayName = data.full_name || derivedName;
          const userData = { email, name: displayName, token: data.access_token };
          setUser(userData);
          localStorage.setItem("callinggen-auth", JSON.stringify(userData));
          router.push("/dashboard");
          return true;
        } else {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Invalid credentials");
        }
      } catch (error: any) {
        throw error;
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("callinggen-auth");
    router.push("/login");
  }, [router]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
