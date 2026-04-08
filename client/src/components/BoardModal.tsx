import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreateBoard: (name: string) => void;
};

function BoardModal({ isOpen, onClose, onCreateBoard }: Props) {
  const [name, setName] = useState("");
  if (!isOpen) return null;
  const handleCreate = () => {
    if (!name) return;
    onCreateBoard(name);
    setName("");
  };
  return (
    <div className="fixed bg-black bg-opacity-50 inset-0 flex justify-center items-center">
      <div className="bg-white shadow rounded p-6 w-80">
        <h2 className="text-lg font-bold mb-4">Create Board</h2>
        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Board name"
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
export default BoardModal;
