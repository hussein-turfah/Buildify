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
      if (e.key === "Enter") {
        setShowInputModal(false);
        const newElement = {
          ...element,
          text: text,
          src: src,
          id: Math.random() * 1000,
          element: (
            <div className={styles.container}>
              {element.name === "Button" ? (
                <button className={styles.button}>{text}</button>
              ) : element.name === "Round Button" ? (
                <button className={styles.roundButton}>{text}</button>
              ) : element.name === "Text" ? (
                <p className={styles.text}>{text}</p>
              ) : element.name === "Heading" ? (
                <h1 className={styles.heading}>{text}</h1>
              ) : element.name === "Image" ? (
                <div className={styles.image}>
                  <img
                    src={src}
                    alt="Image Placeholder"
                    className={styles.img}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ),
        };
        setChildren([...children, newElement]);
        setElement({});
      }
    };
    document.addEventListener("keydown", handleEnter);
    return () => document.removeEventListener("keydown", handleEnter);
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
