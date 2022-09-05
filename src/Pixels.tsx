import React, { useEffect, useRef, useState } from "react"
import { createJsxText } from "typescript"


interface Line{
    x1 : number
    y1 : number 
    x2 : number
    y2 : number 
}

interface Position{
    x : number
    y : number
}

function Pixels(){

    const canvasRef = useRef<HTMLCanvasElement>(null);

    //canvas related states
    const [lines, setLines] = useState<Array<Line>>([]);
    const [currentLine , setCurrentLine] = useState <Line>();
    const [scale , setScale] = useState <number>(1);
    const [position, setCanvasPosition] = useState <Position>({x : 0, y : 0});


    const [mouseStartPosition, setMouseStartPosition] = useState <Position>();

    const startLine =  (ev : React.MouseEvent<HTMLCanvasElement>) =>{
        let canvas = canvasRef.current
        if(ev.ctrlKey) return
        if(!canvas) return
        if(currentLine){addLine(); return;}
        let bounds = canvas.getBoundingClientRect();
        let x = (ev.clientX-bounds.left)/scale - position.x 
        let y = (ev.clientY-bounds.top)/scale - position.y

        setMouseStartPosition({x,y})
        setCurrentLine({x1 : x, y1: y, x2: x, y2 :y})
    }

    const changeCurrentLine =  (ev : React.MouseEvent<HTMLCanvasElement>) =>{
        ev.preventDefault();

        let canvas = canvasRef.current
        if(!canvas) return
        if(!currentLine) return
        let bounds = canvas.getBoundingClientRect();
        let x = (ev.clientX-bounds.left)/scale - position.x 
        let y = (ev.clientY-bounds.top)/scale - position.y
        console.log(ev.buttons + "-" + ev.ctrlKey)
        if(ev.ctrlKey && ev.buttons === 1 && mouseStartPosition){
            setCanvasPosition((position)=>{
                return { x : position.x + 1, y : position.y + 1 }
            })
        }
        setCurrentLine({x1 : currentLine!.x1, y1 : currentLine!.y1 , x2  : x,  y2 : y})
    }

    const addLine = () =>{
        let canvas = canvasRef.current
        if(!canvas || !currentLine) return

        setLines(lines.concat(currentLine))
        setMouseStartPosition(undefined)
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

    return <canvas style = {{borderStyle : "solid"}} onMouseDown= {startLine} onMouseMove = {changeCurrentLine} onMouseUp={addLine} 
    ref={canvasRef} width={1000} 
     height = {1000}/>
}



export default Pixels;