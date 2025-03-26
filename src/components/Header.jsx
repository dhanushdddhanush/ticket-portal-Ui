import "../App.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate("/");
      };
    return (
        <div className="header">
         <h1>Ticket Management</h1>
         <button onClick={()=>handleHome()} >Home</button>
        </div>
    )
}

export default Header;