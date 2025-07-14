import ActivityForm from "../../../../components/ActivityForm";

export default function CreateActivityPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create New Activity</h1>
      <ActivityForm mode="create" />
    </div>
  );
}
