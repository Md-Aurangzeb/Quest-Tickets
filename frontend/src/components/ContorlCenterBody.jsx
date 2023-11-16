import Modal from 'react-modal';
import { ControlCenterBodyFeaturesCardLeft } from "./ControlCenterBodyFeaturesCardLeft"
import { ControlCenterBodyFeaturesCardRight } from "./ControlCenterBodyFeaturesCardRight"
import {SetpinModal} from "./Modal/SetpinModal"
import { useState } from 'react';
export const ControlCenterBody = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const handleClickSetpin=()=>{
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
      };
    const handleClickViewStatement=()=>{
        console.log("view statement");
    }
    return (
        <div className="ControlCenterBody-container">
            <div className="body-header">
                <h2 className="card-heading">Control Center</h2>
                <p className="card-number">1234 1234 1234 1234</p>
                <p className="card-about">Manage your card settings and usage</p>
            </div>
            <div className="ControlCenterBody-features">
                <ControlCenterBodyFeaturesCardLeft icon="fa-solid fa-list" name="Domestic Usage" />
                <ControlCenterBodyFeaturesCardRight icon="" name="International Usage" />
            </div>
            <div className="ControlCenterBody-features">
                <ControlCenterBodyFeaturesCardLeft icon="fa-solid fa-list" name="Block and Replace" />
                <ControlCenterBodyFeaturesCardRight icon="" name="Activate-E Statement" />
            </div>
            <div className="ControlCenterBody-features">
                <ControlCenterBodyFeaturesCardLeft icon="fa-solid fa-list" name="Over-Limit facility" />
                <ControlCenterBodyFeaturesCardRight icon="" name="Auto Debit" />
            </div>
            <div className="ControlCenterBody-features">
                <ControlCenterBodyFeaturesCardLeft icon="fa-solid fa-list" name="View Statement" onClick={handleClickViewStatement}/>
                <ControlCenterBodyFeaturesCardRight icon="" name="Set Pin" onClick={handleClickSetpin}/>
                <SetpinModal isOpen={isModalOpen} onRequestClose={closeModal} />
            </div>

        </div>
    )
}