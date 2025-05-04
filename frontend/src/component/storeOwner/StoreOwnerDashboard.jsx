import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../auth/AuthContext";


const StoreOwnerDashboard = () => {
  const { token } = useAuth();
  const [store, setStore] = useState(null);

  useEffect(() => {
    fetchMyStore();
    // eslint-disable-next-line
  }, []);

  const fetchMyStore = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/owner/my-store", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStore(res.data);
    } catch (err) {
      console.error("Error fetching store:", err);
    }
  };

  if (!store) {
    return <p className="loading">Loading store details...</p>;
  }

  return (
    <div className="store-dashboard">
      <h1>My Store Dashboard</h1>

      <div className="store-info">
        <p><strong>Name:</strong> {store.name}</p>
        <p><strong>Email:</strong> {store.email}</p>
        <p><strong>Address:</strong> {store.address}</p>
        <p><strong>Average Rating:</strong> {store.rating?.toFixed(1) || "No ratings yet"}</p>
      </div>

      {store.ratings && store.ratings.length > 0 ? (
        <>
          <h3>Customer Ratings</h3>
          <table className="ratings-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Rating</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {store.ratings.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.userName}</td>
                  <td>{r.rating}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No ratings submitted yet.</p>
      )}
    </div>
  );
};

export default StoreOwnerDashboard;
