import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTopbar } from "../context/TopbarContext";
import api from "../services/api";
function Topbar() {
  const navigate = useNavigate();
  const { title } = useTopbar();
  const [name, setName] = useState("");
  const fetchUser = async () => {
    try {
      const res = await api.get("/user/profile");
      setName(res.data.user.name);
    } catch (error) {
      console.log("error in fetching user details");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex justify-between items-center h-14 px-6 shadow-sm border-b bg-white">
      <div className="text-lg font-semibold">{title}</div>
      <div
        onClick={() => navigate("/profile")}
        className="w-9 h-9 rounded-full bg-blue-500 text-white flex 
        items-center justify-center cursor-pointer"
      >
        {name[0]}
      </div>
    </div>
  );
}
export default Topbar;
