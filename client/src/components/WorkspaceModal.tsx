import { useState } from "react";

type Props = {
  isCreateOpen: boolean;
  onClose: () => void;
  onCreate: (name: String) => void;
};
function WorkspaceModal({ isCreateOpen, onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  if (!isCreateOpen) return null;

  const handleCreate = () => {
    if (!name) return;
    onCreate(name);
    setName("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-lg font-bold mb-4"> Create Workspace</h2>
        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Workspace name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
export default WorkspaceModal;
