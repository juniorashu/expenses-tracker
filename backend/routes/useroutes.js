// routes/userRoutes.js
import express from 'express';
import { getUsers, syncUser } from '../controller/Usercontroller.js'; // Import getUsers only if it's used
import verifyFirebaseToken from '../middleware/verifyFirebaseToken.js'; // Middleware for Firebase Auth
import { validateUserSync } from '../middleware/validateRequest.js'; // Validation middleware

const router = express.Router();

router.get("/", getUsers); // Optional: keep only if getUsers is defined in controller

// Sync user after Firebase login/signup
router.post("/sync", verifyFirebaseToken, syncUser, validateUserSync);

export default router;
