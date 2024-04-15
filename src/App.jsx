import { useRef, useState } from "react";
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
    const randomInt = Math.floor(Math.random()*1000).toString();
    if (id === 'PDF') {
        const url = draw.current.canvas.drawing.toDataURL("image/png", 1.0);
        const pdf = new jsPDF();
        const name = "Signature"+randomInt+".pdf";
        pdf.setFillColor(bgColor);
        pdf.rect(0, 0, 210, 297, "F");
        pdf.addImage(url, "PNG", 0, 0, 210, 297); // A4 size: 210 x 297 mm
        pdf.save(name);
      }

      // if (id === 'JPG') {
      //   const url = draw.current.canvas.drawing.toDataURL("image/jpg", 1.0);
      //   const name = "Signature"+randomInt+".jpg";
      //   const a = document.createElement('a');
      //   a.href = url;
      //   a.download = name;
      //   a.click();
      // }
      if (id === 'JPG') {
        const name = "Signature" + randomInt + ".jpg";
        const url = draw.current.canvas.drawing.toDataURL("image/jpg", 1.0);
      
        const canvas = document.createElement('canvas');
        canvas.width = 210;  // A4 width in mm
        canvas.height = 297; // A4 height in mm
      
        const ctx = canvas.getContext('2d');
      
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      
        const img = new Image();
        img.src = url;
      
        img.onload = function() {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
          const jpgUrl = canvas.toDataURL("image/jpeg", 1.0);
      
          const a = document.createElement('a');
          a.href = jpgUrl;
          a.download = name;
      
          a.click();
        };
      }
  };

  return (
    <div className="bg-[url('./data/gradient.png')] flex flex-col gap-y-10 items-center justify-between h-screen">
      <div className="flex gap-5 mt-5 lg:flex-row md:flex-row sm:flex-col">
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
