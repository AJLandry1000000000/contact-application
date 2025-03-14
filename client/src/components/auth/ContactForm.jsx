"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contextApi/auth";
import { createContact } from "@/api/api";
import { useRouter } from "next/navigation";

const ContactForm = ({ formType }) => {
  const [auth] = useAuth();
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    number: "",
    address: ""
  });
  const router = useRouter();
  
  const onSuccessfulSubmission = async () => {
    router.push('/');
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
        
        console.log(`Contact created successfully: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error submitting contact: ", error);
      toast.error(`Error submitting contact: ${error}`);
    }
  };

  return (
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
      <button type="submit">Create Contact</button>
    </form>
  );
};

export default ContactForm;