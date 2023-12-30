import React from "react"

export const ControlCenterBodyFeaturesCardRightbtn = (props) => {
    const handleButtonClick = () => {
        if (props.onClick) {
          props.onClick();
        }
      };
    return (<div className="ControlCenterBody-features-card-r ControlCenterBody-features-card">
        <div>
            <img className="icon-c" src={props.icon} alt=""></img>
            <input type="checkbox" checked={props.isSet} name="checkbox" id="toggle" />
            <label onClick={handleButtonClick} className="switch" htmlFor="toggle"></label>
        </div>
        <p className="bold">{props.name}</p>
    </div>)
}