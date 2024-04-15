import { useRef, useState } from "react";
import "./App.css";
import CanvasDraw from "react-canvas-draw";
import SelectionBtn from "./components/SelectionBtn";
import FunctionBtn from "./components/FunctionBtn";
import jsPDF from "jspdf";
import { Button, Popconfirm } from "antd";

function App() {
  const [color, setColor] = useState("#000000");
  const [radius, setRadius] = useState(1);
  const [bgColor, setBgColor] = useState("FFFFFF");
  const type = ["color", "size"];

  const draw = useRef(null);

  const clearHandler = () => {
    draw.current.eraseAll();
    console.log(localStorage.getItem("canvas"));
  };
  const saveHandler = () => {
    const savedData = draw.current.getSaveData();
    localStorage.setItem("canvas", savedData);
  };

  const undoHandler = () => {
    draw.current.undo();
  };


  const downloadHandler = () => {
    if (localStorage.getItem("canvas") !== null) {
      const url = draw.current.canvas.drawing.toDataURL("image/png");
      const pdf = new jsPDF();

      pdf.setFillColor(bgColor);
      pdf.rect(0, 0, 210, 297, "F");
      pdf.addImage(url, "PNG", 0, 0, 210, 297); // A4 size: 210 x 297 mm
      pdf.save("Signature.pdf");
      return;
    }
    return alert("Save the Signature First");
  };

  return (
    <div>
      <div>
        <SelectionBtn
          text={"Brush Color"}
          property={color}
          setProperty={setColor}
          type={type[0]}
        />
        <SelectionBtn
          text={"Brush Radius"}
          property={radius}
          setProperty={setRadius}
          type={type[1]}
        />
        <SelectionBtn
          text={"Background Color"}
          property={bgColor}
          setProperty={setBgColor}
          type={type[0]}
        />
      </div>
      <div>
        <CanvasDraw ref={draw} brushRadius={radius} brushColor={color} />
      </div>
      <div className="flex gap-4">
        <FunctionBtn text={"Clear"} type="danger" func={clearHandler} />
        <FunctionBtn text={"Save"} type="primary" func={saveHandler} />
        <FunctionBtn text={"Undo"} type="primary" func={undoHandler} />
        <Popconfirm 
        title="Download the signature"
        description="Do you want to download this signature?"
        onConfirm={downloadHandler}
        okText="Yes"
        cancelText="No"
        >
        <Button danger type="primary">Download as a PDF</Button>
        </Popconfirm>
      </div>
    </div>
  );
}

export default App;
