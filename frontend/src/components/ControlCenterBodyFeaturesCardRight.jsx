import link from "../Assets/link.png"

export const ControlCenterBodyFeaturesCardRight=(props)=>{
    return (<div className="ControlCenterBody-features-card-r ControlCenterBody-features-card">
    <div>
    <img className="icon" src={link}></img>
        <button>{">"}</button>
    </div>
    <p>{props.name}</p>
</div>)
}