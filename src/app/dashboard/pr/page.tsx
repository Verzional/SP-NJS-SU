import Link from "next/link";
import AchievementList from "@/components/AchievementList";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Suspense } from "react";

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
          <p className="text-gray-600 mt-2">Manage and view all achievements</p>
        </div>
        <Link
          href="/dashboard/pr/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
        >
          Create New Achievement
        </Link>
      </div>

      <Suspense fallback={<SkeletonLoader />}>
        <AchievementList />
      </Suspense>
    </div>
  );
}
