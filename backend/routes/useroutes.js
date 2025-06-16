// routes/userRoutes.js
import express from 'express';

import { getUsers,syncUser } from '../controller/Usercontroller.js'; // Optional, if you have a getUsers function
import verifyFirebaseToken  from '../middleware/verifyFirebaseToken.js' // Middleware goes in middleware/
import { validateUserSync } from '../middleware/validateRequest.js'; // Validation middleware
const router = express.Router();

// Route to get all users (optional) Usercontroller
router.get("/", getUsers); // You can remove this if getUsers is not defined

// Sync user after Firebase login/signup
router.post("/sync", verifyFirebaseToken, syncUser, validateUserSync);

export default router;
