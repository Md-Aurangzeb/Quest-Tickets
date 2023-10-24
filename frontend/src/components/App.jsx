import { Login } from "./Login";
import { SignupAddress } from "./SignupAddress";
import { SignupBasicInfo } from "./SignupBasicInfo";
import { VarifyLogin } from "./VarifyLogin";
import { VarifySignup } from "./VarifySignup";

function App() {
  return (
    <div>
      <Login />
      <VarifyLogin />
      <SignupBasicInfo />
      <SignupAddress />
      <VarifySignup />
    </div>
  );
}

export default App;
