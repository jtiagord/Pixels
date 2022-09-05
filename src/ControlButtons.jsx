const props = { 
    style : {
        margin : "50px 50px 50px 50px" 
    },
    width : 1000,
    height : 1000
}

function ControlButtons(){

    return  <div>
                <button style={props.style}> Drag </button>
                <button style={props.style}> Line </button>
                <button style={props.style}> Free Draw </button>
                <button style={props.style}> Circle </button>
                <button style={props.style}> Square </button>
            </div>
    
}


export default ControlButtons;