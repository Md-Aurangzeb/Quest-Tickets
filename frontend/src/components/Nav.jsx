import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Link } from 'react-router-dom';
import dashboard from "../Assets/dashboardIcon.png"
import transaction from "../Assets/transaction.png"
import link from "../Assets/link.png"
export const Nav=()=>{
    return <div className="nav-container">
    <Link to="/">
    <button className="nav-button"><img className="icon" src={dashboard}></img> Dashboard</button>
                    </Link>
                    <Link to="/transaction">
    <button className="nav-button"><img className="icon" src={transaction}></img> Transaction</button>
    </Link>
    <Link to="/controlcenter">
    <button className="nav-button"><img className="icon" src={link}></img> Control Center</button></Link>
    </div>
}