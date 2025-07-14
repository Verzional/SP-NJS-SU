import AchievementForm from "@/components/AchievementForm";
import { getAchievementById } from "@/lib/achievement";
import { notFound } from "next/navigation";

export default async function EditActivityPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = await params.id;
  const achievement = await getAchievementById(id);

  if (!achievement) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create New Achievement</h1>
      <AchievementForm mode="edit" data={achievement} />
    </div>
  );
}
