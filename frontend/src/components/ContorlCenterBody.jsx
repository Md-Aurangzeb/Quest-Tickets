import { ControlCenterBodyFeaturesCardLeftbtn } from "./ControlCenterBodyFeaturesCardLeftbtn"
import { ControlCenterBodyFeaturesCardRight } from "./ControlCenterBodyFeaturesCardRight"
import { ControlCenterBodyFeaturesCardRightbtn } from "./ControlCenterBodyFeaturesCardRightbtn";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SetpinModal } from "./Modal/SetpinModal"
import { useState, useEffect } from 'react';
import domesticusage from "../Assets/domesticUse.png"
import internationalusage from "../Assets/international.png"
import overlimit from "../Assets/overLimit.png"
import autodebit from "../Assets/autoDebit.png"
import block from "../Assets/blockCard.png"
import setpin from "../Assets/setPin.png"
import axios from 'axios'

export const ControlCenterBody = () => {
    const URL = process.env.REACT_APP_BACKEND_URL
    const [isModalOpen, setModalOpen] = useState(false);
    const handleClickSetpin = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    };
    const [isDomesticUsageOpen, setIsDomesticUsageOpen] = useState();
    const [isInternationalUsage, setIsInternationalUsage] = useState();
    const [isOverLimitFacility, setIsOverLimitFacility] = useState();
    const [isAutoDebit, setIsAutoDebit] = useState();
    const [card, setCard] = useState()
    const [isBlock, setIsBlock] = useState();


    useEffect(() => {
        getCard()
        // eslint-disable-next-line
    }, [])

    const getCard = () => {
        axios.post(`${URL}/card/get`, { email: localStorage.getItem('email') }).then((response) => {
            setIsDomesticUsageOpen(response.data.domesticUse)
            setIsInternationalUsage(response.data.InternationalUse)
            setIsOverLimitFacility(response.data.overLimitUse)
            setIsAutoDebit(response.data.autoDebitUse)
            setIsBlock(response.data.block)
            setCard(response.data)
        }).catch(err => {
            console.log(err)
        })
    }


    const funcChangeStatus = (state) => {
        let status;
        if (state === 'domesticUse') {
            status = !isDomesticUsageOpen
        }
        else if (state === 'InternationalUse') {
            status = !isInternationalUsage
        }
        else if (state === 'overLimitUse') {
            status = !isOverLimitFacility
        }
        else if (state === 'autoDebitUse') {
            status = !isAutoDebit
        }
        else if(state === 'block'){
            status = !isBlock
        }
        else{
            toast.error("Invalid Options")
            return;
        }

        axios.post(`${URL}/card/control`, {
            email: localStorage.getItem('email'),
            state,
            status: status
        }).then((res) =>
            toast.success(res.data)
        ).catch(err => {
            toast.error(err.response.data)
        })
    }

    return (
        <div className="ControlCenterBody-container">
            <div className="body-header">
                <div>
                    <h2 className="card-heading">Control Center</h2>
                    <p className="card-number">{card ? "XXXXXXXXXXXXX"+String(card.cardNumber).substr(-4) : "Loading..."}</p>
                    <p className="card-validity">VALILD THRU</p>
                    <p className="card-validity">{card ? card.cardValidity : "Loading..."}</p>
                    <p className="card-about">Manage your card settings and usage</p>
                </div>
            </div>
            <div className="ControlCenterBody-features">
                <ToastContainer />
                <ControlCenterBodyFeaturesCardLeftbtn icon={domesticusage} isSet={isDomesticUsageOpen} name="Domestic Usage" onClick={() => { funcChangeStatus('domesticUse'); setIsDomesticUsageOpen(!isDomesticUsageOpen) }} />
                {/* <ConfirmationModel isOpen={isDomesticUsageOpen} onRequestClose={colseDomesticUsage} name="Domestic Usage" on={DomesticUsage} /> */}
                <ControlCenterBodyFeaturesCardRightbtn icon={internationalusage} isSet={isInternationalUsage} name="International Usage" onClick={() => { setIsInternationalUsage(!isInternationalUsage); funcChangeStatus('InternationalUse') }} />
                {/* <ConfirmationModel isOpen={isInternationalUsage} onRequestClose={() => setIsInternationalUsage(false)} name="International Usage" /> */}
            </div>
            <div className="ControlCenterBody-features">
                <ControlCenterBodyFeaturesCardLeftbtn icon={overlimit} name="Over-Limit facility" isSet={isOverLimitFacility} onClick={() => { funcChangeStatus('overLimitUse'); setIsOverLimitFacility(!isOverLimitFacility) }} />
                {/* <ConfirmationModel isOpen={isOverLimitFacility} onRequestClose={() => setIsOverLimitFacility(false)} name="Over-Limit facility" /> */}
                <ControlCenterBodyFeaturesCardRightbtn icon={autodebit} name="Tap To Pay" isSet={isAutoDebit} onClick={() => { setIsAutoDebit(!isAutoDebit); funcChangeStatus('autoDebitUse') }} />
                {/* <ConfirmationModel isOpen={isAutoDebit} onRequestClose={() => setIsAutoDebit(false)} name="Auto Debit" /> */}
            </div>
            <div className="ControlCenterBody-features">
                <ControlCenterBodyFeaturesCardLeftbtn icon={block} name="Block" isSet={isBlock} onClick={() => { setIsBlock(!isBlock); funcChangeStatus('block') }} />
                {/* <ConfirmationModel isOpen={isBlock} onRequestClose={() => setIsBlock(false)} name="Block" /> */}
                <ControlCenterBodyFeaturesCardRight icon={setpin} name="Set Pin" onClick={handleClickSetpin} />
                <SetpinModal isOpen={isModalOpen} onRequestClose={closeModal} />
            </div>

        </div>
    )
}