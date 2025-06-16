// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  profileCompleted: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

export default User;