import dashboard from "../Assets/dashboardIcon.png"
import transaction from "../Assets/transaction.png"
import link from "../Assets/link.png"
export const Nav=()=>{
    return <div className="nav-container">
    <button className="nav-button"><img className="icon" src={dashboard}></img> Dashboard</button>
    <button className="nav-button"><img className="icon" src={transaction}></img> Transaction</button>
    <button className="nav-button"><img className="icon" src={link}></img> Control Center</button>
    </div>
}