import ActivityForm from "../../../../../ui/ActivityForm";
import { getActivityById } from "@/lib/activity";
import { notFound } from "next/navigation";

export default async function EditActivityPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = await params.id;
  const activity = await getActivityById(id);

  if (!activity) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Activity</h1>
      <ActivityForm mode="edit" activity={activity} />
    </div>
  );
}
