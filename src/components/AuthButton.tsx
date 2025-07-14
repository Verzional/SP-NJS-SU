"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

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
        <div className="flex gap-2">
          <Link
            href="/dashboard/pr"
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            PR
          </Link>
          <Link
            href="/dashboard/sa"
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            SA
          </Link>
          <Link
            href="/dashboard/tech"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Tech
          </Link>
        </div>
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
