"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight, Lock, Mail, MoonStar, Phone, SunMedium, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";


export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState("admin@callinggen.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetStep, setResetStep] = useState<"email" | "verify" | "reset" | "done">("email");
  const [resetEmail, setResetEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Failed to login");
    }
  };

  const handleGoogleLogin = () => {
    setError("Google login is unavailable in this demo. Use the admin credentials instead.");
  };

  const resetFlow = {
    email: {
      title: "Reset your password",
      subtitle: "Enter your email and we’ll send a verification code.",
      button: "Send code",
    },
    verify: {
      title: "Verify your email",
      subtitle: "Enter the 6-digit code we sent to your inbox.",
      button: "Verify code",
    },
    reset: {
      title: "Create a new password",
      subtitle: "Choose a new password for your account.",
      button: "Reset password",
    },
    done: {
      title: "Password updated",
      subtitle: "You can now sign in with your new password.",
      button: "Close",
    },
  };

  const handleForgotPassword = () => {
    setShowForgotModal(true);
    setResetStep("email");
    setResetEmail("");
    setVerificationCode("");
    setNewPassword("");
    setConfirmPassword("");
    setResetMessage("");
  };

  const handleResetSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResetMessage("");

    if (resetStep === "email") {
      if (!resetEmail.trim()) {
        setResetMessage("Please enter your email address.");
        return;
      }
      setResetMessage(`Verification code sent to ${resetEmail}`);
      setResetStep("verify");
      return;
    }

    if (resetStep === "verify") {
      if (verificationCode.length < 6) {
        setResetMessage("Please enter the 6-digit verification code.");
        return;
      }
      setResetMessage("Code verified successfully.");
      setResetStep("reset");
      return;
    }

    if (resetStep === "reset") {
      if (!newPassword || newPassword.length < 6) {
        setResetMessage("Password must be at least 6 characters long.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setResetMessage("Passwords do not match.");
        return;
      }
      setResetMessage("Your password has been reset successfully.");
      setResetStep("done");
      return;
    }

    if (resetStep === "done") {
      setShowForgotModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <nav className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20">
              <Phone className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">CallingGen</span>
          </Link>

        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-[1.75rem] border border-zinc-200/80 bg-white/90 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/90 dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Sign in to continue to your workspace.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="login-email" className="mb-2 block text-sm font-medium">
                Email or Phone Number
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  id="login-email"
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com or +1234567890"
                  className="w-full rounded-2xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-violet-400 dark:focus:ring-violet-500/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-violet-400 dark:focus:ring-violet-500/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
              >
                Forgot password?
              </button>
            </div>

            {error ? (
              <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            ) : null}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:shadow-xl hover:shadow-violet-500/30"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-[0.2em] text-zinc-400">
                <span className="bg-white px-3 dark:bg-zinc-950">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-white py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </div>

      {showForgotModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-violet-600">Password recovery</p>
                <h3 className="mt-1 text-xl font-semibold">{resetFlow[resetStep].title}</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{resetFlow[resetStep].subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleResetSubmit}>
              {resetStep === "email" ? (
                <div>
                  <label htmlFor="reset-email" className="mb-2 block text-sm font-medium">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <input
                      id="reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(event) => setResetEmail(event.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-2xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-violet-400 dark:focus:ring-violet-500/20"
                    />
                  </div>
                </div>
              ) : null}

              {resetStep === "verify" ? (
                <div>
                  <label htmlFor="verification-code" className="mb-2 block text-sm font-medium">Verification code</label>
                  <input
                    id="verification-code"
                    type="text"
                    value={verificationCode}
                    onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-violet-400 dark:focus:ring-violet-500/20"
                  />
                </div>
              ) : null}

              {resetStep === "reset" ? (
                <>
                  <div>
                    <label htmlFor="new-password" className="mb-2 block text-sm font-medium">New password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                      <input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        placeholder="Enter new password"
                        className="w-full rounded-2xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-violet-400 dark:focus:ring-violet-500/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium">Confirm password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                      <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Confirm new password"
                        className="w-full rounded-2xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-violet-400 dark:focus:ring-violet-500/20"
                      />
                    </div>
                  </div>
                </>
              ) : null}

              {resetMessage ? (
                <div className={`rounded-2xl border px-3 py-2 text-sm ${resetMessage.includes("success") || resetMessage.includes("verified") ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300" : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300"}`}>
                  {resetMessage}
                </div>
              ) : null}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:shadow-xl hover:shadow-violet-500/30"
              >
                {resetFlow[resetStep].button}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
