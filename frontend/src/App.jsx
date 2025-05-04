import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import AdminDashboard from "./pages/DashboardAdmin";
import UserDashboard from "./pages/userdashboard/DashboardUser";
import { AuthProvider } from "./auth/AuthContext";
import StoreOwnerDashboard from "./component/storeOwner/StoreOwnerDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/owner" element={<StoreOwnerDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
