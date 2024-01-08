import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import styles from "./styles/index.module.css";
import { useState } from "react";

const ResizableComponent = ({ child, setCodeToCopy }) => {
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);

  return (
    <Draggable
      onStop={(e, data) => {
        setCodeToCopy(
          `<div style="width: ${width}px; height: ${height}px; position: absolute; top: ${data.y}px; left: ${data.x}px;">${child.code}</div>`
        );
      }}
    >
      <Resizable
        className={styles.container}
        size={{ width: width, height: height }}
        onResizeStop={(ref, d) => {
          setHeight(height + d.height);
          setWidth(width + d.width);
          setCodeToCopy(
            `<div style="width: ${width}px; height: ${height}px;">${ref.innerHTML}</div>`
          );
        }}
      >
        <div
          className={styles.element}
          style={{ width: width, height: height }}
        >
          {child.element}
        </div>
      </Resizable>
    </Draggable>
  );
};

export default ResizableComponent;
