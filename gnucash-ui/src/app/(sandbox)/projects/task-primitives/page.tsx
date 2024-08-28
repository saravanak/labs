'use client';
import TaskPrimitivesComponent from '@/components/projects/task-modifiers';
import { useQueryClient } from '@tanstack/react-query';

export default function TaskPrimitivesPage() {
  const queryClient = useQueryClient();
  return (
    <>
      {/* <p>Default behaviour</p>
      <TaskPrimitivesComponent
        scheduler={(tasks: any) => {
          return tasks;
        }}
      /> */}

      <p>Restartable</p>
      <TaskPrimitivesComponent
        scheduler={(tasks: any) => {
          tasks.slice(0,-1).map((v: any) => {
            queryClient.cancelQueries({
              queryKey: [v],
            });
          });
          return tasks.slice(-1);
        }}
      />
    </>
  );
}
