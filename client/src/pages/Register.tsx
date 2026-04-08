import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });
      //const user = res.data.user;
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-80 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <input
          className="w-full p-2 mb-3 border rounded"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="w-full p-2 mb-3 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="w-full p-2 mb-3 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
