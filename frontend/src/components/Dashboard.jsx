import { DashboardBody } from "./DashboardBody";
import { Nav } from "./Nav";


export const Dashboard=()=>{
    return (<div className="Dashborad-container">
        <Nav />
        <DashboardBody />
    </div>)
};