import { useEffect, useState } from "react";
import styles from "./styles/index.module.css";
export const InputModal = ({
  showInputModal,
  setShowInputModal,
  setChildren,
  children,
  element,
  setElement,
}) => {
  const [src, setSrc] = useState("");
  const [text, setText] = useState("");

  

  useEffect(() => {
    if (element.name === "Image") {
      setSrc(URL.createObjectURL(element.src));
    }
  }, [element]);

  return (
    <div className={styles.container}>
      <input
        onBlur={() => {
          setShowInputModal(false);
          setText("");
        }}
        className={styles.input}
        value={
          element.name === "Button" ||
          element.name === "Round Button" ||
          element.name === "Text" ||
          element.name === "Heading"
            ? text
            : src
        }
        onChange={(e) => {
          if (
            element.name === "Button" ||
            element.name === "Round Button" ||
            element.name === "Text" ||
            element.name === "Heading"
          ) {
            setText(e.target.value);
          } else {
            setSrc(e.target.value);
          }
        }}
        placeholder="Enter your text here and then press enter"
        type={element.name === "Image" ? "file" : "text"}
      />
    </div>
  );
};
