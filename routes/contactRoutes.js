import express from "express";
import { sendContactEmail } from "../controllers/ContactController.js";
import { validateContact } from "../middleware/ValidateContact.js";

const router = express.Router();

router.post("/send", validateContact, sendContactEmail);

export default router;
