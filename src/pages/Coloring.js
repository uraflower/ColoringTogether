import React, { useRef, useState, useEffect } from "react";
import Chat from "../components/chat";
import { MdOutlineBrush, MdColorLens } from "react-icons/md";
import { TbArrowsMove, TbEraser, TbZoomIn, TbZoomOut, TbMinus, TbPlus } from "react-icons/tb";
import { SketchPicker } from 'react-color';
import { useLocation } from "react-router-dom";

const PAN = "PAN";
const DRAW = "DRAW";
const ERASE = "ERASE";
const SCROLL_SENSITIVITY = 0.0005;

const Coloring = () => {
  const { state } = useLocation();
  const canvasDrawingRef = useRef(null); // canvas는 자체적으로 상태 관리를 함 따로 관리 필요 X
  const canvasBgRef = useRef(null);
  const canvasCursorRef = useRef(null);
  const [contextCursor, setContextCursor] = useState();
  const [contextDrawing, setContextDrawing] = useState(); // context는 그래픽 드로잉 api를 정의한 인터페이스임
  const [contextBg, setContextBg] = useState();
  const [mode, setMode] = useState(PAN);   // PAN / DRAW / ERASE
  const [isDragging, setIsDragging] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [color, setColor] = useState("#000000");
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [dragStartPoint, setDragStartPoint] = useState({ x: 0, y: 0 });
  const [brushSize, setBrushSize] = useState(1);
  const image = new Image();
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    const canvasDrawing = canvasDrawingRef.current;
    const canvasBg = canvasBgRef.current;
    const canvasCursor = canvasCursorRef.current;
    const _contextDrawing = canvasDrawing?.getContext('2d');
    const _contextBg = canvasBg?.getContext('2d');
    const _contextCursor = canvasCursor?.getContext('2d');
    setContextDrawing(_contextDrawing);
    setContextBg(_contextBg);
    setContextCursor(_contextCursor);

    if (contextBg && contextDrawing) {
      initImage();
      setCanvasSize(contextBg, canvasBg, canvasDrawing, canvasCursor);
    }

    // context.translate(canvasDrawing.width / 3, canvasDrawing.height / 3);
    // contextDrawing.scale(1, 1);
    // contextBg.scale(1, 1);
    setCameraOffset({ x: canvasDrawing.width / 2, y: canvasDrawing.height / 2, });
  }, [contextBg, contextDrawing]);

  const initImage = async () => {
    console.log(state);
    image.src = await state;
  }

  const setCanvasSize = (context, canvasBg, canvasDrawing, canvasCursor) => {
    image.onload = () => {
      canvasBg.height = window.innerHeight * 0.8;
      canvasBg.width = image.width * canvasBg.height / image.height;
      canvasDrawing.height = canvasBg.height;
      canvasDrawing.width = canvasBg.width;
      canvasCursor.height = canvasBg.height;
      canvasCursor.width = canvasBg.width;

      // image size 조절
      context.drawImage(image, 0, 0, canvasBg.width, canvasBg.height);
      console.log(canvasBg.width, canvasBg.height)
      setCanvasReady(true);
    };
  }

  const setModeToPan = () => {
    setMode(PAN);
  };

  const setModeToDraw = () => {
    setMode(DRAW);
  };

  const setModeToErase = () => {
    setMode(ERASE);
  };

  const increaseBrushSize = () => {
    changeBrushSize(contextDrawing.lineWidth + 1);
  };

  const decreaseBrushSize = () => {
    changeBrushSize(contextDrawing.lineWidth - 1);
  };

  const changeBrushSize = (value) => {
    console.log(value);
    setBrushSize(value);
    contextDrawing.lineWidth = value;
  }

  const setBrushColor = (pickedColor) => {
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
    // console.log(nativeEvent);

    const { offsetX, offsetY } = nativeEvent;

    // show cursor
    if (contextCursor) {
      contextCursor.clearRect(0, 0, canvasCursorRef.current.width, canvasCursorRef.current.height); // clear prev cursor
      contextCursor.beginPath();
      contextCursor.arc(offsetX, offsetY, brushSize, 0, 2 * Math.PI);
      contextCursor.fillStyle = color;
      contextCursor.fill();
    }

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

  const erasing = ({ nativeEvent }) => {
    // console.log(nativeEvent);

    const { offsetX, offsetY } = nativeEvent;
    if (contextDrawing) {
      contextDrawing.strokeStyle = "#FFFFFF";
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
      <header className="bg-amber-400 p-3 space-x-1">
        <button onClick={setModeToPan}>
          <TbArrowsMove />
        </button>
        <button onClick={setModeToDraw}>
          <MdOutlineBrush />
        </button>
        <button onClick={setModeToErase}>
          <TbEraser />
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
        <input
          type="range"
          name="brushSize"
          value={brushSize}
          min={1}
          max={50}
          onChange={(event) => changeBrushSize(event.target.value)}
        />
        <button onClick={increaseBrushSize}>
          <TbPlus />
        </button>
        <SketchPicker
          className={isHidden ? "hidden" : "absolute z-50"}
          color={color}
          onChange={(color) => setBrushColor(color.hex)}
        />
        <button onClick={hide}>
          <MdColorLens />
        </button>
      </header>
      <div className="bg-gray-200 flex">
        <main className="relative bg-neutral-500 w-full h-[calc(100vh-3rem)] flex justify-center items-center">
          <canvas
            ref={canvasCursorRef} className="absolute z-30" />
          <canvas ref={canvasBgRef}
            className={styleOnCanvas()}
            onTouchStart={(e) => startDragging(e)}
            onMouseDown={(e) => startDragging(e)}

            onTouchMove={handleMouseMove()} // 실제 draw는 아래 캔버스에서 일어남
            onMouseMove={handleMouseMove()} // 이 캔버스가 위에 있으니까 mouse event handling을 여기서 해줌

            onTouchEnd={finishDragging}
            onMouseUp={finishDragging}
            onMouseLeave={finishDragging}

            onWheel={(e) => zoomWithWheel(e.deltaY * SCROLL_SENSITIVITY)}
          />
          <canvas ref={canvasDrawingRef}
            className="absolute z-30"
          />
          {
            canvasReady ?
              <div style={{ width: canvasBgRef.current.width, height: canvasBgRef.current.height }} className="absolute bg-white z-20"></div>
              : <></>
          }
        </main>
        <div className="bg-green-400 float-right">
          <Chat />
        </div>
      </div>
    </>
  );

  function styleOnCanvas() {
    switch (mode) {
      case PAN:
        if (isDragging)
          return "absolute cursor-grabbing z-40";
        else
          return "absolute cursor-grab z-40";
      case DRAW:
        return "absolute cursor-none z-40";
      case ERASE:
        return "absolute z-40";
      default:
        return "absolute z-40"
    }
  }

  function handleMouseMove() {
    switch (mode) {
      case PAN:
        return panning;
      case DRAW:
        return drawing;
      case ERASE:
        return erasing;
    }
  }
}

export default Coloring;