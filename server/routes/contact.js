import express from 'express';
import { createContact, updateContact, viewContact, deleteContact } from '../controller/contact.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', requireSignIn, createContact);
router.put('/update/:contactId', requireSignIn, updateContact);
router.get('/view/:userId', requireSignIn, viewContact);
router.delete('/delete/:contactId', requireSignIn, deleteContact);

export default router;