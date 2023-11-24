import React from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./login-signup.css"
// import scannerIcon from "../Assets/scanner.png"
import googleIcon from "../Assets/google.png"
import bgCardImg from "../Assets/login-signup-bg-card.png"
import bgCoinImgTop from "../Assets/login-signup-bg-top-coin.png"
import bgCoinImgBottom from "../Assets/login-signup-bg-bottom-coin.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


export const SignupAddress = () => {
    const URL = process.env.REACT_APP_BACKEND_URL
    const navigate = useNavigate()
    const [adharNumber, setAdharNumber] = useState("");
    const [panNumber, setPANNumber] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");

    const funcValidation = (e) => {
        e.preventDefault();

        if (adharNumber.toString().length !== 12) {
            return toast.error("Enter a valid Aadher")
        }

        if (panNumber.toString().length !== 10) {
            return toast.error("Enter a valid Pan")
        }


        if (address.length <= 4) {
            return toast.error("Enter a valid Address")
        }

        if (pincode.toString().length <= 3) {
            return toast.error("Enter a valid Pin Code")
        }

        const info = {
            adhar: adharNumber,
            pan: panNumber
        }

        const addressInfo = {
            adhar: adharNumber,
            pan: panNumber,
            address: address,
            pincode: pincode
        }

        axios.post(`${URL}/checkpanaadher`, info).then((res) => {
            if (res.data === "ok") {
                localStorage.setItem('addressInfo', JSON.stringify(addressInfo))
                navigate('/signuppass')
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
                    <p className="form-detail">Address</p>
                    <input onChange={e => setAdharNumber(e.target.value)} className="from-input" type="number" placeholder="AdharNumber" value={adharNumber} />
                    <input onChange={e => setPANNumber(e.target.value)} className="from-input" type="text" placeholder="PAN Number" value={panNumber} />
                    <input onChange={e => setAddress(e.target.value)} className="from-input" type="text" placeholder="Address" value={address} />
                    <input onChange={e => setPincode(e.target.value)} className="from-input" type="number" placeholder="Pincode" value={pincode} />
                    {/* <Link to="/signuppass"> */}
                    <button className="submit-button" onClick={funcValidation}>Next</button>
                    {/* </Link> */}

                </form>
                <div className="other-login-signup seprator">
                    <button className="btn"><img className="btn-img" src={googleIcon} alt="img"></img>Continue with Google</button>
                    <p className="form-p">Already have an account?<Link className="form-a" to="/login"> Login</Link></p>
                </div>
            </div>
            <div className="login-signup-right">
                <img className="mid" src={bgCardImg} alt="img"></img>
                <img className="top-right" src={bgCoinImgTop} alt="" />
                <img className="bottom-left" src={bgCoinImgBottom} alt="" />
            </div>
        </div>
    );
};
