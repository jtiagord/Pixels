import React, { useEffect, useRef, useState } from "react"
import ControlButtons from "./ControlButtons";
import { Circle,FreeDraw,Line,Position, Shape, Square} from "./dataModel/canvasDataModel";
import ActionType from "./dataModel/controlButtonsDataModel";

import { mouseToWorldPosition } from "./utils/canvasUtil";

const props = { 
    style : {borderStyle : "solid"},
    width : 1000,
    height : 1000
}

function Canvas(){

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const currentAction = useRef<Function>(createCircle);

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
        setCurrentShape(currentAction.current(x,y))
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

    const onButtonPress =  (actionType : ActionType) => {
        switch(actionType){
            case ActionType.LINE:
                currentAction.current = createLine
                break;
            case ActionType.CIRCLE:
                currentAction.current = createCircle
                break;
            case ActionType.SQUARE :
                currentAction.current = createSquare
                break;
            case ActionType.FREEDRAW :
                currentAction.current = createFreeDraw
                break;
            default:
                currentAction.current = createLine
        }
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
        
        
        currentShape?.draw(ctx)

        lines.forEach(line => {
            line.draw(ctx!)
        });

        ctx.restore()
    }, [lines,currentShape,scale,position.x,position.y])

    return <div>
            <ControlButtons onButtonChange={onButtonPress}></ControlButtons>
            <p/>
         <canvas style = {props.style} onMouseDown= {startLine} onMouseMove = {changeCurrentShape} onMouseUp={addShape} 
                ref={canvasRef} height = {props.height} width = {props.width} />
        </div>
}

function createCircle(x: number, y : number) : Shape{
    return new Circle(x,y,x,y);
}

function createLine(x: number, y : number) : Shape{
    return new Line(x,y,x,y);
}

function createSquare(x: number, y : number) : Shape{
    return new Square(x,y,x,y);
}

function createFreeDraw(x: number, y : number) : Shape{
    return new FreeDraw(x,y);
}





export default Canvas;