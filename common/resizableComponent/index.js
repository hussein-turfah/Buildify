import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import styles from "./styles/index.module.css";
import { useState } from "react";

const ResizableComponent = ({ child, setCodeToCopy }) => {
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);

  return (
    <div>
      <Draggable>
        <Resizable
          className={styles.container}
          size={{ width: width, height: height }}
          onResizeStop={(e, direction, ref, d) => {
            setHeight(height + d.height);
            setWidth(width + d.width);
            setCodeToCopy(
              `<div style="width: ${width}px; height: ${height}px;">${ref.innerHTML}</div>`
            );
          }}
        >
          {child.element}
        </Resizable>
      </Draggable>
    </div>
  );
};

export default ResizableComponent;
