import styles from "./styles/index.module.css";
import { useState } from "react";
import { Rnd } from "react-rnd";

const ResizableComponent = ({ child, onDragStop }) => {
  const [fontSize, setFontSize] = useState(16);

  const handleFontSizeChange = (newWidth) => {
    const newSize = Math.floor(newWidth);
    setFontSize(newSize);
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
      }}
      onResize={(e, direction, ref, d) => {
        handleFontSizeChange(ref.offsetWidth);
      }}
      onDragStop={(e, d) => onDragStop(e, d)}
    >
      <div className={styles.element} style={{ fontSize: `${fontSize}px` }}>
        {child.element}
      </div>
    </Rnd>
  );
};

export default ResizableComponent;
