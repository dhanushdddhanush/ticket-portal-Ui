import React, { useEffect, useState } from 'react';
import "../App.css";
import Header from './Header';

const EmployeeDataTable = () => {
  const [employees, setEmployees] = useState([]);  
  const [search, setSearch] = useState("");  

  useEffect(() => {
    fetch('http://localhost:8080/user')
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

 
  const filteredEmployees = employees.filter((employee) =>
    employee.email?.toLowerCase().includes(search.toLowerCase()) ||
    employee.username?.toLowerCase().includes(search.toLowerCase()) ||
    employee.department?.toLowerCase().includes(search.toLowerCase()) ||
    employee.name?.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <>
     <Header/>
     <div className="datatable">
      <input
        type="search"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.user_id}>
              <td>{employee.user_id}</td>
              <td>{employee.name}</td>
              <td>{employee.userName}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.department}</td>
              <td>{employee.roles?.map(role => role.role)}</td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default EmployeeDataTable;
