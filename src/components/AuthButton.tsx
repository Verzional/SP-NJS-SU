"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="animate-pulse bg-gray-300 h-10 w-24 rounded-md"></div>
    );
  }

  if (session) {
    return (
      <div className="flex flex-col items-center gap-4">
        <span className="text-sm font-medium">
          {session.user?.email} ({session.user?.role})
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
    >
      Sign in with Google
    </button>
  );
}
