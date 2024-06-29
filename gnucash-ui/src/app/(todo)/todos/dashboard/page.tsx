import SharedSpaceListing from "@/components/todo/shared-space-listing";
import SpaceListing from "@/components/todo/space-listing";
import TodoListing from "@/components/todo/todo-listing";

export default function TodosPage() {
  return (
    <>
      <TodoListing />
      <SpaceListing />
      <SharedSpaceListing />
    </>
  );
}
