"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import { User } from "@/types/user";
import { editUser, getUserById } from "@/lib/user";
import Link from "next/link";

interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

export default function EditUserPage({ params }: EditUserPageProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>("VIEWER");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setUserId(resolvedParams.id);
      
      try {
        const userData = await getUserById(resolvedParams.id);
        if (userData) {
          setUser(userData);
          setSelectedRole(userData.role);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    resolveParams();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);
    setError("");

    try {
      const result = await editUser(userId, selectedRole);
      
      if (result.success) {
        router.push("/dashboard/tech");
      } else {
        setError(result.error || "Failed to update user role");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const roleOptions: { value: Role; label: string; description: string }[] = [
    { value: "VIEWER", label: "Viewer", description: "Can only view content" },
    { value: "LECTURER", label: "Lecturer", description: "Can view and manage academic content" },
    { value: "PR", label: "Public Relations", description: "Can manage PR achievements and content" },
    { value: "SA", label: "Social Activity", description: "Can manage social activities" },
    { value: "TECH", label: "Technical", description: "Full administrative access" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium">{error}</div>
          <Link 
            href="/dashboard/tech"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard/tech"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit User Role</h1>
          <p className="mt-2 text-gray-600">Update the role and permissions for this user</p>
        </div>

        {/* User Info Card */}
        {user && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{user.name || "Unknown User"}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Current Role: <span className="font-medium">{user.role}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Edit Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select New Role
              </label>
              
              <div className="space-y-3">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedRole === option.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={selectedRole === option.value}
                      onChange={(e) => setSelectedRole(e.target.value as Role)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="text-red-700 text-sm">{error}</div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={saving || selectedRole === user?.role}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  saving || selectedRole === user?.role
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {saving ? "Saving..." : "Update Role"}
              </button>
              
              <Link
                href="/dashboard/tech"
                className="flex-1 py-2 px-4 text-center border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Role Permissions Info */}
        <div className="mt-6 bg-blue-50 rounded-lg p-6">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Role Permissions</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Viewer:</strong> Basic read-only access</li>
            <li>• <strong>Lecturer:</strong> Academic content management</li>
            <li>• <strong>PR:</strong> Public relations and content</li>
            <li>• <strong>SA:</strong> Social activities</li>
            <li>• <strong>Tech:</strong> Full system administration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}