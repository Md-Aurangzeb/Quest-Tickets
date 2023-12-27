import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login-signup.css"
// import scannerIcon from "../Assets/scanner.png"
import googleIcon from "../Assets/google.png"
import bgCardImg from "../Assets/login-signup-bg-card.png"
import bgCoinImgTop from "../Assets/login-signup-bg-top-coin.png"
import bgCoinImgBottom from "../Assets/login-signup-bg-bottom-coin.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import showPassImg from '../Assets/showPass.svg'
import hidePassImg from '../Assets/hidePass.svg'
import infoImg from '../Assets/info.svg'



export const SignupPass = () => {
  const URL = process.env.REACT_APP_BACKEND_URL
  const [showPass, setShowPass] = useState(true)
  const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const funcCheckPass = (e) => {
    e.preventDefault();

    const info = {
      password: password,
      cPassword: confirmPassword
    }

    const email = localStorage.getItem('BasicInfo')
    const oriEmail = (JSON.parse(email).email)

    axios.post(`${URL}/checkpass`, info).then((res) => {
      if (res.data === 'ok') {
        localStorage.setItem('setPassword', password)
        const id = toast.loading("Sending OTP...")
        axios.post(`${URL}/sendotp`, { email: oriEmail }).then(() => {
          toast.update(id, { render: "OTP Sent", type: "success", isLoading: false });
          setTimeout(() => {
            navigate('/verifysignup')
          }, 1000)
        }).catch((err) => {
          toast.update(id, { render: "Unable to sent OTP", type: "error", isLoading: false });
        })
      }
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
          <p className="form-detail">Set Password</p>
          <input onChange={(e) => { setPassword(e.target.value) }} className="from-input m-0" type="password" placeholder="Password" value={password} />
          <img src={infoImg} alt="Info" className="showHidePass top-35 infosvg" />
          <span className='PasswordInfoBox'>
            Make sure it's at least 8 characters and including a number and a lowercase letter and aslo a uppercase letter
            <br />
            <span className='bold'>e.g :- Abcd123$</span>
          </span>
          <input onChange={(e) => { setConfirmPassword(e.target.value) }} className="from-input m-0" type={showPass ? "password" : "text"} placeholder="Confirm Password" value={confirmPassword} />
          <img src={showPass ? hidePassImg : showPassImg} alt="howPass" onClick={() => setShowPass(!showPass)} className="showHidePass top-35" />
          <button className="submit-button" onClick={funcCheckPass}>Next</button>
        </form>
        <div className="other-login-signup seprator">
          <button className="btn"><img className="btn-img" src={googleIcon} alt="img"></img>Continue with Google</button>
          <p className="form-p">Already have an account?<Link className="form-a" to="/login"> Login</Link></p>
        </div>
      </div>
      <div className="login-signup-right">
        <img className="mid" src={bgCardImg} alt="img"></img>
        <img className="top-right" src={bgCoinImgTop} alt="" ></img>
        <img className="bottom-left" src={bgCoinImgBottom} alt=""></img>
      </div>
    </div>
  );
};
