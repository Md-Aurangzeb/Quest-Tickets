import React from "react"
export const TransactionHistory = (props) => {
    const name = "";
    const date = new Date();
    const PaymentMethod="aidoifuodijfflkdjf09a098djfldkjf";
    return (
        <div className="transaction-done">
            <div>
                <p>{props.transactionDate}</p>
                <p>{props.transactionMonth}</p>
            </div>
            <p>{props.transactionMethod}</p>
            <p>{props.refNo}</p>
            <p>₹{props.amount}{">"}</p>
        </div>
    )
}