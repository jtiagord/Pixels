import React, { useEffect, useRef, useState } from "react"
import ControlButtons from "./ControlButtons";
import { Circle,Line,Position, Shape} from "./dataModel/canvasDataModel";

import { mouseToWorldPosition } from "./utils/canvasUtil";

const props = { 
    style : {borderStyle : "solid"},
    width : 1000,
    height : 1000
}

function Pixels(){

    const canvasRef = useRef<HTMLCanvasElement>(null);

    //canvas related states
    const [lines, setLines] = useState<Array<Shape>>([]);
    const [currentShape , setCurrentShape] = useState <Shape>();
    const [scale , setScale] = useState <number>(1);
    const [position, setCanvasPosition] = useState <Position>({x : 0 ,y : 0 });

    const startLine =  (ev : React.MouseEvent<HTMLCanvasElement>) =>{
        let canvas = canvasRef.current
        if(!canvas) return
        if(currentShape){addShape(); return;} //exception when u leave the mouse from the canvas

        let { x,y } = mouseToWorldPosition(ev,canvas, position, scale)
        setCurrentShape(new Line(x,y,x,y))
    }

  

    const changeCurrentShape =  (ev : React.MouseEvent<HTMLCanvasElement>) =>{
        ev.preventDefault();

        let canvas = canvasRef.current
        if(!canvas) return
        if(!currentShape) return
        
        let { x,y } = mouseToWorldPosition(ev,canvas, position, scale)
        
        setCurrentShape(currentShape.moveEndPoint(x,y))
    }

    const addShape = () =>{
        let canvas = canvasRef.current
        if(!canvas || !currentShape) return

        setLines(lines.concat(currentShape))
        setCurrentShape(undefined)
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
        console.log("1")
        let canvas = canvasRef.current
        var ctx = canvas?.getContext("2d");
        if(!ctx || !canvas) return;
        
       
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.save()
        ctx.translate(position.x, position.y)
        ctx.scale(scale, scale)
        ctx.strokeRect(0,0,canvas.width,canvas.height)
        
        
        currentShape?.draw(ctx)

        lines.forEach(line => {
            line.draw(ctx!)
        });

        ctx.restore()
    }, [lines,currentShape,scale,position.x,position.y])

    return <div>
            <ControlButtons></ControlButtons>
            <p/>
         <canvas style = {props.style} onMouseDown= {startLine} onMouseMove = {changeCurrentShape} onMouseUp={addShape} 
                ref={canvasRef} height = {props.height} width = {props.width} />
        </div>
}



export default Pixels;