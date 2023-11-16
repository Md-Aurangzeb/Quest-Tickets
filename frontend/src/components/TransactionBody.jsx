import { TransactionHistory } from "./TransactionHistory";

export const TransactionBody = () => {
    const date = new Date();
    const PaymentMethod = "aidoifuodijfflkdjf09a098djfldkjf";
    return (
        <div className="TransactionBody-container">
            <div className="body-header">
                <h2 className="card-heading">Recent Transactions</h2>
                <p className="card-number">1234 1234 1234 1234</p>
                <p className="card-about">view your recent transactions</p>
            </div>
            <div className="transaction-history">
                <p className="transaction-history-heading">ALL Transactions ({3})</p>
                <TransactionHistory transactionDate={6} transactionMonth={date.toLocaleString('default', { month: "short" })} transactionMethod={PaymentMethod} refNo={"8768768758758"} amount={878} />
            </div>
        </div>
    )
}