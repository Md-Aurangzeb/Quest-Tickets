import { TransactionHistory } from "./TransactionHistory";

export const TransactionBody = () => {
    const date = new Date();
    const PaymentMethod = "Eco Park Ticket (3)";
    return (
        <div className="TransactionBody-container">
            <div className="body-header">
                <h2 className="card-heading">Recent Transactions</h2>
                <p className="card-number">6453 1234 2578 9001</p>
                <p className="card-validity">VALILD THRU</p>
                <p className="card-validity">45/52</p>
                <p className="card-about">view your recent transactions</p>
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