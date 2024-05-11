import axios from 'axios';
import { useState, useEffect } from 'react';
import { Nav } from './Nav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recharge = () => {
    const currency = "INR";
    const receiptId = "qwsaq1";
    const URL = process.env.REACT_APP_BACKEND_URL
    const [card, setCard] = useState()
    const [amount, setAmount] = useState()
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        axios.post(`${URL}/card/get`, { email: localStorage.getItem('email') }).then((response) => {
            setCard(response.data)
        }).catch(err => {
            console.log(err)
        })
        // eslint-disable-next-line
    }, [])

    const funcRecharge = () => {
        axios.post(`${URL}/card/recharge`, {
            email: localStorage.getItem('email'),
            amount: Number(amount),
        }).then(res => {
            setAmount("")
            toast.success(res.data)
        }).catch(err => {
            toast.error(err.response.data)
        })
    }



    const paymentHandler = async (e) => {
        if (amount <= 0 || amount=== undefined) {
            toast.error("Enter Valid Amount")
            return;
        }
        setLoading(true)

        const response = await axios.post(`${URL}/api/v1/payment/initiate`, {
            amount: amount * 100,
            currency,
            receipt: receiptId,
        })

        const order = response.data;

        var options = {
            key: "rzp_test_sB7FZPk7D9C1CB",
            amount: amount * 100,
            currency,
            name: "Quest Card",
            description: "Test Transaction",
            image: "https://project.mizanur.in/static/media/login-signup-bg-card.3ff86d8994b9cfd21fba.png",
            order_id: order.id,
            handler: async function (response) {
                const body = {
                    ...response,
                };

                const validateRes = await axios.post(`${URL}/api/v1/payment/validate`, body);

                const jsonRes = validateRes.data;

                if (jsonRes.msg === 'success') {
                    funcRecharge()
                    setLoading(false)
                }
            },
            prefill: {
                name: "Quest Card",
                email: "dev@mizanur.in",
                contact: "9475149702",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        var rzp1 = new window.Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            toast.error("Payment fail try again :(")
            setLoading(false)
        });
        rzp1.open();
        e.preventDefault();
    }


    return (
        <>
            <ToastContainer />
            <div className='Transaction-container'>
                <Nav />
                <div className='TransactionBody-container'>
                    <div className="body-header">
                        <div>
                            <h2 className="card-heading">Recharge Your Card</h2>
                            <p className="card-number">{card ? "XXXXXXXXXXXXX" + String(card.cardNumber).substr(-4) : "Loading..."}</p>
                            <p className="card-validity">VALILD THRU</p>
                            <p className="card-validity">{card ? card.cardValidity : "Loading..."}</p>
                            <p className="card-about">You Can Recharge your Card</p>
                        </div>
                    </div>
                    <div className='transaction-history'>
                        <p className="transaction-history-heading">Recharge </p>
                        <div className="inputCont">
                            <span>₹</span>
                            <input type="number" autoComplete="off" placeholder='Enter Amount' name='amount' onChange={(e) => { setAmount(e.target.value) }} value={amount} />
                            <button onClick={paymentHandler}>{loading?'Loading...':'Recharge'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recharge
