import ColorPickerContainer from "../components/ColorPickerContainer";
import Header from "../components/Header";
import { PainterContext } from "../contexts/PainterContext";
import { useState } from "react";
import Canvas from "../components/Canvas";
import CanvasLib from "../libs/CanvasLib";

export default function Home() {
  //selected color from color picker
  //set black color as default
  const [selColor, setSelColor] = useState("#000000");

  //16x16 2D Array that holds color data
  const [pixels, setPixels] = useState(CanvasLib.createEmptyCanvas());

  //will be called by Cell component
  const paint = (yPos, xPos) => {
    //copy from old 2d Array
    const newPixels = CanvasLib.copyCanvas(pixels);
    newPixels[yPos][xPos] = selColor;
    setPixels(newPixels);
    //your code here
  };

  const clear = () => {
    //Hint : use CanvasLib.createEmptyCanvas()
    setPixels(CanvasLib.createEmptyCanvas());
  };

  const random = () => {
    const a = [];
    const color = CanvasLib.createRandomCanvas();
    for (let i = 0; i < 16; i++) {
      a.push([]);
      for (let j = 0; j < 16; j++)
        a[i].push(color[Math.floor(Math.random() * 100) % 16]);
    }
    setPixels(a);
  };
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "GhostWhite" }}>
      <PainterContext.Provider value={{ selColor, setSelColor, pixels, paint }}>
        <Header />
        <ColorPickerContainer />
        <Canvas />

        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-dark" onClick={clear}>
            Clear
          </button>
          <button className="btn btn-dark" onClick={random}>
            Random Color
          </button>
        </div>
      </PainterContext.Provider>
    </div>
  );
}
