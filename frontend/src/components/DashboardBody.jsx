import link from "../Assets/link.png"
export const DashboardBody = () => {
    const name = "Sleepyhead";
    const date = new Date();
    return (
        <div className="DashboardBody-container">
            <div className="body-header">
                <h2 className="card-heading">Hi, {name}</h2>
                <p className="card-about">Your card account summary</p>
                <p className="card-name">Ace Card</p>
                <p className="card-number">6453 1234 2578 9001</p>
                <p className="card-validity">VALILD UPTO</p>
                <p className="card-validity card-validity-date">09/25</p>
            </div>

            <div className="current-statement">
                <div className="current-statement-heading">
                    <div className="sub-current-statement-heading">
                        <div className="icn">
                            <img style={{ height: "23px", transform: "translate(0,-8px)" }} className="icon" src={link} alt="" /></div>
                        <div className="heading">
                            <p style={{ fontSize: "1rem", fontFamily: "Inter, sans-serif", fontWeight: "bold" }}>Current Statement</p>
                            <p className="gapper">{date.getUTCMonth()} / {date.getFullYear()}</p>
                        </div>
                    </div>
                    <button>{">"}</button>
                </div>
                <div className="current-statement-body">
                    <div className="current-statement-sub-body">
                        <p className="udeBillStatus">LAST BILLED DUE</p>
                        <p className="gapper">₹{1234.45}</p>
                    </div>
                    <div className="current-statement-sub-body">
                        <p className="udeBillStatus">MINIMUM DUE</p>
                        <p className="gapper">₹{1234.45}</p>
                    </div>
                    <div className="current-statement-sub-body">
                        <p className="udeBillStatus">DUE ON</p>
                        <p className="gapper">{date.getUTCMonth()} / {date.getFullYear()}</p>
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