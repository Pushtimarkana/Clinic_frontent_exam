import api from "../api/axios";

// Fetch the queue for a specific date (Format: YYYY-MM-DD or full ISO string depending on backend expectations)
export const getDailyQueue = async (date) => {
  try {
    const res = await api.get(`/queue`, {
      params: { date }
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching daily queue:", error);
    throw error;
  }
};

// Update the status of a specific queue entry
export const updateQueueStatus = async (queueId, status) => {
  try {
    const res = await api.put(`/queue/${queueId}`, { status });
    return res.data;
  } catch (error) {
    console.error("Error updating queue status:", error);
    throw error;
  }
};
