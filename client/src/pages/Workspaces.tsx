import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import BoardModal from "../components/BoardModal";
import Breadcrumb from "../components/Breadcrumb";
import { useTopbar } from "../context/TopbarContext";

function Workspaces() {
  const { workspaceId } = useParams();
  const [boards, setBoards] = useState<any[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [activities, setActivities] = useState<any>([]);
  const { setTitle } = useTopbar();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchBoards = async () => {
    try {
      const res = await api.get(`/workspaces/${workspaceId}/boards`);
      setBoards(res.data.boards);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchWorkSpaceDetails = async () => {
    try {
      const resWorkspace = await api.get("/workspaces");
      const currentWorkspace = resWorkspace.data.workspaces.find(
        (ws: any) => ws.id === workspaceId,
      );
      setName(currentWorkspace.name);
      setRole(currentWorkspace?.members[0]?.role || "ADMIN");
    } catch (error) {
      console.log(error);
    }
  };
  const createBoards = async (name: String) => {
    if (!name) return;
    await api.post(`/workspaces/${workspaceId}/boards`, { name });
    fetchBoards();
    setIsCreateOpen(false);
  };
  useEffect(() => {
    fetchBoards();
    fetchWorkSpaceDetails();
    fetchActivities();
  }, []);
  useEffect(() => {
    setTitle(`${name}`);
  }, [name]);

  const handleInviteUser = async () => {
    if (!email) {
      return;
    }
    await api.post(`/workspaces/${workspaceId}/members`, { email });
    setEmail("");
  };

  const fetchActivities = async () => {
    try {
      const res = await api.get(`/workspaces/${workspaceId}/activity`);
      setActivities(res.data.activities);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <Breadcrumb
        items={[
          { label: "Dashboard", link: "/dashboard" },
          { label: "Workspace" },
        ]}
      />
      {/* header */}
      <h1 className="text-2xl font-bold mb-6">Boards</h1>
      <button
        onClick={() => setIsCreateOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mb-4 rounded transition"
      >
        + Create Board
      </button>
      {role === "ADMIN" && (
        <div className="mb-4 flex gap-2">
          <input
            className="p-2 rounded border"
            type="email"
            placeholder="Invite by email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleInviteUser}
            className="bg-green-500 text-white px-3 rounded"
          >
            Invite
          </button>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => (
          <div
            key={board.id}
            className="bg-white shadow p-4 rounded-xl hover:shadow-lg cursor-pointer"
            onClick={() => {
              navigate(`/boards/${board.id}`);
            }}
          >
            {board.name}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="font-bold mb-3">Activity</h2>

        {activities.map((a: any) => (
          <div key={a.id} className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">{a.user.name}</span> {a.message}
          </div>
        ))}
      </div>
      {isCreateOpen && (
        <BoardModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreateBoard={createBoards}
        />
      )}
    </div>
  );
}
export default Workspaces;
