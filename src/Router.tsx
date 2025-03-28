import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import EmployeeDataTable from "./components/EmployeeDataTable";
import React from "react";
import RegisterForm from "./components/RegisterForm";

import TicketDataTable from "./components/TicketDataTable";
import TicketsForm from "./components/TicketsForm";
import LoginForm from "./components/LoginForm";
import DashBoard from "./components/DashBoard";

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/EmployeeData" element={<EmployeeDataTable  />} />
        <Route path="/TicketsData" element={<TicketDataTable  />} />
        <Route path="/Dashboard" element={<DashBoard  />} />
        <Route path="/EmployeeRegister" element={<RegisterForm  />} />
        <Route path="/TicketDataAdd" element={<TicketsForm   />} />
        <Route path="/TicketDataEdit/:ticket_id" element={<TicketsForm />} />
        <Route path="/" element={<LoginForm  />} />
        <Route path="*" element={<Navigate to="/" />} />
    
      </Routes>
    </BrowserRouter>
  );
}
