"use client";

import { trpc } from "@/utils/trpc";

export default function TaslDetailPage({ params }: any) {
  const taskIdInput = { taskId: parseInt(params.task) };
  const [shelvesResult, statusesResult] = trpc.useQueries((t) => [
    t.todo.getDetailedView(taskIdInput),
    t.todo.getValidStatuses(taskIdInput),
  ]);

  return (
    <h1>
      There are {shelvesResult.data?.length}
      <ul>
        {statusesResult?.data?.map((v, index) => {
          return <li key={index}>{v}</li>;
        })}
      </ul>
    </h1>
  );
}
