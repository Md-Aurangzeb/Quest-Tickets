import React from "react"
import link from "../Assets/link.png"
export const ControlCenterBodyFeaturesCardLeft=(props)=>{
    return (<div className="ControlCenterBody-features-card-l ControlCenterBody-features-card">
    <div>
    
<img className="icon" src={link}></img>
        <button>{">"}</button>
    </div>
    <p>{props.name}</p>
</div>)
}