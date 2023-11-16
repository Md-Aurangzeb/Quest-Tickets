import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/transaction' element={<Transaction />}/>
          <Route path='/controlcenter' element={<ControlCenter />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/varifylogin' element={<VarifyLogin />}/>
          <Route path='/signupbasicinfo' element={<SignupBasicInfo />}/>
          <Route path='/signupaddress' element={<SignupAddress />}/>
          <Route path='/signuppass' element={<SignupPass />}/>
          <Route path='/varifysignup' element={<VarifySignup />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
