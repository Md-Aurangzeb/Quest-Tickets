
import { Nav } from "./Nav"
import { TransactionBody } from "./TransactionBody"
export const Transaction=({card})=>{
    return(
        <div className="Transaction-container">
            <Nav/>
            <TransactionBody card={card}/>
        </div>
    )
}