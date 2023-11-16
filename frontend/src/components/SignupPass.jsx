import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login-signup.css"
import scannerIcon from "../Assets/scanner.png"
import googleIcon from "../Assets/google.png"
import bgCardImg from "../Assets/login-signup-bg-card.png"
import bgCoinImgTop from "../Assets/login-signup-bg-top-coin.png"
import bgCoinImgBottom from "../Assets/login-signup-bg-bottom-coin.png"
export const SignupPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(OTP);
  }
  return (
    <div className="login-signup-container">
      <div className="login-signup-left">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="form-heading">SignUp to Quest Tickets</h1>
          <p className="form-detail">Set Password</p>
          <input onChange={(e) => { setPassword(e.target.value) }} className="from-input" type="password" placeholder="Password" value={password} />
          <input onChange={(e) => { setConfirmPassword(e.target.value) }} className="from-input" type="password" placeholder="Confirm Password" value={confirmPassword} />
          <Link to="/varifysignup">
            <button className="submit-button">Next</button>
          </Link>

        </form>
        <div className="other-login-signup seprator">
          <button className="btn"><img className="btn-img" src={googleIcon} alt="img"></img>Continue with Google</button>
          <p className="form-p">Already have an account?<Link className="form-a" to="/login"> Login</Link></p>
        </div>
      </div>
      <div className="login-signup-right">
        <img className="mid" src={bgCardImg} alt="img"></img>
        <img className="top-right" src={bgCoinImgTop} ></img>
        <img className="bottom-left" src={bgCoinImgBottom}></img>
      </div>
    </div>
  );
};
