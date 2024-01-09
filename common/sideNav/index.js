import { useEffect, useRef, useState } from "react";
import Selector from "../selector";
import styles from "./styles/index.module.css";
import Image from "next/image";
import { toast } from "react-toastify";

export default function SideNav({ setShowInputModal, setElement, codeToCopy }) {
  const [groupedChildren, setGroupedChildren] = useState({});
  const copyButtonRef = useRef(null);

  const staticChildren = [
    {
      name: "Button",
      element: <button className={styles.button}>Button</button>,
      category: "Buttons",
      id: 1,
    },
    {
      name: "Round Button",
      element: <button className={styles.roundButton}>Button</button>,
      category: "Buttons",
      id: 2,
    },
    {
      name: "Text",
      element: <p className={styles.text}>text</p>,
      category: "Text",
      id: 3,
    },
    {
      name: "Heading",
      element: <h1 className={styles.heading}>heading</h1>,
      category: "Text",
      id: 4,
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
      src: "",
      id: 5,
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
  }, []);

  return (
    <div className={styles.sidebar}>
      <div className={styles.webLogo}>
        <Image
          src="/logo.svg"
          width={270}
          height={70}
          objectFit="contain"
          alt="logo"
          priority
        />
      </div>
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
                        setShowInputModal(true);
                        setElement(child);
                      }}
                      onTouchStart={() => {
                        setShowInputModal(true);
                        setElement(child);
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
          ref={copyButtonRef}
          data-clipboard-text={codeToCopy}
          onClick={() => {
            navigator.clipboard.writeText(codeToCopy);
            toast.success("Code Copied to Clipboard");
          }}
        >
          Publish Code
        </button>
      </div>
    </div>
  );
}
