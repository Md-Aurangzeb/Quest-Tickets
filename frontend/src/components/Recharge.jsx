import axios from 'axios';
import { useState, useEffect } from 'react';
import { Nav } from './Nav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recharge = () => {
    const URL = process.env.REACT_APP_BACKEND_URL
    const [card, setCard] = useState()
    const [amount, setAmount] = useState()
    useEffect(() => {
        axios.post(`${URL}/card/get`, { email: localStorage.getItem('email') }).then((response) => {
            setCard(response.data)
        }).catch(err => {
            console.log(err)
        })
        // eslint-disable-next-line
    }, [])

    const funcRecharge = () => {
        if (amount <= 0) {
            toast.error("Enter Valid Amount")
            return;
        }
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






    return (
        <>
            <ToastContainer />
            <div className='Transaction-container'>
                <Nav />
                <div className='TransactionBody-container'>
                    <div className="body-header">
                        <div>
                            <h2 className="card-heading">Recharge Your Card</h2>
                            <p className="card-number">{card ? "XXXXXXXXXXXXX"+String(card.cardNumber).substr(-4) : "Loading..."}</p>
                            <p className="card-validity">VALILD THRU</p>
                            <p className="card-validity">{card ? card.cardValidity : "Loading..."}</p>
                            <p className="card-about">You Can Recharge your Card</p>
                        </div>
                    </div>
                    <div className='transaction-history'>
                        <p className="transaction-history-heading">Recharge </p>
                        <div className="inputCont">
                            <input type="number" autoComplete="off" placeholder='Enter Amount' name='amount' onChange={(e) => { setAmount(e.target.value) }} value={amount} />
                            <button onClick={funcRecharge}>Recharge</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recharge
