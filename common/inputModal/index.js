import { useEffect, useState } from "react";
import styles from "./styles/index.module.css";
export const InputModal = ({
  showInputModal,
  setShowInputModal,
  setChildren,
  children,
  element,
  setElement,
  setCodeToCopy,
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
        setShowInputModal(false);
        const newElement = {
          ...element,
          text: text,
          src: src,
          id: Math.random() * 1000,
          element:
            element.name === "Button" ? (
              <button className={styles.element}>{text}</button>
            ) : element.name === "Round Button" ? (
              <button className={styles.element}>{text}</button>
            ) : element.name === "Text" ? (
              <p className={styles.element}>{text}</p>
            ) : element.name === "Heading" ? (
              <h1 className={styles.element}>{text}</h1>
            ) : element.name === "Image" ? (
              <div className={styles.element}>
                <img
                  src={src}
                  alt="Image Placeholder"
                  className={styles.element}
                />
              </div>
            ) : (
              <div></div>
            ),
        };
        setChildren([...children, newElement]);
        setCodeToCopy(
          `<div style="width: ${
            element.name === "Image" ? "auto" : "100px"
          }; height: ${
            element.name === "Image" ? "auto" : "100px"
          }; position: absolute; top: 0px; left: 0px;">${
            newElement.element.props.children
          }</div>`
        );
        setElement({});
      }
    };
    document.addEventListener("keydown", handleEnter);
    document.addEventListener("touchstart", handleEnter);
    return () => {
      document.removeEventListener("keydown", handleEnter);
      document.removeEventListener("touchstart", handleEnter);
    };
  }, [text, src]);

  useEffect(() => {
    if (element.name === "Image") {
      setSrc(URL.createObjectURL(element.src));
    }
  }, [element]);

  return (
    <div className={styles.containerLarge}>
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
