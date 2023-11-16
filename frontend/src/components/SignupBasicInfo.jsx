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

    const funcBasicInfo = (e) => {
        e.preventDefault();
        if(name===null && name.length>=4) {return toast.error("Enter a valid name.")}
        if(phoneNumber!=10) {
            return toast.error("Enter a valid phone Number.")
        }
        if(age<=18){
            return toast.error("Your are not eligible.")
        }
        // todo : have to check the email already exist or not.
    }


    return (
        <div className="login-signup-container">
            <ToastContainer />
            <div className="login-signup-left">
                <form className="login-form">
                    <h1 className="form-heading">SignUp to Quest Tickets</h1>
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
                    <button className="submit-button" onClick={funcBasicInfo} >Next</button>
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
