import axios from "axios";
import { TransactionHistory } from "./TransactionHistory";
import { useState, useEffect } from 'react'
import transaction_not_found_img from '../Assets/transaction_not_found.svg'

export const TransactionBody = () => {
    const URL = process.env.REACT_APP_BACKEND_URL
    const [card, setCard] = useState()
    const [cardUse, setcardUse] = useState()
    const PaymentMethod = "Machine_id_2001";

    useEffect(() => {
        axios.post(`${URL}/card/get`, { email: localStorage.getItem('email') }).then((response) => {
            setCard(response.data)
        }).catch(err => {
            console.log(err)
        })

        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        if (card !== undefined) {
            axios.post(`${URL}/api/v1/transaction/history`, { cardNumber: card.cardNumber }).then(response => {
                setcardUse(response.data.data)
            })
        }
        // eslint-disable-next-line
    }, [card])


    return (
        <div className="TransactionBody-container">
            <div className="body-header">
                <div>
                    <h2 className="card-heading">Recent Transactions</h2>
                    <p className="card-number">{card ? "XXXXXXXXXXXXX" + String(card.cardNumber).substr(-4) : "Loading..."}</p>
                    <p className="card-validity">VALILD THRU</p>
                    <p className="card-validity">{card ? card.cardValidity : "Loading..."}</p>
                    <p className="card-about">view your recent transactions</p>
                </div>
            </div>
            <div className="transaction-history">
                <p className="transaction-history-heading bold">ALL Transactions </p>
                {
                    cardUse === 0 ?
                        <div className="flex pb-30">
                            <img className="h-115 mb-10" src={transaction_not_found_img} alt="transaction_not_found_img" />
                            <p className="bold">Transaction not Found</p>
                        </div> : ""
                }
                {cardUse === undefined ?
                    <div className="flex pb-30">
                        <p className="bold">Loading...</p>
                    </div>
                    : Array.from({ length: cardUse }).map((_, index) => (
                        <TransactionHistory
                            key={index}
                            transactionDate={index + 1}
                            transactionMethod={PaymentMethod}
                            refNo={"T" + (Math.floor(Math.random() * (9999999999 - 1111111111 + 1)) + 1111111111) + "Z#"}
                            amount={50}
                        />
                    ))}
            </div>
        </div>
    )
}