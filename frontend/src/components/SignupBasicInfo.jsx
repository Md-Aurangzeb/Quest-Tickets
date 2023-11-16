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

export const SignupBasicInfo = () => {
    const URL = process.env.REACT_APP_BACKEND_URL
    const navigate = useNavigate()
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
        if (name.length <= 4) { return toast.error("Enter a valid name.") }
        if (phoneNumber.toString().length !== 10) { return toast.error("Enter a valid phone Number.") }
        if (age <= 17) { return toast.error("Your are not eligible.") }
        if (gender === "") { return toast.error("Select gender type") }
        // todo : have to check the email already exist or not.

        const info = {
            "phone": phoneNumber,
            "email": email
        }

        const BasicInfo = {
            "name": name,
            "phone": phoneNumber,
            "email": email,
            "age": age,
            "gender": gender
        }
        axios.post(`${URL}/checkbasicInfo`, info).then((res) => {
            if (res.data === 'ok') {
                localStorage.setItem('BasicInfo', JSON.stringify(BasicInfo))
                navigate('/signupaddress')
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
                    <p className="form-detail">Basic information</p>
                    <input onChange={e => setName(e.target.value)} className="from-input" type="text" placeholder="Name" value={name} />
                    <input onChange={e => setPhoneNumber(e.target.value)} className="from-input" type="number" placeholder="Phone Number" value={phoneNumber} />
                    <input onChange={e => setEmail(e.target.value)} className="from-input" type="email" placeholder="Email" value={email} />
                    <input onChange={e => setAge(e.target.value)} className="from-input" type="number" placeholder="Age" value={age} />
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
                <img className="mid" src={bgCardImg} alt="img" />
                <img className="top-right" src={bgCoinImgTop} alt="top-right" />
                <img className="bottom-left" src={bgCoinImgBottom} alt="bottom-left" />
            </div>
        </div>
    );
};
