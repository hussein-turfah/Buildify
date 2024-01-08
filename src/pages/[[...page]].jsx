import Head from "next/head";
import ResizableComponent from "../../common/resizableComponent";
import styles from "./styles/index.module.css";
import { useEffect, useRef, useState } from "react";
import Nav from "../../common/Nav";
import SideNav from "../../common/sideNav";
import { InputModal } from "../../common/inputModal";

export default function Page() {
  const [children, setChildren] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [text, setText] = useState("");
  const [element, setElement] = useState(null);
  const [codeToCopy, setCodeToCopy] = useState("");
  const codeContainerRef = useRef(null);

  useEffect(() => {
    const codeToCopy = codeContainerRef.current.innerHTML;
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
      >
        {children}
      </SideNav>
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
            />
          );
        })}
      </div>
    </div>
  );
}
