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
    console.log("children", children);
  }, [children]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter" || e.type === "touchstart") {
        const newElement = {
          ...element,
          text: text,
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
