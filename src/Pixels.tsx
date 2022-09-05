import React, { useEffect, useRef, useState } from "react"
import ControlButtons from "./ControlButtons";
import { Line,Position } from "./dataModel/canvasDataModel";
import { mouseToWorldPosition } from "./utils/canvasUtil";

const props = { 
    style : {borderStyle : "solid"},
    width : 1000,
    height : 1000
}

function Pixels(){

    const canvasRef = useRef<HTMLCanvasElement>(null);

    //canvas related states
    const [lines, setLines] = useState<Array<Line>>([]);
    const [currentLine , setCurrentLine] = useState <Line>();
    const [scale , setScale] = useState <number>(1);
    const [position, setCanvasPosition] = useState <Position>({x : 0 ,y : 0 });

    const startLine =  (ev : React.MouseEvent<HTMLCanvasElement>) =>{
        let canvas = canvasRef.current
        if(ev.ctrlKey) return
        if(!canvas) return
        if(currentLine){addLine(); return;}
        let { x,y } = mouseToWorldPosition(ev,canvas, position, scale)
        setCurrentLine({x1 : x, y1: y, x2: x, y2 :y})
    }

  

    const changeCurrentLine =  (ev : React.MouseEvent<HTMLCanvasElement>) =>{
        ev.preventDefault();

        let canvas = canvasRef.current
        if(!canvas) return
        if(!currentLine) return
        
        let { x,y } = mouseToWorldPosition(ev,canvas, position, scale)
        
        setCurrentLine({x1 : currentLine!.x1, y1 : currentLine!.y1 , x2  : x,  y2 : y})
    }

    const addLine = () =>{
        let canvas = canvasRef.current
        if(!canvas || !currentLine) return

        setLines(lines.concat(currentLine))
        setCurrentLine(undefined)
    }


    const zoom = (ev : WheelEvent) => {
        let canvas = canvasRef.current
        if(!canvas) return
        ev.preventDefault()

        setScale((scale)=>{
            let newScale = scale * (ev.deltaY < 0 ? 1.1: 0.90)
            if(newScale < 1) newScale =  1
            if(newScale > 300) newScale = 300
            return newScale
        });
    }

    useEffect(() =>{
        let canvas = canvasRef.current
        if(!canvas) return;
        canvas.addEventListener('wheel', zoom, {passive : false} )

        return () => canvas?.removeEventListener('wheel',zoom)
    }, [canvasRef])

    useEffect(() =>{
        let canvas = canvasRef.current
        var ctx = canvas?.getContext("2d");
        if(!ctx || !canvas) return;
        
       
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.save()
        ctx.translate(position.x, position.y)
        ctx.scale(scale, scale)
        ctx.strokeRect(0,0,canvas.width,canvas.height)
        
        
        if(currentLine){
            ctx?.beginPath();
            ctx?.moveTo(currentLine.x1, currentLine.y1);
            ctx?.lineTo(currentLine.x2, currentLine.y2);
            ctx?.stroke();
        }

        lines.forEach(currentLine => {
            ctx?.beginPath();
            ctx?.moveTo(currentLine.x1, currentLine.y1);
            ctx?.lineTo(currentLine.x2, currentLine.y2);
            ctx?.stroke();
        });
        ctx.restore()
    }, [lines,currentLine,scale,position.x,position.y])

    return <div>
         <ControlButtons></ControlButtons>
         <p/>
         <canvas style = {props.style} onMouseDown= {startLine} onMouseMove = {changeCurrentLine} onMouseUp={addLine} 
        ref={canvasRef} height = {props.height} width = {props.width} />
 
       
        </div>
}



export default Pixels;