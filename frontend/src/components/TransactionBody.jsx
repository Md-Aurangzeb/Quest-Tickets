import axios from "axios";
import { TransactionHistory } from "./TransactionHistory";
import { useState, useEffect } from 'react'

export const TransactionBody = () => {
    const URL = process.env.REACT_APP_BACKEND_URL
    const [card, setCard] = useState()
    const date = new Date();
    const PaymentMethod = "Eco Park Ticket (3)";

    useEffect(() => {
        axios.post(`${URL}/card/get`, { email: localStorage.getItem('email') }).then((response) => {
            setCard(response.data)
        }).catch(err => {
            console.log(err)
        })
        // eslint-disable-next-line
    }, [])
    return (
        <div className="TransactionBody-container">
            <div className="body-header">
                <div>
                    <h2 className="card-heading">Recent Transactions</h2>
                    <p className="card-number">{card ? "XXXXXXXXXXXXX"+String(card.cardNumber).substr(-4) : "Loading..."}</p>
                    <p className="card-validity">VALILD THRU</p>
                    <p className="card-validity">{card ? card.cardValidity : "Loading..."}</p>
                    <p className="card-about">view your recent transactions</p>
                </div>
            </div>
            <div className="transaction-history">
                <p className="transaction-history-heading">ALL Transactions </p>
                <TransactionHistory transactionDate={6} transactionMonth={date.toLocaleString('default', { month: "short" })} transactionMethod={PaymentMethod} refNo={"8768768758758"} amount={878} />
                <TransactionHistory transactionDate={6} transactionMonth={date.toLocaleString('default', { month: "short" })} transactionMethod={"Nico Park (3)"} refNo={"8768768758758"} amount={1078} />
                <TransactionHistory transactionDate={6} transactionMonth={date.toLocaleString('default', { month: "short" })} transactionMethod={"Indian Museum (1)"} refNo={"8768768758758"} amount={60} />
                <TransactionHistory transactionDate={6} transactionMonth={date.toLocaleString('default', { month: "short" })} transactionMethod={"Alipore Zoo(5)"} refNo={"8768768758758"} amount={1878} />
            </div>
        </div>
    )
}