import React from "react";
import { useState } from "react";
import "./login-signup.css"
import scannerIcon from "../Assets/scanner.png"
import googleIcon from "../Assets/google.png"
import bgCardImg from "../Assets/login-signup-bg-card.png"
import bgCoinImgTop from "../Assets/login-signup-bg-top-coin.png"
import bgCoinImgBottom from "../Assets/login-signup-bg-bottom-coin.png"
export const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const handleChange=(e)=>{
      setEmail(e.target.value);
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email);
      console.log(password);
  }
  return (
    <div className="login-signup-container">
      <div className="login-signup-left">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="form-heading">Login to Quest Tickets</h1>
          <input onChange={handleChange} className="from-input" type="email" placeholder="Email" value={email} />
          <input onChange={(e)=>{setPassword(e.target.value)}} className="from-input" type="password" placeholder="Password" value={password}/>
          <button className="submit-button">Sent OTP</button>
        </form>
        <div className="other-login-signup seprator">
          <button className="btn"><img className="btn-img" src={scannerIcon}></img> Continue with QR Code</button>
          <button className="btn"><img className="btn-img" src={googleIcon} alt="img"></img>Continue with Google</button>
          <p className="form-p">Don't have an account?<a className="form-a" href="#"> Signup</a></p>
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
