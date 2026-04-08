import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import TaskModal from "../components/TaskModal";
import { DndContext } from "@dnd-kit/core";
import Column from "../components/Column";
import socket from "../socket";
import TaskDetailModal from "../components/TaskDetailModal";
import Breadcrumb from "../components/Breadcrumb";
import { useTopbar } from "../context/TopbarContext";

function Boards() {
  const { boardId } = useParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [workSpaceId, setWorkspaceId] = useState("");
  const [members, setMembers] = useState<any>([]);
  //const [isSelectedOpen, setIsSelectedOpen] = useState(false);
  const [notifications, setNotifications] = useState("");

  const [selectedTask, setSelectedTask] = useState<any>(null);

  const todo = tasks.filter((t) => t.status === "TODO");
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS");
  const review = tasks.filter((t) => t.status === "REVIEW");
  const testing = tasks.filter((t) => t.status === "TESTING");
  const done = tasks.filter((t) => t.status === "DONE");
  const [boardName, setBoardName] = useState("");
  const { setTitle } = useTopbar();

  const columns = [
    { id: "TODO", title: "TODO", data: todo },
    { id: "IN_PROGRESS", title: "IN PROGRESS", data: inProgress },
    { id: "REVIEW", title: "REVIEW", data: review },
    { id: "TESTING", title: "TESTING", data: testing },
    { id: "DONE", title: "DONE", data: done },
  ];

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/boards/${boardId}/tasks`);
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };
  const createTasks = async (
    title: string,
    description: string,
    assignedToId: string,
  ) => {
    if (!title) {
      return;
    }
    await api.post(`/boards/${boardId}/tasks`, {
      title,
      description,
      assignedToId,
      workSpaceId,
    });
    fetchTasks();
    setIsCreateOpen(false);
  };
  const getBoardDetails = async () => {
    try {
      const res = await api.get(`/boards/${boardId}`);
      setBoardName(res.data.board.name);
      setWorkspaceId(res.data.board.workspaceId);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMembers = async () => {
    try {
      const res = await api.get(`/workspaces/${workSpaceId}/members`);
      setMembers(res.data.members);
    } catch (error) {
      console.log(error);
    }
  };
  const updateStatus = async (taskId: string, status: string) => {
    try {
      await api.patch(`/boards/tasks/${taskId}/status`, {
        status,
        workSpaceId,
        boardId,
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  const reAssign = async (taskId: string, userId: string) => {
    const res = await api.patch(`/boards/tasks/${taskId}/assign`, {
      assignedToId: userId,
    });
    const updatedTask = res.data;
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === taskId ? updatedTask : t));

      setSelectedTask(updatedTask);

      return updated;
    });
    fetchTasks();
    setSelectedTask(null);
  };
  useEffect(() => {
    fetchTasks();
    getBoardDetails();
    socket.on("notification", (data) => {
      setNotifications(data.message);
      setTimeout(() => {
        setNotifications("");
      }, 3000);
      fetchTasks();
    });
    return () => {
      socket.off("notification");
    };
  }, []);
  useEffect(() => {
    fetchMembers();
    setTitle(`${boardName}`);
  }, [workSpaceId]);
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;
    await api.patch(`/boards/tasks/${taskId}/status`, {
      status: newStatus,
      workSpaceId,
      boardId,
    });
    fetchTasks();
  };
  const handleFileUpload = async (e: any, taskId: string) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post(`/boards/tasks/${taskId}/attachments`, formData);
    setTasks((prev) => {
      const updated = prev.map((t) =>
        t.id === taskId
          ? { ...t, attachments: [...(t.attachments || []), res.data] }
          : t,
      );
      setSelectedTask(updated.find((t) => t.id === taskId));

      return updated;
    });
    fetchTasks();
  };
  return (
    <div className="p-4">
      {/* 🔔 Notification */}
      {notifications && (
        <div className="fixed top-20 right-4 bg-green-100 text-black px-4 py-2 rounded shadow">
          {notifications}
        </div>
      )}
      <Breadcrumb
        items={[
          { label: "Dashboard", link: "/dashboard" },
          { label: "Workspace", link: `/workspaces/${workSpaceId}` },
          { label: "Board" },
        ]}
      />
      <h1 className="text-2xl font-bold mb-6">Board</h1>
      <button
        onClick={() => setIsCreateOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mb-4 rounded transition"
      >
        + Create Task
      </button>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-5 gap-4">
          {columns.map((col) => (
            <Column
              key={col.id}
              col={col}
              updateStatus={updateStatus}
              handleFileUpload={handleFileUpload}
              setSelectedTask={setSelectedTask}
            />
          ))}
        </div>
      </DndContext>
      {isCreateOpen && (
        <TaskModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreate={createTasks}
          members={members}
        />
      )}
      {selectedTask && (
        <TaskDetailModal
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
          updateStatus={updateStatus}
          reAssign={reAssign}
          members={members}
          handleFileUpload={handleFileUpload}
        />
      )}
    </div>
  );
}
export default Boards;
