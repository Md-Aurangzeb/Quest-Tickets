import React from "react"
export const TransactionHistory = (props) => {
    return (
        <div className="transaction-done">
            <div>
                <p>{props.transactionDate}</p>
            </div>
            <p>{props.transactionMethod}</p>
            <p>{props.refNo}</p>
            <p><b>₹{props.amount}</b></p>
        </div>
    )
}