import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from "./Login";
import { SignupAddress } from "./SignupAddress";
import { SignupBasicInfo } from "./SignupBasicInfo";
import { VarifyLogin } from "./VarifyLogin";
import { VarifySignup } from "./VarifySignup";
import "../App.css"
import { SignupPass } from "./SignupPass";
import { Dashboard } from "./Dashboard";
import { Transaction } from "./Transaction";
import { ControlCenter } from "./ControlCenter";
import Recharge from './Recharge';
function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path='/' element={localStorage.getItem('jwt') ? <Dashboard /> : <Navigate to={'/login'} />} />
          <Route path='/transaction' element={localStorage.getItem('jwt') ? <Transaction /> : <Navigate to={'/login'} />} />
          <Route path='/recharge' element={localStorage.getItem('jwt') ? <Recharge /> : <Navigate to={'/login'} />} />
          <Route path='/controlcenter' element={localStorage.getItem('jwt') ? <ControlCenter /> : <Navigate to={'/login'} />} />
          <Route path='/login' element={localStorage.getItem('jwt') ? <Navigate to={'/'} /> : <Login />} />
          <Route path='/varifylogin' element={localStorage.getItem('jwt') ? <Navigate to={'/'} /> : <VarifyLogin />} />
          <Route path='/signupbasicinfo' element={localStorage.getItem('jwt') ? <Navigate to={'/'} />:<SignupBasicInfo />} />
          <Route path='/signupaddress' element={localStorage.getItem('jwt') ? <Navigate to={'/'} />:<SignupAddress />} />
          <Route path='/signuppass' element={localStorage.getItem('jwt') ? <Navigate to={'/'} />:<SignupPass />} />
          <Route path='/verifysignup' element={localStorage.getItem('jwt') ? <Navigate to={'/'} />:<VarifySignup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
