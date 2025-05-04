import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ search: "" });

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Stats Error:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Users Error:", err);
    }
  };

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stores", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(res.data);
    } catch (err) {
      console.error("Stores Error:", err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newUser = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      address: form.address.value,
      role: form.role.value,
    };

    try {
      await axios.post("http://localhost:5000/api/admin/users", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      form.reset();
      fetchUsers();
    } catch (err) {
      console.error("Add User Error:", err);
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newStore = {
      name: form.name.value,
      email: form.email.value,
      address: form.address.value,
    };

    try {
      await axios.post("http://localhost:5000/api/admin/stores", newStore, {
        headers: { Authorization: `Bearer ${token}` },
      });
      form.reset();
      fetchStores();
    } catch (err) {
      console.error("Add Store Error:", err);
    }
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).join(" ").toLowerCase().includes(filters.search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* Stats */}
      <div style={{ marginBottom: "20px" }}>
        <p><strong>Total Users:</strong> {stats.users}</p>
        <p><strong>Total Stores:</strong> {stats.stores}</p>
        <p><strong>Total Ratings:</strong> {stats.ratings}</p>
      </div>

      {/* Add New User */}
      <h3>Add New User</h3>
      <form onSubmit={handleAddUser} style={{ marginBottom: "20px" }}>
        <input name="name" placeholder="Name" required />
        <input name="email" placeholder="Email" required />
        <input name="password" placeholder="Password" type="password" required />
        <input name="address" placeholder="Address" />
        <select name="role">
          <option value="user">Normal User</option>
          <option value="admin">System Admin</option>
          <option value="owner">Store Owner</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      {/* Add New Store */}
      <h3>Add New Store</h3>
      <form onSubmit={handleAddStore} style={{ marginBottom: "20px" }}>
        <input name="name" placeholder="Store Name" required />
        <input name="email" placeholder="Email" required />
        <input name="address" placeholder="Address" required />
        <button type="submit">Add Store</button>
      </form>

      {/* User Search + Table */}
      <h2>User List</h2>
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        style={{ marginBottom: "10px" }}
      />
      <table border="1" cellPadding="8" style={{ marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Store List Table */}
      <h2>Store List</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
