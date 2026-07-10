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
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => false,
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
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem("callinggen-auth");
        }
      }
    }, 0);
  }, []);

  const login = useCallback(
    (email: string, password: string): boolean => {
      if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
        const userData = { email, name: "Admin User" };
        setUser(userData);
        localStorage.setItem("callinggen-auth", JSON.stringify(userData));
        router.push("/dashboard");
        return true;
      }
      return false;
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
