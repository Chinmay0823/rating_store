const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db.js');

const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const storeRoutes = require('./routes/storeRoutes.js');
const ratingRoutes = require('./routes/ratingRoutes.js');
const ownerRoutes = require('./routes/ownerRoutes.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', storeRoutes);
app.use('/api', ratingRoutes);
app.use('/api', ownerRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });
});
