"use client";
import React from "react";
import { Footer } from "@/components/footer/Footer";
import ContactForm from "./ContactForm";

const ContactCreator = () => {

  return (
    <div className="auth">
      <h1>Create Contact</h1>
      <ContactForm formType="create" />
      <Footer />
    </div>
  );
};

export default ContactCreator;
