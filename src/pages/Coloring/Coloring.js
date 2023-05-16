import React, { useRef, useState, useEffect } from "react";
import Chat from "../../components/chat";
import { MdOutlineBrush, MdColorLens } from "react-icons/md";
import { TbArrowsMove, TbZoomIn, TbZoomOut, TbMinus, TbPlus } from "react-icons/tb";
import { SketchPicker } from 'react-color';

const Coloring = () => {
    const canvasRef = useRef(null); // canvas는 자체적으로 상태 관리를 함 따로 관리 필요 X
    const [context, setContext] = useState(); // context는 그래픽 드로잉 api를 정의한 인터페이스임
    const imageRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const [color, setColor] = useState("#000000");

    useEffect(() => {
        const canvas = canvasRef.current;
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        const context = canvas?.getContext('2d');
        setContext(context);
        context.strokeStyle = color;
        context.lineWidth = 100;

        const image = imageRef.current;
        image.src = '/assets/coloring01.jpg';
        // 여기는 그냥 캔버스 크기!
        canvas.height = window.innerHeight * 0.8;
        canvas.width = image.width / image.height * canvas.height;

        image.onload = () => {
            // 여기서 이미지 크기를 조정
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
    }, []);

    const decreaseBrushSize = () => {
        context.lineWidth -= 1;
    };

    const increaseBrushSize = () => {
        context.lineWidth += 1;
    };

    const setStrokeColor = (pickedColor) => {
        setColor(pickedColor);
        context.strokeStyle = pickedColor;
    };

    const startDragging = () => {
        setIsDragging(true);
    };

    const finishDragging = () => {
        setIsDragging(false);
    };

    const drawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        if (context) {
            if (!isDragging) {
                context.beginPath();
                context.moveTo(offsetX, offsetY);
            } else {
                context.lineTo(offsetX, offsetY);
                context.stroke();
            }
        }
    };

    return (
        <>
            <header className="bg-amber-400 p-2 space-x-1">
                <button onClick={decreaseBrushSize}>
                    <TbMinus />
                </button>
                <button onClick={increaseBrushSize}>
                    <TbPlus />
                </button>
                <SketchPicker
                    className={isHidden ? "hidden" : "absolute"}
                    color={color}
                    onChange={(color) => setStrokeColor(color.hex)}
                />
                <button onClick={hide}>
                    <MdColorLens />
                </button>
            </header>
            <div className="bg-gray-200 w-full flex">
                <main className="bg-red-200"
                >
                    <img ref={imageRef} alt="coloring background" className="hidden" />
                    <canvas ref={canvasRef}
                        onMouseDown={startDragging}
                        onMouseMove={drawing}
                        onMouseUp={finishDragging}
                        onMouseLeave={finishDragging}
                    />
                </main>
                <div className="bg-green-400 absolute right-0">
                    <Chat />
                </div>
            </div>
        </>
    );
}

export default Coloring;