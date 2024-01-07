// ResizableButton.js
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";

const ResizableButton = () => {
  const [resizeHandle, setResizeHandle] = useState(undefined);

  useEffect(() => {
    console.log("resizeHandle", resizeHandle);
  }, [resizeHandle]);

  return (
    <Draggable
      handle={resizeHandle}
      cancel=".resize-handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      grid={[25, 25]}
      scale={1}
      onMouseDown={() => 
      {
        console.log("onMouseDown");
        setResizeHandle(undefined);
      }
      } //this means click
      // onMouseUp={() => console.log("onMouseUp")} //this means click release
      onStart={() =>{
        console.log("onStart");
        setResizeHandle(undefined);
      }} //this means drag start
      onStop={() => {
        setResizeHandle(".resize-handle");
        console.log("onStop")}} //this means drag release
    
    >
      <Resizable
        defaultSize={{
          width: 100,
          height: 100,
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "red",
        }}
        // onResizeStart={() => setResizeHandle(".resize-handle")}
        // onResizeStop={() => setResizeHandle(null)}
        // onResize={() => setResizeHandle(".resize-handle")}
        onResize={() => {
          console.log("onResize");
          setResizeHandle(".resize-handle");
        }}
        onResizeStart={() => {
          setResizeHandle(".resize-handle");
          console.log("onResizeStart");
        }}
        onResizeStop={() => {
          setResizeHandle(undefined);
          console.log("onResizeStop");
        }}
      >
        Resize Me
      </Resizable>
    </Draggable>
  );
};

export default ResizableButton;
