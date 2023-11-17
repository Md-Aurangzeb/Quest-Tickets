import React from "react"
import link from "../Assets/link.png"
export const ControlCenterBodyFeaturesCardLeft=(props)=>{
    const handleButtonClick = () => {
        if (props.onClick) {
          props.onClick();
        }
      };
    return (<div className="ControlCenterBody-features-card-l ControlCenterBody-features-card">
    <div>
    
<img className="icon" src={link} alt=""></img>
        <button onClick={handleButtonClick}>{">"}</button>
    </div>
    <p>{props.name}</p>
</div>)
}