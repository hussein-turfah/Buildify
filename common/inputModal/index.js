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
    if (showInputModal) {
      document.querySelector("input").focus();
    }
  }, [showInputModal]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter" || e.type === "touchstart") {
        const style = { width: "100%", height: "100%" };
        const newElement = {
          ...element,
          text: text,
          id: Math.random() * 1000,
          element:
            element.name === "Button" ? (
              <button style={style}>{text}</button>
            ) : element.name === "Round Button" ? (
              <button style={style}>{text}</button>
            ) : element.name === "Text" ? (
              <p style={style}>{text}</p>
            ) : element.name === "Heading" ? (
              <h1 style={style}>{text}</h1>
            ) : (
              <div></div>
            ),
        };
        setChildren([...children, newElement]);
        setShowInputModal(false);
        setElement({});
      }
    };
    document.addEventListener("keydown", handleEnter);
    document.addEventListener("touchstart", handleEnter);
    return () => {
      document.removeEventListener("keydown", handleEnter);
      document.removeEventListener("touchstart", handleEnter);
    };
  }, [text]);

  return (
    <div className={styles.containerLarge}>
      <input
        onBlur={() => {
          setText("");
          element.name !== "Image" ? setShowInputModal(false) : "";
        }}
        className={styles.input}
        value={
          element.name === "Button" ||
          element.name === "Round Button" ||
          element.name === "Text" ||
          element.name === "Heading"
            ? text
            : ""
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
            setSrc(URL.createObjectURL(e.target.files[0]));
            const newElement = {
              ...element,
              src: URL.createObjectURL(e.target.files[0]),
              id: Math.random() * 1000,
              element: (
                <img
                  className={styles.element}
                  src={URL.createObjectURL(e.target.files[0])}
                  style={{ width: "100%", height: "100%" }}
                />
              ),
            };
            setChildren([...children, newElement]);
            setShowInputModal(false);
          }
        }}
        placeholder="Enter your text here and then press enter"
        type={element.name === "Image" ? "file" : "text"}
        accept={element.name === "Image" ? "image/*" : undefined}
      />
    </div>
  );
};
