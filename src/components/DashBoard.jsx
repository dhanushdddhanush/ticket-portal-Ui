import TicketDataTable from "./TicketDataTable";
import TicketsForm from "./TicketsForm";

const DashBoard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <TicketsForm />
      <TicketDataTable />
    </div>
  );
};

export default DashBoard;
