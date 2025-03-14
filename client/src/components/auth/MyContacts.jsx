"use client";
import React, { useState, useEffect } from "react";
import { Footer } from "@/components/footer/Footer";
import { useAuth } from "@/contextApi/auth";
import { fetchContacts } from "@/api/api";

const MyContacts = () => {
  const [modal, setModal] = useState(false);
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

  const openModal = () => {
    setModal(true);
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
                  <button className="edit" onClick={() => openModal()}>
                    Edit{" "}
                  </button>
                  {modal === true && (
                      <h1>Update Contact page</h1>
                  )}
                  <button
                    className="delete"
                    onClick={() => {}}
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
    </div>
  );
};

export default MyContacts;




