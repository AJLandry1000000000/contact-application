import axios from 'axios';

const BASE_URL = "http://localhost:4500/api/v1/";

export const fetchContacts = async (userId, token) => {
  try {
    console.log(`userId: ${userId}`)
    const response = await axios.get(BASE_URL + `view/${userId}`, {
      headers: {
        Authorization: token,
      }
    });

    return response.data
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};

export const createContact = async (contactData, token) => {
  try {
    const response = await axios.post(BASE_URL + "/create", contactData, {
      headers: {
        Authorization: token,
      }
    });

    return response;
  } catch (error) {
    console.error("Error creating contact:", error);
  }
}