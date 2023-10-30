import  ActionType  from "../dataModel/controlButtonsDataModel";

const constProps = { 
    style : {
        margin : "50px 50px 50px 50px" 
    },
    width : 1000,
    height : 1000
}

interface ControlButtonsProps{
    onButtonChange : (action : ActionType) => void
}

function ControlButtons({onButtonChange} : ControlButtonsProps){
    return  <div>
                <button style={constProps.style} onClick={()=>onButtonChange(ActionType.DRAG)}> Drag </button>
                <button style={constProps.style} onClick={()=>onButtonChange(ActionType.LINE)}> Line </button>
                <button style={constProps.style} onClick={()=>onButtonChange(ActionType.FREEDRAW)}> Free Draw </button>
                <button style={constProps.style} onClick={()=>onButtonChange(ActionType.CIRCLE)}> Circle </button>
                <button style={constProps.style} onClick={()=>onButtonChange(ActionType.SQUARE)}> Square </button>
            </div>
    
}


export default ControlButtons;