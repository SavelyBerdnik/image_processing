import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styles from "./canvas.module.css";

const Canvas = ({image, setSrc}) => {
    const canvasRef = useRef()
    const squareColorRef = useRef()
    const [mousePosition, setMousePosition] = useState()
    const [color, setColor] = useState()
    const [imageSize, setImageSize] = useState({width: 0, height: 0})
    let squareColorStyles = {
        width: '20px',
        height: '20px',
        border: '1px solid #000',
        backgroundColor: color
    }
    
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const img = new Image();  
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            setImageSize({width: img.width, height: img.height})
            context.drawImage(img, 0, 0, img.width, img.height);
        }
        img.src = URL.createObjectURL(image); // Set the image source 
        setImageSize({width: img.width, height: img.height})
    }, [image])

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current
        let xPosition = e.clientX - canvas.getBoundingClientRect().left
        let yPosition = e.clientY - canvas.getBoundingClientRect().top
        setMousePosition({
            x: xPosition, 
            y: yPosition})
        var context = canvas.getContext('2d');
        let rgb = context.getImageData(xPosition, yPosition, 1, 1).data 
        setColor('rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')')
    }

    return (
        <div className={styles.Canvas}>
            <canvas ref={canvasRef} onClick={(e) => handleMouseMove(e)}> </canvas>
            
            <p>Width: {imageSize.width}</p>
            <p>Height: {imageSize.height}</p>
            {mousePosition && 
            <>
                <p>X: {mousePosition.x}</p>
                <p>Y: {mousePosition.y}</p>
                <div ref={squareColorRef} style={squareColorStyles}></div>
                <p>{color}</p>
            </>}
            <Button variant="outlined" onClick={() => setSrc()}>Назад</Button>
        </div>
        
    )
}

export default Canvas;