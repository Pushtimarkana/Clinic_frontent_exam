import api from "../api/axios";


export const bookAppointment = async (appointmentData) => {
  try {
    const res = await api.post("/appointments", appointmentData);
    return res.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
};

export const getPatientAppointments = async () => {
  try {
    const res = await api.get("/appointments/my"); 
    return res.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};
