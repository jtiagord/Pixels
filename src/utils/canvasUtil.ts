import { Position, Line } from "../dataModel/canvasDataModel";


function mouseToWorldPosition(ev : React.MouseEvent<HTMLCanvasElement>,
     canvas : HTMLCanvasElement, offset: Position, scale: number) : Position{
    let bounds = canvas.getBoundingClientRect();
    let x = (ev.clientX-bounds.left - offset.x)/scale 
    let y = (ev.clientY-bounds.top - offset.y)/scale 
    return {x,y}
}


export  {mouseToWorldPosition}