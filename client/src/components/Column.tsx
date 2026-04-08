import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
function Column({ col, updateStatus, handleFileUpload, setSelectedTask }: any) {
  const { setNodeRef } = useDroppable({
    id: col.id,
  });

  return (
    <div ref={setNodeRef} className="bg-gray-100 p-3 rounded min-h-[400px]">
      <h2 className="font-bold mb-3">{col.title}</h2>

      {col.data.map((task: any) => (
        <TaskCard
          key={task.id}
          task={task}
          updateStatus={updateStatus}
          handleFileUpload={handleFileUpload}
          setSelectedTask={setSelectedTask}
        />
      ))}
    </div>
  );
}
export default Column;
