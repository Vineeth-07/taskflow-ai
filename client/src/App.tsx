import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Workspaces from "./pages/Workspaces";
import Boards from "./pages/Boards";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import { TopbarProvider } from "./context/TopbarContext";
function App() {
  return (
    <TopbarProvider>
      <BrowserRouter>
        <Routes>
          {/*Default route*/}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth routes*/}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Dashboard routes */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workspaces/:workspaceId" element={<Workspaces />} />
            <Route path="/boards/:boardId" element={<Boards />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TopbarProvider>
  );
}
export default App;
