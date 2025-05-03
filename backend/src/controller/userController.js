const User = require('../models/userModel.js');

const createUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    address,
    role,
  });

  res.status(201).json(newUser);
};

module.exports = { createUser };
