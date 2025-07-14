import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-xl text-center">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">
          Unauthorized
        </h1>
        <p className="text-gray-700 mb-6">
          You do not have the necessary permissions to access this page.
        </p>
        <Link
          href="/"
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
