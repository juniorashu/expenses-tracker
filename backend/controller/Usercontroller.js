// controllers/userController.js
import User from '../models/User.js';

export const syncUser = async (req, res) => {
  try {
    const { uid, email } = req.user;

    if (!uid || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already exists by email (unique field)
    let user = await User.findOne({ email });

    if (user) {
      // Update Firebase ID if it's different (optional)
      if (user.firebaseId !== uid) {
        user.firebaseId = uid;
      }
      user.lastLogin = new Date();
      await user.save();
      return res.status(200).json(user);
    }

    // New user
    user = new User({
      firebaseId: uid,
      email,
      createdAt: new Date(),
      lastLogin: new Date(),
    });

    await user.save();
    return res.status(201).json(user);

  } catch (error) {
    console.error('Error syncing user:', error);
    return res.status(500).json({ error: "Failed to sync with database", details: error.message });
  }
};


// usercontroller.js
export const getUsers = (req, res) => {
  // Your logic to fetch users from DB or return sample data
  res.json({ message: "Users fetched successfully", users: [] });
};
