import Contact from '../model/contact.js';
import User from "../model/user.js";


/**
 * Method to create a contact for a user.
 * All fields are required. 
 * Only the user can create contacts for themself. This is verified by checking the userId in the request against the userId identified by the JWT.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const createContact = async (req, res) => {
  try {    
    const { userId, name, number, address } = req.body;
    
    // Validate the contact fields are all present. 
    if (!userId || !name || !number || !address) {
      return res.status(400).json({ message: "Please fill in all the contact fields." });
    }
    
    // Ensure the request is coming from the user it is modifying.
    if (req.user._id !== userId) {
      return res.status(403).json({ message: "You are not authorized to create a contact for this user." });
    }

    // Since number is a Number type in the schema, I will assume any 10 digit number is valid.
    const validNumberRegex = /^\d{10,}$/;
    if (!validNumberRegex.test(number)) {
      return res.status(400).json({ message: "Please enter a valid 10 digit phone number." });
    }

    /*
    // Check the number is a valid Australian number.
    const australianPhoneNumberRegex = /^((\+61\s?\d{1,4}\s?\d{1,4}\s?\d{1,4})|(02\d{2}\s?\d{3}\s?\d{3})|(04\d{2}\s?\d{3}\s?\d{3}))$/;
    if (!australianPhoneNumberRegex.test(number)) {
      return res.status(400).json({ message: "Please enter a valid Australian phone number." });
    }\
    */

    // Check if the user exists.
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check that if the new contact already exists.
    const existingContact = await Contact.findOne({ userId, name, number });
    if (existingContact) {
      return res.status(200).json({ message: "Contact already exists." });
    }

    const contact = new Contact({ userId, name, number, address });
    await contact.save();
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Method to update an existing contact for a user.
 * All fields are required. 
 * Only the user can update their own contacts. This is verified by checking the userId in the request against the userId identified by the JWT.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const updateContact = async (req, res) => {
  try {
    const contactId = req.params.contactId
    const { userId, name, number, address } = req.body;

    // Validate the contact fields are all present. 
    if (!contactId || !userId || !name || !number || !address) {
      return res.status(400).json({ message: "Please fill in all the contact fields." });
    }

    // Ensure the request is coming from the user it is modifying.
    if (req.user._id !== userId) {
      return res.status(403).json({ message: "You are not authorized to update a contact for this user." });
    }

    // Since number is a Number type in the schema, I will assume any 10 digit number is valid.
    const validNumberRegex = /^\d{10,}$/;
    if (!validNumberRegex.test(number)) {
      return res.status(400).json({ message: "Please enter a valid 10 digit phone number." });
    }

    // Check if the user exists.
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    
    // Check that if the  new contact already exists.
    const existingContact = await Contact.findOne({ userId, name, number });
    if (existingContact) {
      return res.status(200).json({ message: "Contact already exists." });
    }

    // Update the contact.
    const updatedContact = { userId, name, number, address };
    const contact = await Contact.findByIdAndUpdate(contactId, updatedContact, { new: true });
    if (!contact) {
      return res.status(404).json({ message: 'Existing contact not found.' });
    }

    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Method to view all contacts for a user.
 * All fields are required.
 * Only the user can view their own contacts. This is verified by checking the userId in the request against the userId identified by the JWT.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const viewContact = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "Please provide a user ID." });
    }

    // Ensure the request is coming from the user it is modifying.
    if (req.user._id !== userId) {
      return res.status(403).json({ message: "You are not authorized to view contacts for this user." });
    }
  

    const contact = await Contact.find({ userId });

    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Method to delete a contact for a user.
 * All fields are required.
 * Only the user can delete their own contacts. This is verified by checking the userId in the contact requested for deletion, against the userId identified by the JWT.
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    if (!contactId) {
      return res.status(400).json({ message: "Please provide a contact ID." });
    }

    // Find the contact to get the userId.
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    // Ensure the request is coming from the user it is modifying.
    if (req.user._id !== contact.userId) {
      return res.status(403).json({ message: "You are not authorized to delete a contact for this user." });
    }

    await Contact.findByIdAndDelete(contactId);
    return res.status(200).json({ message: 'Contact successfully deleted.' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};