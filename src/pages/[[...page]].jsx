import Head from "next/head";
import ResizableComponent from "../../common/resizableComponent";
import styles from "./styles/index.module.css";
import { useEffect, useRef, useState } from "react";
import Nav from "../../common/Nav";
import SideNav from "../../common/sideNav";
import { InputModal } from "../../common/inputModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [children, setChildren] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [text, setText] = useState("");
  const [element, setElement] = useState(null);
  const [codeToCopy, setCodeToCopy] = useState("");
  const codeContainerRef = useRef(null);
  const [positions, setPositions] = useState([]);

  const handleDragStop = (e, data, index) => {
    const newPositions = [...positions];
    newPositions[index] = { x: data.x, y: data.y };
    setPositions(newPositions);
  };

  const getCodeToCopy = () => {
    if (!codeContainerRef.current) return "";

    const elementPositions = positions.map(({ x, y }) => ({ x, y }));

    const codeWithPositions = children.map((child, index) => {
      const position = elementPositions[index];
      const childText = child.element.props.children || "";
      const elementType = child?.element.type || "div";

      return `<div style="position: absolute; top: ${
        position?.y ? position.y : 0
      }px; left: ${position?.x ? position.x : 0}px;>
      <${elementType} >
        ${childText}
      </${elementType}>
      </div>`;
    });

    const innerHTML = codeWithPositions.join("");
    return `<div>${innerHTML}</div>`;
  };

  useEffect(() => {
    const codeToCopy = getCodeToCopy();
    setCodeToCopy(codeToCopy);
  }, [children]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Buildify</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      {/* <Nav /> */}
      <SideNav
        setShowInputModal={setShowInputModal}
        setElement={setElement}
        codeToCopy={codeToCopy}
      />
      {showInputModal && (
        <InputModal
          text={text}
          setText={setText}
          showInputModal={showInputModal}
          setShowInputModal={setShowInputModal}
          setChildren={setChildren}
          element={element}
          setElement={setElement}
        >
          {children}
        </InputModal>
      )}
      <div ref={codeContainerRef}>
        {children.map((child, index) => {
          return (
            <ResizableComponent
              key={index}
              className={styles.resizableComponent}
              child={child}
              onDragStop={(e, data) => handleDragStop(e, data, index)}
            />
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}
