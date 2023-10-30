import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CanvasResponse } from "../dataModel/responseModels";
import Canvas from "./Canvas"


function Pixels(){
    const { canvasId } = useParams();
    let [canvasResponse , setCanvas]= useState<CanvasResponse>()
    let [error , setError]= useState<any>()
    useEffect(()=>{
        let fetchResponse =  await fetch(`localhost:8080/shapes/${canvasId}`)
    },[canvasId])

    return <div> 
        <Canvas/>
    </div>
}



