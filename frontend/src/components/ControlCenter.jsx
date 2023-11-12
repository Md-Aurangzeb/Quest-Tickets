
import { ControlCenterBody } from "./ContorlCenterBody"
import { Nav } from "./Nav"
export const ControlCenter=()=>{
    return(
        <div className="ControlCenter-container">
            <Nav/>
            <ControlCenterBody/>
        </div>
    )
}