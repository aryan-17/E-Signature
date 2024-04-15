import { useEffect, useRef, useState } from "react";
import "./App.css";
import CanvasDraw from "react-canvas-draw";
import SelectionBtn from "./components/SelectionBtn";
import FunctionBtn from "./components/FunctionBtn";
import jsPDF from "jspdf";
import { Button, Dropdown, Menu, Popconfirm } from "antd";
import menu from "./data/menuData";

function App() {
  const [color, setColor] = useState("#000000");
  const [radius, setRadius] = useState(1);
  const [bgColor, setBgColor] = useState("FFFFFF");
  const type = ["color", "size"];
  const draw = useRef(null);

  const clearHandler = () => {
    draw.current.eraseAll();
  };

  const undoHandler = () => {
    draw.current.undo();
  };

  const menuItems = (
    <Menu>
      {
        menu.map((ele) => {
          return (
            <Menu.Item key={ele.type} danger  className="bg-[#F06449]">
              <Popconfirm
                title="Download the signature"
                description="Do you want to download this signature?"
                onConfirm={() => downloadHandler(ele.type)}
                okText="Yes"
                cancelText="No"
                className="bg-[#F06449]"
              >
                <Button className="bg-[#F06449]" danger  type="primary">
                  {ele.type}
                </Button>
              </Popconfirm>
            </Menu.Item>
          )
        })
      }
    </Menu>
  );

  const downloadHandler = (id) => {
      const url = draw.current.canvas.drawing.toDataURL("image/png", 1.0);

      if (id === 'PDF') {
        const pdf = new jsPDF();
        pdf.setFillColor(bgColor);
        pdf.rect(0, 0, 210, 297, "F");
        pdf.addImage(url, "PNG", 0, 0, 210, 297); // A4 size: 210 x 297 mm
        pdf.save("Signature.pdf");
        return;
      }

      if (id === 'JPG') {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my_drawing.jpg';
        a.click();
        return;
      }
      return;
  };

  return (
    <div className="bg-[url('./data/gradient.png')] flex flex-col gap-y-10 items-center justify-between h-screen">
      <div className="flex gap-10 mt-5 lg:flex-row md:flex-row sm:flex-col">
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
        <CanvasDraw ref={draw} brushRadius={radius} brushColor={color} lazyRadius={0}/>
      </div>
      <div className="flex gap-4 mb-10">
        <FunctionBtn text={"Clear"} type="danger" func={clearHandler} />
        <FunctionBtn text={"Undo"} type="primary" func={undoHandler} />
        <Dropdown.Button danger trigger={["click"]} className="! bg-[#F06449]" type="primary" overlay={menuItems}>Download as a </Dropdown.Button>

      </div>
    </div>
  );
}

export default App;
