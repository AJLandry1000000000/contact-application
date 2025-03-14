import express from 'express';
import { createContact, updateContact, viewContact, deleteContact } from '../controller/contact.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', requireSignIn, createContact);
// router.post('/create', createContact); // TESTING TODO: remove
router.put('/update/:contact_id', requireSignIn, updateContact);
// router.put('/update/:contactId', updateContact); // TESTING TODO: remove
router.get('/view/:userId', requireSignIn, viewContact);
// router.get('/view/:userId', viewContact); // TESTING TODO: remove
router.delete('/delete/:id', requireSignIn, deleteContact);
// router.delete('/delete/:contactId', deleteContact); // TESTING TODO: remove

export default router;