import api from "../api/axios";

// Get all users
export const getAllUsers = async () => {
  try {
    const res = await api.get("/admin/users");
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};



//  Create user
export const createUser = async (userData) => {
  try {
    const res = await api.post("/admin/users", userData);
    return res.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};