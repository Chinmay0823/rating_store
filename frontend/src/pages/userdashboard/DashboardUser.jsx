import { useEffect, useState } from 'react';
import './DashboardUser.css';

const DashboardUser = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Replace with real API call
    setStores([
      { id: 1, name: 'Alpha Mart', email: 'alpha@store.com', address: 'New York', averageRating: 4.2 },
      { id: 2, name: 'Beta Store', email: 'beta@store.com', address: 'LA', averageRating: 3.8 },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStore && rating > 0 && rating <= 5) {
      alert(`Rating ${rating} submitted for store ID ${selectedStore}`);
      // POST to backend here
    }
  };

  return (
    <div className="user-dashboard">
      <h1>Welcome, User!</h1>
      <div className="store-list">
        {stores.map((store) => (
          <div key={store.id} className="store-card">
            <h3>{store.name}</h3>
            <p>Email: {store.email}</p>
            <p>Address: {store.address}</p>
            <p>Avg. Rating: {store.averageRating}</p>
            <button onClick={() => setSelectedStore(store.id)}>Rate This Store</button>
          </div>
        ))}
      </div>

      {selectedStore && (
        <form className="rating-form" onSubmit={handleSubmit}>
          <h2>Submit Rating for Store #{selectedStore}</h2>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <button type="submit">Submit Rating</button>
        </form>
      )}
    </div>
  );
};

export default DashboardUser;
