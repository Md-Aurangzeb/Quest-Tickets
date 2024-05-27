import { DashboardBody } from "./DashboardBody";
import { Nav } from "./Nav";


export const Dashboard = ({ card }) => {
    return (<div className="Dashborad-container">
        <Nav />
        <DashboardBody card={card} />
    </div>)
};