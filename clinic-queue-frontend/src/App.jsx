import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import AppLayout from "./components/layout/AppLayout"
import Dashboard from "./pages/Dashboard/Dashboard"
import UserList from "./pages/Users/UserList"
import PatientDashboard from "./pages/Patient/PatientDashboard"
import BookAppointment from "./pages/Patient/BookAppointment"
import MyAppointments from "./pages/Patient/MyAppointments"
import MyPrescription from "./pages/Patient/MyPrescription"
import MyReport from "./pages/Patient/MyReport"
import TodaysQueue from "./pages/Doctor/TodaysQueue"
import AddPrescription from "./pages/Doctor/AddPrescription"
import AddReport from "./pages/Doctor/AddReport"
import DailyQueue from "./pages/Receptionist/DailyQueue"


function App() {
  return(
   <BrowserRouter>
   <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<AppLayout/>}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    <Route element={<AppLayout allowedRoles={["admin"]} />}>
      <Route path="/users" element={<UserList />} />
    </Route>
    <Route element={<AppLayout allowedRoles={["patient"]} />}>
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/my-appointments" element={<MyAppointments />} />
      <Route path="/my-prescription" element={<MyPrescription />} />
      <Route path="/my-report" element={<MyReport />} />
    </Route>
    <Route element={<AppLayout allowedRoles={["doctor"]} />}>
      <Route path="/todays-queue" element={<TodaysQueue />} />
      <Route path="/add-prescription" element={<AddPrescription />} />
      <Route path="/add-report" element={<AddReport />} />
    </Route>
    <Route element={<AppLayout allowedRoles={["receptionist"]} />}>
      <Route path="/daily-queue" element={<DailyQueue />} />
    </Route>

   </Routes>
   </BrowserRouter>
  )

  
}

export default App
