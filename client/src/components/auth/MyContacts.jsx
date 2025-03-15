"use client";
import React, { useState, useEffect } from "react";
import { Footer } from "@/components/footer/Footer";
import { useAuth } from "@/contextApi/auth";
import { fetchContacts, deleteContact } from "@/api/contactApi";
import ContactForm from "./ContactForm";
import CustomModal from "./CustomModal";

const MyContacts = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactData, setContactData] = useState([]);
  const [auth] = useAuth();

  const getContacts = async () => {
    if (auth.user) {
      try {
        const data = await fetchContacts(auth.user._id, auth.token);
        setContactData(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const openModal = (contact) => {
    setSelectedContact(contact);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedContact(null);
    setModalIsOpen(false);
    getContacts();
  }

  const deleteContactOperation = async (contact) => {
    if (!auth.user) {
      return;
    }
    
    try {
      let response = await deleteContact(contact._id, auth.token);
      getContacts();

      if (response.status === 200) {
        console.log(`Contact deleted successfully!`);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="profile">
      <h2>My Contacts</h2>
      {contactData.length > 0 ? (
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {contactData.map((c) => {
            return (
              <tr key={c._id}>
                <td>{c.name}</td>

                <td>{c.number}</td>
                <td>{c.address}</td>
                <td className="btn">
                  <button className="edit" onClick={() => openModal(c)}>
                    Edit{" "}
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteContactOperation(c)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", color: "black" }}>
          No data added yet!!{" "}
        </p>
      )}
      <Footer />
      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <h2>Edit Contact</h2>
        {selectedContact && (
          <ContactForm formType="edit" initialData={selectedContact} onSuccess={closeModal} />
        )}
      </CustomModal>
    </div>
  );
};

export default MyContacts;




