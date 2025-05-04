// routes/owner.js
const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");
const Store = require("../models/storeModel");
const Rating = require("../models/ratingModel");
const User = require("../models/userModel");

router.get("/my-store", authenticateToken, authorizeRole(["owner"]), async (req, res) => {
  try {
    const ownerId = req.user.id;

    const store = await Store.findOne({
      where: { ownerId },
      include: [
        {
          model: Rating,
          include: [{ model: User, attributes: ["name"] }],
        },
      ],
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Format rating output
    const ratings = store.Ratings?.map((r) => ({
      userName: r.User.name,
      rating: r.rating,
      createdAt: r.createdAt,
    })) || [];

    res.json({
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      rating: store.rating,
      ratings,
    });
  } catch (err) {
    console.error("Error in /my-store:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
