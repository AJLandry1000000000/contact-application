import axios from 'axios';

const BASE_URL = "http://localhost:4500/api/v1";

export const loginUser = async (email, password) => {
  try {
    const data = await axios.post(BASE_URL + `/login`, {
      email, password
    }) 

    return data;
  } catch (error) {
    console.error("Login error:", error);
  }
}

export const registerUser = async (email, password, cpassword) => {
  try {
    const data = await axios.post(BASE_URL + `/register`, {
      email, password, cpassword
    }) 
    
    return data;
  } catch (error) {
    console.error("Registration error:", error);
  }
}



