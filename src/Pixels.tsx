import React, { useEffect, useRef, useState } from "react"


interface Line{
    x1 : number
    y1 : number 
    x2 : number
    y2 : number 
}

function Pixels(){

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [lines, setLines] = useState<Array<Line>>([]);
    const [currentLine , setCurrentLine] = useState <Line>();

    const startLine =  (ev : React.MouseEvent<HTMLCanvasElement>) =>{
        let canvas = canvasRef.current
        
        if(!canvas) return
        let bx = canvas?.getBoundingClientRect()
        setCurrentLine({x1 : ev.clientX-bx.left, y1: ev.clientY-bx.top, x2: ev.clientX-bx.left, y2 :ev.clientY-bx.top})
    }

    const changeCurrentLine =  (ev : React.MouseEvent<HTMLCanvasElement>) =>{
        let canvas = canvasRef.current
        if(!canvas || !currentLine) return
        let bx = canvas?.getBoundingClientRect()
        setCurrentLine({x1 : currentLine!.x1, y1 : currentLine!.y1,  x2  : ev.clientX - bx.left,  y2 : ev.clientY - bx.top})
    }

    const addLine = () =>{
        let canvas = canvasRef.current
        if(!canvas || !currentLine) return

        setLines(lines.concat(currentLine))

        setCurrentLine(undefined)
    }



    useEffect(() =>{
    
        let canvas = canvasRef.current
        var ctx = canvas?.getContext("2d");
        if(!ctx || !canvas) return;
        ctx.clearRect(0,0,canvas.width,canvas.height)
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

   
    }, [lines,currentLine])

    return <canvas onMouseDown= {startLine} onMouseMove = {changeCurrentLine} onMouseUp={addLine} 
    ref={canvasRef} width={1000} height = {1000}/>
}


export default Pixels;