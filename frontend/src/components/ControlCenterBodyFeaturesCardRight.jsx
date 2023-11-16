import link from "../Assets/link.png"

export const ControlCenterBodyFeaturesCardRight=(props)=>{
    const handleButtonClick = () => {
        if (props.onClick) {
          props.onClick();
        }
      };
    return (<div className="ControlCenterBody-features-card-r ControlCenterBody-features-card">
    <div>
    <img className="icon" src={link}></img>
        <button onClick={handleButtonClick}>{">"}</button>
    </div>
    <p>{props.name}</p>
</div>)
}