import { BrowserRouter, Route, Routes } from "react-router-dom";

import EmployeeDataTable from "./components/EmployeeDataTable";
import React from "react";
import Roles from "./components/Roles";
import RegisterForm from "./components/RegisterForm";
import EditForm from "./components/EditForm";
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
        <Route path="/" element={<RegisterForm  />} />
        <Route path="/TicketDataAdd" element={<TicketsForm  />} />
        <Route path="/EmployeeLogin" element={<LoginForm  />} />
        <Route path="/edit" element={<EditForm />} /> 
        <Route path="/roles" element={<Roles  />} />
      </Routes>
    </BrowserRouter>
  );
}
