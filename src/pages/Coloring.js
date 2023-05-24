import React, { useRef, useState, useEffect } from "react";
import Chat from "../components/chat";
import { MdOutlineBrush, MdColorLens } from "react-icons/md";
import { TbArrowsMove, TbZoomIn, TbZoomOut, TbMinus, TbPlus } from "react-icons/tb";
import { SketchPicker } from 'react-color';
import { useLocation } from "react-router-dom";

const PAN = "PAN";
const DRAW = "DRAW";
const SCROLL_SENSITIVITY = 0.0005;

const Coloring = () => {
  const { state } = useLocation();
  const canvasDrawingRef = useRef(null); // canvas는 자체적으로 상태 관리를 함 따로 관리 필요 X
  const canvasBgRef = useRef(null);
  const [contextDrawing, setContextDrawing] = useState(); // context는 그래픽 드로잉 api를 정의한 인터페이스임
  const [contextBg, setContextBg] = useState();
  const imageRef = useRef(null);
  const [mode, setMode] = useState(PAN);   // pan / draw
  const [isDragging, setIsDragging] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [color, setColor] = useState("#000000");
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [dragStartPoint, setDragStartPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvasDrawing = canvasDrawingRef.current;
    const canvasBg = canvasBgRef.current;
    const _contextDrawing = canvasDrawing?.getContext('2d');
    const _contextBg = canvasBg?.getContext('2d');
    setContextDrawing(_contextDrawing);
    setContextBg(_contextBg);
    _contextDrawing.strokeStyle = color;
    _contextDrawing.lineWidth = 100;

    if (contextBg) { initImage(contextBg, canvasBg); }
    canvasDrawing.width = canvasBg.width;
    canvasDrawing.height = canvasBg.height;
    // context.translate(canvasDrawing.width / 3, canvasDrawing.height / 3);
    // contextDrawing.scale(1, 1);
    // contextBg.scale(1, 1);
    setCameraOffset({ x: canvasDrawing.width / 2, y: canvasDrawing.height / 2, });
  }, []);

  const initImage = async (context, canvas) => {
    console.log(state);
    // const image = imageRef.current;
    const image = new Image();
    console.log(image);
    image.src = await state;

    // 여기는 그냥 캔버스 크기!
    canvas.height = window.innerHeight * 0.8;
    canvas.width = image.width / image.height * canvas.height;

    image.onload = () => {
      // 여기서 이미지 크기를 조정
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }

  const setModeToPan = () => {
    setMode(PAN);
  };

  const setModeToDraw = () => {
    setMode(DRAW);
  };

  const decreaseBrushSize = () => {
    contextDrawing.lineWidth -= 1;
  };

  const increaseBrushSize = () => {
    contextDrawing.lineWidth += 1;
  };

  const setStrokeColor = (pickedColor) => {
    setColor(pickedColor);
    contextDrawing.strokeStyle = pickedColor;
  };

  const hide = () => {
    setIsHidden(!isHidden);
  };

  const zoomIn = () => {
    setScale(scale + 10);
  };

  const zoomOut = () => {
    setScale(scale - 10);
  };

  const zoomWithWheel = (zoomAmount, zoomFactor) => {
    console.log(zoomAmount);
    if (zoomAmount) {
      setScale(scale + zoomAmount);
    }
    else if (zoomFactor) {
      // scale = zoomFactor * 
    }
    setScale(Math.min(scale, 5));
    setScale(Math.max(scale, 0.1));
  };

  const startDragging = (e) => {
    console.log(e.touches);
    let current = { x: 0, y: 0 };

    // handle touch action (ex. tablet, mobile ...)
    if (e.touches !== undefined) {
      current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
    else {
      current = {
        x: e.clientX,
        y: e.clientY,
      };
    }

    setIsDragging(true);
    setDragStartPoint({
      x: current.x / scale - cameraOffset.x,
      y: current.y / scale - cameraOffset.y,
    });
    console.log(dragStartPoint);
  };

  const finishDragging = () => {
    setIsDragging(false);
  };

  const drawing = ({ nativeEvent }) => {
    console.log(nativeEvent);

    const { offsetX, offsetY } = nativeEvent;
    if (contextDrawing) {
      if (!isDragging) {
        contextDrawing.beginPath();
        contextDrawing.moveTo(offsetX, offsetY);
      } else {
        contextDrawing.lineTo(offsetX, offsetY);
        contextDrawing.stroke();
      }
    }
  };

  const panning = (e) => {
    if (contextDrawing) {
      if (isDragging) {
        const current = {
          x: e.clientX,
          y: e.clientY
        };
        setCameraOffset({
          x: current.x / scale - dragStartPoint.x,
          y: current.y / scale - dragStartPoint.y,
        });
        setDragStartPoint({
          x: current.x,
          y: current.y,
        });
        console.log(`offset:`, cameraOffset);
      }
    }
  };

  return (
    <>
      <header className="bg-amber-400 p-2 space-x-1">
        <button onClick={setModeToPan}>
          <TbArrowsMove />
        </button>
        <button onClick={setModeToDraw}>
          <MdOutlineBrush />
        </button>
        <button onClick={zoomIn}>
          <TbZoomIn />
        </button>
        <span>{ }</span>
        <button onClick={zoomOut}>
          <TbZoomOut />
        </button>
        <button onClick={decreaseBrushSize}>
          <TbMinus />
        </button>
        <button onClick={increaseBrushSize}>
          <TbPlus />
        </button>
        <SketchPicker
          className={isHidden ? "hidden" : "absolute z-30"}
          color={color}
          onChange={(color) => setStrokeColor(color.hex)}
        />
        <button onClick={hide}>
          <MdColorLens />
        </button>
      </header>
      <div className="bg-gray-200 w-full flex">
        <main className="relative bg-red-200">
          <canvas ref={canvasBgRef}
            className="absolute " />
          <canvas ref={canvasDrawingRef}
            className={mode === DRAW ? "absolute cursor-crosshair" : isDragging ? "absolute cursor-grabbing" : "absolute cursor-grab"}

            onTouchStart={(e) => startDragging(e)}
            onMouseDown={(e) => startDragging(e)}

            onTouchMove={mode === DRAW ? drawing : panning}
            onMouseMove={mode === DRAW ? drawing : panning}

            onTouchEnd={finishDragging}
            onMouseUp={finishDragging}
            onMouseLeave={finishDragging}

            onWheel={(e) => zoomWithWheel(e.deltaY * SCROLL_SENSITIVITY)}
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