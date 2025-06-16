// middleware/validateRequest.js
export const validateUserSync = (req, res, next) => {
  const { uid, email } = req.body;
  
  if (!uid || !uid.match(/^[a-zA-Z0-9_-]{28}$/)) {
    return res.status(400).json({ error: "Invalid Firebase UID" });
  }

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  next();
};
export default validateUserSync;