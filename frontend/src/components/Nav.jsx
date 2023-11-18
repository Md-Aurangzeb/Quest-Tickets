import { Link } from 'react-router-dom';
import dashboard from "../Assets/dashBord.png"
import transaction from "../Assets/transaction.png"
import controlcenter from "../Assets/controllCenter.png"
import logout from "../Assets/logout.png"
export const Nav = () => {
    const handleLoguot=(e)=>{
        e.preventDefault()
        localStorage.removeItem('jwt')
        window.location.reload()
    }
    return <div className="nav-container">
        <Link to="/">
            <button className="nav-button"><img className="icon" src={dashboard} alt=''></img> Dashboard</button>
        </Link>
        <Link to="/transaction">
            <button className="nav-button"><img className="icon" src={transaction} alt=''></img> Transaction</button>
        </Link>
        <Link to="/controlcenter">
            <button className="nav-button"><img className="icon" src={controlcenter} alt=''></img> Control Center</button></Link>
        <Link to="/login">
            <button onClick={handleLoguot} className='nav-button'><img className="icon icon-l" src={logout} alt=''></img>Logout</button>
        </Link>
    </div>
}