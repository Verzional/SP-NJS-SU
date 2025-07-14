import Link from "next/link";
import Image from "next/image";
import { getAchievements } from "@/lib/achievement";

export default async function AchievementList() {
  const achievements = await getAchievements();

  if (achievements.length === 0) {
    return (
      <div className="text-center py-20 px-6">
        <div className="w-32 h-32 mx-auto mb-8 text-gray-300 animate-pulse">
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          No achievements yet
        </h3>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Get started by creating your first achievement and showcase your accomplishments.
        </p>
        <Link
          href="/dashboard/pr/create"
          className="inline-flex items-center px-8 py-3 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Achievement
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden backdrop-blur-sm"
        >
          <div className="relative overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
              <Image
                src={achievement.imageUrl || "/file.svg"}
                alt="Achievement"
                width={400}
                height={400}
                className="rounded-xl object-cover shadow-md group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
              {achievement.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {achievement.description}
            </p>
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(achievement.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/dashboard/pr/${achievement.id}/details`}
                className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 border border-gray-200 hover:border-gray-300"
              >
                View Details
              </Link>
              <Link
                href={`/dashboard/pr/${achievement.id}/edit`}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
