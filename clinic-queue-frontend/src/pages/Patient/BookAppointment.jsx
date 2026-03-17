import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  MenuItem, 
  Button,
  Grid,
  Alert
} from "@mui/material";
import { bookAppointment } from "../../services/appointmentService";

const TIME_SLOTS = [
  "09:00-09:15",
  "09:15-09:30",
  "09:30-09:45",
  "09:45-10:00",
  "10:00-10:15",
  "10:15-10:30",
  "10:30-10:45",
  "10:45-11:00",
  "11:00-11:15",
  "11:15-11:30",
  "11:30-11:45",
  "11:45-12:00",
  "14:00-14:15",
  "14:15-14:30",
  "14:30-14:45",
  "14:45-15:00",
  "15:00-15:15",
  "15:15-15:30",
  "15:30-15:45",
  "15:45-16:00",
  "16:00-16:15",
  "16:15-16:30",
  "16:30-16:45",
  "16:45-17:00"
];

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: ""
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      const payload = {
        appointmentDate: formData.date,
        timeSlot: formData.timeSlot
      };
      const res = await bookAppointment(payload);
      const tokenMsg = res?.queueEntry?.tokenNumber ? ` Your Token Number is #${res.queueEntry.tokenNumber}.` : "";
      setStatus({ type: "success", message: `Appointment requested successfully for ${formData.date} at ${formData.timeSlot}.${tokenMsg}` });
      setFormData({ date: "", timeSlot: "" });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: error.response?.data?.message || "Failed to book appointment. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom color="primary">
          Book an Appointment
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 4 }}>
          Please select your preferred date and time slot.
        </Typography>

        {status.message && (
          <Alert severity={status.type} sx={{ mb: 3 }}>
            {status.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Appointment Date */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Appointment Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            {/* Time Slot */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Time Slot"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                required
              >
                {TIME_SLOTS.map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? "Booking..." : "Book Now"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default BookAppointment;
