import { ConfirmationModel } from "./Modal/ConfirmationModel";
import { ControlCenterBodyFeaturesCardLeftbtn } from "./ControlCenterBodyFeaturesCardLeftbtn"
import { ControlCenterBodyFeaturesCardRight } from "./ControlCenterBodyFeaturesCardRight"
import { ControlCenterBodyFeaturesCardRightbtn } from "./ControlCenterBodyFeaturesCardRightbtn";
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
    const [isDomesticUsageOpen, setIsDomesticUsageOpen] = useState(false);
    const [isInternationalUsage, setIsInternationalUsage] = useState(false);
    const [isOverLimitFacility, setIsOverLimitFacility] = useState(false);
    const [isAutoDebit, setIsAutoDebit] = useState(false);
    const [card, setCard] = useState()
    const [isBlock, setIsBlock] = useState(false);
    const openDomesticUsage = () => {
        setIsDomesticUsageOpen(true);
    }
    const colseDomesticUsage = () => {
        setIsDomesticUsageOpen(false);
    }
    const DomesticUsage = false;

    useEffect(() => {
        axios.post(`${URL}/card/get`, { email: localStorage.getItem('email') }).then((response) => {
            setCard(response.data)
        }).catch(err => {
            console.log(err)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="ControlCenterBody-container">
            <div className="body-header">
                <div>
                    <h2 className="card-heading">Control Center</h2>
                    <p className="card-number">{card ? card.cardNumber : "N/A"}</p>
                    <p className="card-validity">VALILD THRU</p>
                    <p className="card-validity">{card ? card.cardValidity : "N/A"}</p>
                    <p className="card-about">Manage your card settings and usage</p>
                </div>
            </div>
            <div className="ControlCenterBody-features">
                <ControlCenterBodyFeaturesCardLeftbtn icon={domesticusage} name="Domestic Usage" onClick={openDomesticUsage} />
                <ConfirmationModel isOpen={isDomesticUsageOpen} onRequestClose={colseDomesticUsage} name="Domestic Usage" on={DomesticUsage} />
                <ControlCenterBodyFeaturesCardRightbtn icon={internationalusage} name="International Usage" onClick={() => setIsInternationalUsage(true)} />
                <ConfirmationModel isOpen={isInternationalUsage} onRequestClose={() => setIsInternationalUsage(false)} name="International Usage" />
            </div>
            <div className="ControlCenterBody-features">
                <ControlCenterBodyFeaturesCardLeftbtn icon={overlimit} name="Over-Limit facility" onClick={() => setIsOverLimitFacility(true)} />
                <ConfirmationModel isOpen={isOverLimitFacility} onRequestClose={() => setIsOverLimitFacility(false)} name="Over-Limit facility" />
                <ControlCenterBodyFeaturesCardRightbtn icon={autodebit} name="Auto Debit" onClick={() => setIsAutoDebit(true)} />
                <ConfirmationModel isOpen={isAutoDebit} onRequestClose={() => setIsAutoDebit(false)} name="Auto Debit" />
            </div>
            <div className="ControlCenterBody-features">
                <ControlCenterBodyFeaturesCardLeftbtn icon={block} name="Block" onClick={() => setIsBlock(true)} />
                <ConfirmationModel isOpen={isBlock} onRequestClose={() => setIsBlock(false)} name="Block" />
                <ControlCenterBodyFeaturesCardRight icon={setpin} name="Set Pin" onClick={handleClickSetpin} />
                <SetpinModal isOpen={isModalOpen} onRequestClose={closeModal} />
            </div>

        </div>
    )
}