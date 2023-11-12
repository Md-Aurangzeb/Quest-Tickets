import link from "../Assets/link.png"
export const DashboardBody = () => {
    const name = "Mizanur Rahman";
    const date = new Date();
    return (
        <div className="DashboardBody-container">
            <div className="body-header">
                <h2 className="card-heading">Hi, {name}</h2>
                <p className="card-about">Your card account summary</p>
                <p className="card-name">Ace</p>
                <p className="card-number">1234 1234 1234 1234</p>
            </div>

            <div className="current-statement">
                <div className="current-statement-heading">
                    <div className="sub-current-statement-heading">
                        <div className="icn">
                            <img className="icon" src={link}></img></div>
                        <div className="heading">
                            <p style={{ fontSize: "1.5rem" }}>Current Statement</p>
                            <p>{date.getUTCMonth()} {date.getFullYear()}</p>
                        </div>
                    </div>
                    <button>{">"}</button>
                </div>
                <div className="current-statement-body">
                    <div className="current-statement-sub-body">
                        <p>LAST BILLED DUE</p>
                        <p>₹{1234.45}</p>
                    </div>
                    <div className="current-statement-sub-body">
                        <p>MINIMUM DUE</p>
                        <p>₹{1234.45}</p>
                    </div>
                    <div className="current-statement-sub-body">
                        <p>DUE ON</p>
                        <p>{date.getUTCMonth()} {date.getFullYear()}</p>
                    </div>
                    <p className="success">Fully Paid</p>
                </div>
                <p className="current-statement-body-p">Your card has been paid in full your next bill will be generated on {date.getUTCMonth()} {date.getFullYear()}</p>
            </div>
            <div className="body-footer">
                <p>That's all for now! keep visiting this space for some exciting updates</p>
            </div>
        </div>)
}