import React, { useState, useEffect } from "react";
import { 
  Typography, 
  Container, 
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress
} from "@mui/material";
import { getPatientAppointments } from "../../services/appointmentService";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getPatientAppointments();
        setAppointments(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message || "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary" sx={{ mb: 4 }}>
        My Appointments
      </Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Doctor/Clinic</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Time</strong></TableCell>
                <TableCell><strong>Token No.</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" color="error">
                    {error}
                  </TableCell>
                </TableRow>
              ) : appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No appointments found.</TableCell>
                </TableRow>
              ) : (
                appointments.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell>{appt.clinicId || 'N/A'}</TableCell>  
                    <TableCell>{appt.department || 'General'}</TableCell> 
                    <TableCell>{new Date(appt.appointmentDate).toLocaleDateString()}</TableCell>
                    <TableCell>{appt.timeSlot}</TableCell>
                    <TableCell>
                      {appt.queueEntry?.tokenNumber ? (
                        <Typography variant="body2" fontWeight="bold">
                          #{appt.queueEntry.tokenNumber}
                        </Typography>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                        <Typography variant="body2" color={
                          appt.queueEntry?.status === 'waiting' ? 'warning.main' :
                          appt.queueEntry?.status === 'consulting' ? 'info.main' :
                          appt.queueEntry?.status === 'completed' ? 'success.main' : 
                          appt.status === 'confirmed' ? 'success.main' : 
                          appt.status === 'queued' ? 'info.main' : 'textSecondary'
                        } sx={{ textTransform: 'capitalize' }}>
                          {appt.queueEntry?.status || appt.status}
                        </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default MyAppointments;
