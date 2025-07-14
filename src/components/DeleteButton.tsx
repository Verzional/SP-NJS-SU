import { deleteUser } from "@/lib/user";

export async function DeleteButton({ userId }: { userId: string }) {
  async function handleDelete() {
    "use server";
    await deleteUser(userId);
  }

  return (
    <form action={handleDelete}>
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
      >
        Delete
      </button>
    </form>
  );
}