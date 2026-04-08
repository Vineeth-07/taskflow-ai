import { useEffect, useState } from "react";
import { Pencil, Lock } from "lucide-react";
import api from "../services/api";

function Profile() {
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [email, setEmail] = useState("");

  const fetchUser = async () => {
    try {
      const res = await api.get("/user/profile");
      setName(res.data.user.name);
      setEmail(res.data.user.email);
    } catch (error) {
      console.log("error in fetching user details");
    }
  };

  const handleUpdate = async () => {
    try {
      await api.post("/user/profile", {
        updatedName: name,
      });
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
    fetchUser();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {/* Card */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h1 className="text-xl font-semibold mb-6">Profile Settings</h1>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
            {name[0]}
          </div>

          <div>
            <p className="text-lg font-medium">{name}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>

        {/* Name */}
        <div className="mb-6">
          <label className="text-sm text-gray-500">Full Name</label>

          <div className="flex items-center justify-between border rounded-lg px-3 py-2 mt-1">
            {isEditing ? (
              <input
                className="w-full outline-none"
                value={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p>{name}</p>
            )}

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-black ml-3"
              >
                <Pencil size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Email (Read-only) */}
        <div className="mb-8">
          <label className="text-sm text-gray-500">Email</label>

          <div className="flex items-center justify-between border rounded-lg px-3 py-2 mt-1 bg-gray-50">
            <p className="text-gray-700">{email}</p>

            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Lock size={14} />
              <span>Locked</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center border-t pt-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>

          {isEditing && (
            <button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm"
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
