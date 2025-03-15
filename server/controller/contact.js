import Contact from '../model/contact.js';
import User from "../model/user.js";


/**
 * Method to create a contact for a user.
 * All fields are required. 
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
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


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

    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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

    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
    res.status(200).json({ message: 'Contact successfully deleted.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};