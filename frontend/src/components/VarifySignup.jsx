import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login-signup.css"
// import scannerIcon from "../Assets/scanner.png"
import googleIcon from "../Assets/google.png"
import bgCardImg from "../Assets/login-signup-bg-card.png"
import bgCoinImgTop from "../Assets/login-signup-bg-top-coin.png"
import bgCoinImgBottom from "../Assets/login-signup-bg-bottom-coin.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


export const VarifySignup = () => {
  const URL = process.env.REACT_APP_BACKEND_URL
  const navigate = useNavigate()
  const [OTP, setOTP] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.getItem('BasicInfo') == null || localStorage.getItem('addressInfo') == null || localStorage.getItem('setPassword') == null) {
      return toast.error("Access Denied")
    }

    const basicInfo = JSON.parse(localStorage.getItem('BasicInfo'))
    const addressInfo = JSON.parse(localStorage.getItem('addressInfo'))
    const passwod = localStorage.getItem('setPassword')

    const userInfo = {
      age: basicInfo.age,
      email: basicInfo.email,
      gender: basicInfo.gender,
      name: basicInfo.name,
      phone: basicInfo.phone,
      address: addressInfo.address,
      adhar: addressInfo.adhar,
      pan: addressInfo.pan,
      pincode: addressInfo.pincode,
      password: passwod,
      otp: OTP
    }


    axios.post(`${URL}/verifyuser`, userInfo).then((res) => {
      toast.success(res.data)
      localStorage.removeItem('BasicInfo')
      localStorage.removeItem('addressInfo')
      localStorage.removeItem('setPassword')
      setTimeout(() => {
        navigate('/login')
      }, 5000);
    }).catch((err) => {
      toast.error(err.response.data)
    })

  }

  return (
    <div className="login-signup-container">
      <ToastContainer />
      <div className="login-signup-left">
        <form className="login-form">
          <h1 className="form-heading">SignUp to Quest Tickets</h1>
          <p className="form-detail">OTP is sent to your registered Email</p>
          <input onChange={e => setOTP(e.target.value)} className="from-input" type="number" placeholder="OTP" value={OTP} />
          <button className="submit-button" onClick={handleSubmit}>Varify OTP</button>
        </form>
        <div className="other-login-signup seprator">
          <button className="btn"><img className="btn-img" src={googleIcon} alt="img"></img>Continue with Google</button>
          <p className="form-p">Already have an account?<Link className="form-a" to="/login"> Login</Link></p>
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
