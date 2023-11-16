import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login-signup.css"
import scannerIcon from "../Assets/scanner.png"
import googleIcon from "../Assets/google.png"
import bgCardImg from "../Assets/login-signup-bg-card.png"
import bgCoinImgTop from "../Assets/login-signup-bg-top-coin.png"
import bgCoinImgBottom from "../Assets/login-signup-bg-bottom-coin.png"
export const VarifyLogin = () => {
    const [ OTP, setOTP ] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(OTP);
  }
  return (
    <div className="login-signup-container">
      <div className="login-signup-left">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="form-heading">Login to Quest Tickets</h1>
          <p className="form-detail">OTP is sent to your registered Email</p>
          <input onChange={e=>setOTP(e.target.value)} className="from-input" type="text" placeholder="OTP" value={OTP} />
          <button className="submit-button">Varify OTP</button>
        </form>
        <div className="other-login-signup seprator">
          <button className="btn"><img className="btn-img" src={scannerIcon}></img> Continue with QR Code</button>
          <button className="btn"><img className="btn-img" src={googleIcon} alt="img"></img>Continue with Google</button>
          <p className="form-p">Don't have an account?<Link className="form-a" to="/signupbasicinfo"> Signup</Link></p>
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
