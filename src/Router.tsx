import { BrowserRouter, Route, Routes } from "react-router-dom";

import EmployeeDataTable from "./components/EmployeeDataTable";
import React from "react";
import Roles from "./components/Roles";
import LoginForm from "./components/LoginForm";
import EditForm from "./components/EditForm";

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/EmployeeData" element={<EmployeeDataTable  />} />
        <Route path="/" element={<LoginForm  />} />
        <Route path="/edit" element={<EditForm />} /> 
        <Route path="/roles" element={<Roles  />} />
      </Routes>
    </BrowserRouter>
  );
}
