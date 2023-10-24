import React from "react";
import { useState } from "react";
import "./login-signup.css"
import scannerIcon from "../Assets/scanner.png"
import googleIcon from "../Assets/google.png"
import bgCardImg from "../Assets/login-signup-bg-card.png"
import bgCoinImgTop from "../Assets/login-signup-bg-top-coin.png"
import bgCoinImgBottom from "../Assets/login-signup-bg-bottom-coin.png"
export const SignupAddress = () => {
    const [adharNumber, setAdharNumber] = useState("");
    const [panNumber, setPANNumber] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    }
    return (
        <div className="login-signup-container">
            <div className="login-signup-left">
                <form onSubmit={handleSubmit} className="login-form">
                    <h1 className="form-heading">Login to Quest Tickets</h1>
                    <p className="form-detail">Address</p>
                    <input onChange={e => setAdharNumber(e.target.value)} className="from-input" type="text" placeholder="AdharNumber" value={adharNumber} />
                    <input onChange={e => setPANNumber(e.target.value)} className="from-input" type="text" placeholder="PAN Number" value={panNumber} />
                    <input onChange={e => setAddress(e.target.value)} className="from-input" type="text" placeholder="Address" value={address} />
                    <input onChange={e => setPincode(e.target.value)} className="from-input" type="text" placeholder="Pincode" value={pincode} />
                    
                    <button className="submit-button">Next</button>
                </form>
                <div className="other-login-signup seprator">
                    <button className="btn"><img className="btn-img" src={googleIcon} alt="img"></img>Continue with Google</button>
                    <p className="form-p">Already have an account?<a className="form-a" href="#"> Login</a></p>
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
