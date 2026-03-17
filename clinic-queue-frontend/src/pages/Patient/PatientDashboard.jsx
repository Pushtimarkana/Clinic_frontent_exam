import React from "react";
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress
} from "@mui/material";
import { getPatientAppointments } from "../../services/appointmentService";

const MOCK_REPORTS = [
  { id: 101, title: "Blood Test Results", date: "2023-10-15", doctor: "Dr. Adams" },
  { id: 102, title: "X-Ray Report", date: "2023-09-02", doctor: "Dr. Smith" },
];

const PatientDashboard = () => {
  const [appointments, setAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getPatientAppointments();
        // Assuming API returns an array or an object with a data property
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
        Patient Dashboard
      </Typography>

      <Grid container spacing={4}>
        
        {/* Appointments Section */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2" color="primary">
                My Upcoming Appointments
              </Typography>
              <Button variant="outlined" size="small" href="/my-appointments">
                View All
              </Button>
            </Box>
            
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell><strong>Doctor</strong></TableCell>
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
                      <TableCell colSpan={6} align="center">No upcoming appointments found.</TableCell>
                    </TableRow>
                  ) : (
                    appointments.map((appt) => (
                      <TableRow key={appt.id}>
                        <TableCell>{appt.clinicId || 'N/A'}</TableCell>  {/* Replace with clinic/doctor info if populated by API */}
                        <TableCell>{appt.department || 'General'}</TableCell> {/* Replace if applicable */}
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
        </Grid>

        {/* Reports Section */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2" color="primary">
                My Recent Reports
              </Typography>
              <Button variant="outlined" size="small" href="/my-report">
                View All
              </Button>
            </Box>
            
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell><strong>Report Title</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Doctor</strong></TableCell>
                    <TableCell align="right"><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MOCK_REPORTS.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.doctor}</TableCell>
                      <TableCell align="right">
                        <Button size="small" variant="text" color="primary">Download</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                   {MOCK_REPORTS.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No recent reports found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
};

export default PatientDashboard;
