"use client";
import { trpc } from "@/utils/trpc";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function TodoListing() {
  const [ownTodos] = trpc.useQueries((t) => [
    t.todo.getOwnTodos(),    
  ]
  );
  console.log(ownTodos?.data);

  if (ownTodos?.error) {
    return <h1> Please login</h1>;
  }
  const router = useRouter();
  //   trpc.todo
  let components = <></>;
  if (ownTodos.data) {
    const  todos  = ownTodos.data;

    if (todos?.length == 0) {
      return (
        <div>
          you have no todos
          <Button onClick={() => {}}>Click here to create some!</Button>{" "}
        </div>
      );
    }

    const columns: ColumnDef<Todo> = [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "owner_name",
        header: "Owner",
      },
      {
        accessorKey: "space_name",
        header: "Space",
      },
    ];

    return (
      <div className="grid grid-cols-2">
        <DataTable columns={columns} data={todos} onRowClick={(row) => router.push(`./todos/${row.original.task_id}`)}/>
      </div>
    );
  }

  return <>{components}</>;
}

