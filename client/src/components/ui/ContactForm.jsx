"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contextApi/auth";
import { createContact, updateContact } from "@/api/contactApi";
import { useRouter } from "next/navigation";
import Popup from "@/components/ui/Popup";

const ContactForm = ({ formType, initialData, onSuccess }) => {
  const [auth] = useAuth();
  const [formData, setFormData] = useState({
    _id: "",
    userId: "",
    name: "",
    number: "",
    address: ""
  });
  const [popup, setPopup] = useState({ message: "", type: "" });
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, []);

  const onSuccessfulSubmission = async () => {
    router.push('/');
    if (onSuccess) {
      onSuccess();
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, userId: auth.user._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (formType === "edit") {
        response = await updateContact(formData, auth.token);
      } else {
        response = await createContact(formData, auth.token);
      }

      if (response.status === 200) {
        onSuccessfulSubmission();
        let operation = formType === "edit" ? "updated" : "created";
        let message = `Contact ${operation} successfully!`;
        console.log(message);
        setPopup({ message: message, type: "success" });
      } else {
        let message = `Issues submitting contact: ${response.message}`;
        console.log(message)
        setPopup({ message: message, type: "error" });
      }
    } catch (error) {
      console.error("Error submitting contact: ", error.message);
      let message = `Error submitting contact: Ensure you have filled in all fields and that the number is a valid 10 digit number.`;
      setPopup({ message: message, type: "error" });
    }
  };

  return (
    <div className="contact-form">
      {popup.message && <Popup message={popup.message} type={popup.type} onClose={() => setPopup({ message: "", type: "" })} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Number:</label>
          <input type="text" name="number" value={formData.number} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <button type="submit">
          {formType === "edit" ? "Update Contact" : "Create Contact"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;