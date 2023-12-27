import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login-signup.css"
import scannerIcon from "../Assets/scanner.png"
import googleIcon from "../Assets/google.png"
import bgCardImg from "../Assets/login-signup-bg-card.png"
import bgCoinImgTop from "../Assets/login-signup-bg-top-coin.png"
import bgCoinImgBottom from "../Assets/login-signup-bg-bottom-coin.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import showPassImg from '../Assets/showPass.svg'
import hidePassImg from '../Assets/hidePass.svg'


export const Login = () => {
  const URL = process.env.REACT_APP_BACKEND_URL
  const [showPass, setShowPass] = useState(true)
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      email: email,
      password: password
    }

    const id = toast.loading("Sending OTP...")
    axios.post(`${URL}/login`, info).then((res) => {
      toast.update(id, { render: "OTP Sent", type: "success", isLoading: false });
      localStorage.setItem('email', email)
      setTimeout(() => {
        navigate('/varifylogin')
      }, 1000)
    }).catch(err => {
      toast.error(err.response.data)
      toast.update(id, { render: "Unable to sent OTP", type: "error", isLoading: false });
    })
  }


  return (
    <div className="login-signup-container">
      <ToastContainer />
      <div className="login-signup-left">
        <form className="login-form">
          <h1 className="form-heading">Login to Quest Tickets</h1>
          <input onChange={(e) => { setEmail(e.target.value) }} className="from-input" type="email" placeholder="Email" value={email} />
          <input onChange={(e) => { setPassword(e.target.value) }} className="from-input" type={showPass?"password":"text"} placeholder="Password" value={password} />
          <img src={showPass ? hidePassImg : showPassImg} alt="howPass" onClick={() => setShowPass(!showPass)} className="showHidePass"/>
          <button className="submit-button" onClick={handleSubmit}>Sent OTP</button>
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
