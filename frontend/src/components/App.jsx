import { Login } from "./Login";
import { SignupAddress } from "./SignupAddress";
import { SignupBasicInfo } from "./SignupBasicInfo";
import { VarifyLogin } from "./VarifyLogin";
import { VarifySignup } from "./VarifySignup";
import "../App.css"
import { SignupPass } from "./SignupPass";
function App() {
  return (
    <div>
      <Login />
      <VarifyLogin />
      <SignupBasicInfo />
      <SignupAddress />
      <SignupPass/>
      <VarifySignup />
    </div>
  );
}

export default App;
