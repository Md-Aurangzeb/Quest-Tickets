import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login-signup.css"
import scannerIcon from "../Assets/scanner.png"
import googleIcon from "../Assets/google.png"
import bgCardImg from "../Assets/login-signup-bg-card.png"
import bgCoinImgTop from "../Assets/login-signup-bg-top-coin.png"
import bgCoinImgBottom from "../Assets/login-signup-bg-bottom-coin.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


export const VarifyLogin = () => {
  const URL = process.env.REACT_APP_BACKEND_URL
  const [OTP, setOTP] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      email: localStorage.getItem('email'),
      otp: OTP
    }
    axios.post(`${URL}/login/verify`, info).then((res) => {
      localStorage.setItem('jwt',res.data.jwtToken)
      localStorage.setItem('Name',res.data.userName)
      window.location.reload()
    }).catch(err => {
      toast.error(err.response.data)
    })
  }

  return (
    <div className="login-signup-container">
      <ToastContainer />
      <div className="login-signup-left">
        <form className="login-form">
          <h1 className="form-heading">Login to Quest Tickets</h1>
          <p className="form-detail">OTP is sent to your registered Email</p>
          <input onChange={e => setOTP(e.target.value)} className="from-input" type="text" placeholder="OTP" value={OTP} />
          <button className="submit-button" onClick={handleSubmit}>Varify OTP</button>
        </form>
        <div className="other-login-signup seprator">
          <button className="btn"><img className="btn-img" src={scannerIcon} alt=""></img> Continue with QR Code</button>
          <button className="btn"><img className="btn-img" src={googleIcon} alt="img"></img>Continue with Google</button>
          <p className="form-p">Don't have an account?<Link className="form-a" to="/signupbasicinfo"> Signup</Link></p>
        </div>
      </div>
      <div className="login-signup-right">
        <img className="mid" src={bgCardImg} alt="img"></img>
        <img className="top-right" src={bgCoinImgTop} alt=""></img>
        <img className="bottom-left" src={bgCoinImgBottom} alt=""></img>
      </div>
    </div>
  );
};
