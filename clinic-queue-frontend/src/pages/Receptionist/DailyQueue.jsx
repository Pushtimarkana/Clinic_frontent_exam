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
  CircularProgress,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  Alert
} from "@mui/material";
import { getDailyQueue, updateQueueStatus } from "../../services/queueService";

const DailyQueue = () => {
  // Setup date correctly for local timezone rendering to an input
  const getTodayString = () => {
      const today = new Date();
      const offset = today.getTimezoneOffset()
      const localDate = new Date(today.getTime() - (offset*60*1000))
      return localDate.toISOString().split('T')[0]
  }

  const [date, setDate] = useState(getTodayString());
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateStatus, setUpdateStatus] = useState({ type: "", message: "" });
  const [processingId, setProcessingId] = useState(null);

  const fetchQueue = async (selectedDate) => {
    setLoading(true);
    setError(null);
    setUpdateStatus({ type: "", message: "" });
    try {
      const data = await getDailyQueue(selectedDate);
      setQueue(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError("Failed to fetch queue for selected date.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue(date);
  }, [date]);

  const handleStatusChange = async (queueId, newStatus) => {
    setProcessingId(queueId);
    setUpdateStatus({ type: "", message: "" });
    try {
      const updatedEntry = await updateQueueStatus(queueId, newStatus);
      // Update local state to reflect the change immediately
      setQueue(prevQueue => prevQueue.map(item => 
        item.id === queueId ? { ...item, status: newStatus } : item
      ));
      setUpdateStatus({ type: "success", message: `Queue entry #${updatedEntry?.tokenNumber || queueId} updated successfully.` });
    } catch (err) {
      setUpdateStatus({ type: "error", message: "Failed to update status." });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" color="primary">
          Daily Queue
        </Typography>
        <TextField
          type="date"
          label="Select Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </Box>

      {updateStatus.message && (
        <Alert severity={updateStatus.type} sx={{ mb: 3 }}>
          {updateStatus.message}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3 }}>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Token No.</strong></TableCell>
                <TableCell><strong>Patient Name</strong></TableCell>
                <TableCell><strong>Patient Phone</strong></TableCell>
                <TableCell><strong>Time Slot</strong></TableCell>
                <TableCell><strong>Queue Status</strong></TableCell>
                <TableCell><strong>Update Status</strong></TableCell>
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
              ) : queue.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No queue entries found for this date.</TableCell>
                </TableRow>
              ) : (
                queue.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        #{entry.tokenNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>{entry.appointment?.patient?.name || 'Unknown'}</TableCell>  
                    <TableCell>{entry.appointment?.patient?.phone || 'Unknown'}</TableCell> 
                    <TableCell>{entry.appointment?.timeSlot || 'N/A'}</TableCell>
                    <TableCell>
                        <Typography variant="body2" color={
                          entry.status === 'waiting' ? 'warning.main' :
                          entry.status === 'in_progress' || entry.status === 'consulting' ? 'info.main' :
                          entry.status === 'completed' ? 'success.main' : 'textSecondary'
                        } sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                          {entry.status.replace("_", " ")}
                        </Typography>
                    </TableCell>
                    <TableCell>
                      <FormControl size="small" fullWidth disabled={processingId === entry.id}>
                        <Select
                          value={entry.status}
                          onChange={(e) => handleStatusChange(entry.id, e.target.value)}
                          displayEmpty
                        >
                          <MenuItem value="waiting">Waiting</MenuItem>
                          <MenuItem value="in_progress">In Progress</MenuItem>
                          <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                      </FormControl>
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

export default DailyQueue;
