import React from "react";
import { useState } from "react";
import "./login-signup.css"
import scannerIcon from "../Assets/scanner.png"
import googleIcon from "../Assets/google.png"
import bgCardImg from "../Assets/login-signup-bg-card.png"
import bgCoinImgTop from "../Assets/login-signup-bg-top-coin.png"
import bgCoinImgBottom from "../Assets/login-signup-bg-bottom-coin.png"
export const SignupBasicInfo = () => {
    const options = [
        { value: "", text: "Gender" },
        { value: "Male", text: "Male" },
        { value: "Female", text: "Female" }
    ];
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState(options[0].value);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    return (
        <div className="login-signup-container">
            <div className="login-signup-left">
                <form onSubmit={handleSubmit} className="login-form">
                    <h1 className="form-heading">Login to Quest Tickets</h1>
                    <p className="form-detail">Basic information</p>
                    <input onChange={e => setName(e.target.value)} className="from-input" type="text" placeholder="Name" value={name} />
                    <input onChange={e => setPhoneNumber(e.target.value)} className="from-input" type="text" placeholder="Phone Number" value={phoneNumber} />
                    <input onChange={e => setEmail(e.target.value)} className="from-input" type="email" placeholder="Email" value={email} />
                    <input onChange={e => setAge(e.target.value)} className="from-input" type="text" placeholder="Age" value={age} />
                    <select className="from-select" value={gender} onChange={e => setGender(e.target.value)}>
                        {
                            options.map(option => (
                                <option key={option.value} value={option.value}>{option.text}</option>
                            ))
                        }
                    </select>
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
