import React from "react"
import { useState } from "react";
export const ControlCenterBodyFeaturesCardRightbtn = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleButtonClick = () => {
        if (props.onClick) {
          props.onClick();
          setIsChecked(!isChecked);
        }
      };
    return (<div className="ControlCenterBody-features-card-r ControlCenterBody-features-card">
        <div>
            <img className="icon-c" src={props.icon} alt=""></img>
            <input type="checkbox" checked={isChecked} name="checkbox" id="toggle" />
            <label onClick={handleButtonClick} className="switch" htmlFor="toggle"></label>
        </div>
        <p className="bold">{props.name}</p>
    </div>)
}