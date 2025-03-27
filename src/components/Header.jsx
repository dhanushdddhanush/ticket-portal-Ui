import "../App.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    // const handleHome = () => {
    //     navigate("/");
    //   };
      const handleLogout = () => {
       localStorage.removeItem('user');
       navigate("/EmployeeLogin");
      };
    return (
        <div className="header">
         <h1>Ticket Management</h1>
         <div className="button-group">
         {/* <button onClick={()=>handleHome()} >Home</button> */}
         <button onClick={()=>handleLogout()} >Logout</button>
         </div>
        </div>
    )
}

export default Header;