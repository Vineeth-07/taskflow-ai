import { useDraggable } from "@dnd-kit/core";

function TaskCard({ task, setSelectedTask }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-3 mb-3 rounded-xl shadow-sm
       hover:shadow-md transition border border-gray-100 
       flex justify-between items-start group"
    >
      <div
        onClick={() => setSelectedTask(task)}
        className="cursor-pointer flex-1"
      >
        <div className="font-medium text-gray-800 hover:text-blue-600">
          {task.title}
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span className="px-2 py-0.5 bg-gray-100 rounded-full truncate max-w-[70%">
            {task.status}
          </span>

          {task.attachments?.length > 0 && (
            <span className="flex items-center gap-1 shrink-0">
              📎 {task.attachments.length}
            </span>
          )}
        </div>
      </div>
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab text-gray-400 hover:text-gray-600 
        text-sm ml-2 opacity-0 group-hover:opacity-100 transition"
      >
        ⠿
      </div>
    </div>
  );
}
export default TaskCard;
