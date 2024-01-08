import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import styles from "./styles/index.module.css";
import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";

const ResizableComponent = ({ child, setCodeToCopy }) => {
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        // width: 320,
        // height: 200,
      }}
      onResizeStop={(e, direction, ref, d) => {
        setWidth(width + d.width);
        setHeight(height + d.height);
        setCodeToCopy(
          `<div style="width: ${width}px; height: ${height}px; position: absolute; top: ${ref.offsetTop}px; left: ${ref.offsetLeft}px;">${child.code}</div>`
        );
      }}
      onDragStop={(e, d) => {
        setCodeToCopy(
          `<div style="width: ${width}px; height: ${height}px; position: absolute; top: ${d.y}px; left: ${d.x}px;">${child.code}</div>`
        );
      }}
      // className={styles.draggable}
    >
      {/* <div className={styles.element}> */}
      {child.element}
      {/* </div> */}
    </Rnd>
  );
};

export default ResizableComponent;
