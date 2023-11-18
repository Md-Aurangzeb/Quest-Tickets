export const ControlCenterBodyFeaturesCardRight=(props)=>{
    const handleButtonClick = () => {
        if (props.onClick) {
          props.onClick();
        }
      };
    return (<div className="ControlCenterBody-features-card-r ControlCenterBody-features-card">
    <div>
    <img className="icon-c" src={props.icon} alt=""></img>
        <button onClick={handleButtonClick}>{">"}</button>
    </div>
    <p className="bold">{props.name}</p>
</div>)
}