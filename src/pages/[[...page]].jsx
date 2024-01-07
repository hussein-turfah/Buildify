import ResizableComponent from "../../common/resizableComponent";
import styles from "./styles/index.module.css";
import { useState } from "react";

export default function Page() {
  const [children, setChildren] = useState([]);

  const staticChildren = [
    {
      name: "Button",
      element: <button className={styles.button}>Button</button>,
    },
    { name: "text", element: <p className={styles.text}>text</p> },
    {
      name: "image",
      element: (
        <div className={styles.image}>
          <img
            src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            alt="Picture of the author"
            className={styles.img}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1>Elements</h1>
          <p>Please select elements</p>
        </div>
        <div className={styles.sidebarContent}>
          {staticChildren.map((child, index) => {
            return (
              <div
                key={index}
                className={styles.sidebarItem}
                onClick={() => {
                  setChildren([...children, child]);
                  console.log(children);
                }}
              >
                {child.element}
              </div>
            );
          })}
          <button
            className={styles.publishButton}
            onClick={() => {
              console.log("publish");
            }}
          >
            Publish Code
          </button>
        </div>
      </div>
      <div>
        {children.map((child, index) => {
          return (
            <ResizableComponent
              key={index}
              className={styles.resizableComponent}
            >
              {child.element}
            </ResizableComponent>
          );
        })}
      </div>
    </div>
  );
}
