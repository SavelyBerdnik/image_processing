import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const Canvas = ({image, setSrc}) => {
    const canvasRef = useRef()
    const [mousePosition, setMousePosition] = useState()
    const [color, setColor] = useState()
    
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const img = new Image(); 
        const handleImageLoad = () => { 
            context.drawImage(img, 0, 0, 1200, 600); 
            // Draw the image at position (0, 0) on the canvas 
        }; 
        img.addEventListener('load', handleImageLoad); 
        img.src = image; // Set the image source 
        return () => { img.removeEventListener('load', handleImageLoad); // Remove the event listener on cleanup 
        };
    }, [image])

    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.pageX, 
            y: e.pageY})
        const canvas = canvasRef.current
        var context = canvas.getContext('2d');
        setColor(context.getImageData(e.pageX, e.pageY, 1, 1).data)
        console.log(context.getImageData(e.pageX, e.pageY, 1, 1).data)
    }

    return (
        <div>
            <Button variant="outlined" onClick={() => setSrc()}>Назад</Button>
            <canvas ref={canvasRef} width="1200" height='600' onClick={(e) => handleMouseMove(e)}> </canvas>
            {mousePosition && 
            <>
                <p>X: {mousePosition.x}</p>
                <p>Y: {mousePosition.y}</p>
                <p>rgb({color[0]}, {color[1]}, {color[2]})</p>
            </>}
            
        </div>
        
    )
}

export default Canvas;