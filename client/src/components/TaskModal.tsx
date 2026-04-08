import { useState } from "react";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, desc: string, assignedToId: string) => void;
  members: any[];
};

function TaskModal({ isOpen, onClose, onCreate, members }: Props) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [assignedToId, setAssignedToId] = useState("");
  if (!isOpen) return null;
  const handleCreate = () => {
    console.log("here");
    if (!name) return;
    console.log("here2");
    onCreate(name, desc, assignedToId);
    setName("");
    setDesc("");
    setAssignedToId("");
  };
  return (
    <div className="fixed bg-black bg-opacity-50 inset-0 flex justify-center items-center">
      <div className="bg-white shadow rounded-lg p-6 w-80">
        <h2 className="text-lg mb-4 font-bold">Create Task</h2>
        <input
          className="mb-4 p-2 w-full border rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="mb-4 p-2 w-full border rounded"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <select
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setAssignedToId(e.target.value)}
        >
          <option value="">Unassigned</option>
          {members.map((m: any) => (
            <option key={m.user.id} value={m.user.id}>
              {m.user.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded border" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-500 px-4 py-2 rounded border"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
export default TaskModal;
