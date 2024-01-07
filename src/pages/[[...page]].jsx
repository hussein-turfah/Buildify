import Head from "next/head";
import ResizableComponent from "../../common/resizableComponent";
import styles from "./styles/index.module.css";
import { useState } from "react";

export default function Page() {
  const [children, setChildren] = useState([]);


  const staticChildren = [
    { name: "Button", element: <button>Button</button> },
    { name: "text", element: <p>text</p> },
    { name: "text", element: <p>text</p> },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1>Elements</h1>
          <p>Please select an element from the list below to add to the page</p>
        </div>
        <div className={styles.sidebarContent}>
          {staticChildren.map((child, index) => {
            return (
              <div key={index} className={styles.sidebarItem}>
                {child.element}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <ResizableComponent />
      </div>
    </div>
  );
}
