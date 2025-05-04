import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../auth/AuthContext";

export default function UserDashboard() {
  const { token } = useAuth();
  const [stores, setStores] = useState([]);
  const [ratingInputs, setRatingInputs] = useState({});

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stores", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(res.data);
    } catch (err) {
      console.error("Fetch stores error:", err);
    }
  };

  const handleRatingSubmit = async (storeId) => {
    const rating = ratingInputs[storeId];
    if (!rating || rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/stores/${storeId}/rate`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Rating submitted!");
      fetchStores(); // Refresh store ratings
    } catch (err) {
      console.error("Submit rating error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Store Ratings</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Store</th><th>Email</th><th>Address</th><th>Rating</th><th>Rate Store</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.rating?.toFixed(1) || "No ratings"}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={ratingInputs[store.id] || ""}
                  onChange={(e) =>
                    setRatingInputs({ ...ratingInputs, [store.id]: e.target.value })
                  }
                  style={{ width: "60px" }}
                />
                <button onClick={() => handleRatingSubmit(store.id)}>Submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
