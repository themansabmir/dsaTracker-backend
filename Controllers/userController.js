const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel"); // Assuming your User model is in a separate file

const userController = {
  // Register a new user
  registerUser: async (req, res) => {
    try {
      // Check if the username or email is already in use
      const existingUser = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email is already in use" });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      res.status(201).json({ data: savedUser });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Log in a user
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ username });

      // Check if the user exists and the password is correct
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate a JSON Web Token (JWT) for authentication
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Update a user's profile
  updateProfile: async (req, res) => {
    try {
      const userId = req.params.userId;
      const updatedData = req.body;

      // Update the user's profile data
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Delete a user's profile
  deleteProfile: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Find and remove the user by ID
      const deletedUser = await User.findByIdAndRemove(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = userController;
