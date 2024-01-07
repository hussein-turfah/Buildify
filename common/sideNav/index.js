import { useEffect, useState } from "react";
import Selector from "../selector";
import styles from "./styles/index.module.css";

export default function SideNav({ children, setChildren }) {
  const [groupedChildren, setGroupedChildren] = useState({});

  const staticChildren = [
    {
      name: "Button",
      element: <button className={styles.button}>Button</button>,
      category: "Buttons",
    },
    {
      name: "Round Button",
      element: <button className={styles.roundButton}>Button</button>,
      category: "Buttons",
    },
    {
      name: "Text",
      element: <p className={styles.text}>text</p>,
      category: "Text",
    },
    {
      name: "Heading",
      element: <h1 className={styles.heading}>heading</h1>,
      category: "Text",
    },
    {
      name: "Image",
      element: (
        <div className={styles.image}>
          <img
            src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            alt="Image Placeholder"
            className={styles.img}
          />
        </div>
      ),
      category: "Images",
    },
  ];
  useEffect(() => {
    staticChildren.forEach((child) => {
      if (groupedChildren[child.category]) {
        groupedChildren[child.category].push(child);
      } else {
        groupedChildren[child.category] = [child];
      }
    });
    setGroupedChildren(groupedChildren);
  });

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Selector
          children={[
            {
              name: "Elements",
              selected: true,
            },
            {
              name: "Layouts",
              selected: false,
            },
          ]}
        />
      </div>
      <div className={styles.sidebarContent}>
        {Object.keys(groupedChildren).map((key, index) => {
          return (
            <div key={index} className={styles.sidebarItemCon}>
              <h3 className={styles.sidebarCateg}>{key}</h3>
              <div className={styles.itemsContainer}>
                {groupedChildren[key].map((child, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.sidebarItem}
                      onClick={() => {
                        setChildren([...children, child.element]);
                      }}
                    >
                      <p className={styles.sidebarItemText}>{child.name}</p>
                      <div className={styles.element}>{child.element}</div>
                    </div>
                  );
                })}
              </div>
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
  );
}
