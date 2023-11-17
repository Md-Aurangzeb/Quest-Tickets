import React from "react"
import link from "../Assets/link.png"
import "./tempStyle.css"
export const Temp = (props) => {
  return (<div className="ControlCenterBody-features-card-l ControlCenterBody-features-card">
    <div>

      <img className="icon" src={link} alt=""></img>
      <label class="switch">
        <input type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <p>{props.name}</p>
  </div>)
}