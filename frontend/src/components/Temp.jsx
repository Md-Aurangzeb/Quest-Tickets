import React from "react"
import link from "../Assets/link.png"
import "./tempStyle.css"
export const Temp=(props)=>{
    const handleButtonClick = () => {
        if (props.onClick) {
          props.onClick();
        }
      };
    return (<div className="ControlCenterBody-features-card-l ControlCenterBody-features-card">
    <div>
    
<img className="icon" src={link}></img>
<label class="switch">
  <input type="checkbox" />
  <span class="slider round"></span>
</label>
    </div>
    <p>{props.name}</p>
</div>)
}