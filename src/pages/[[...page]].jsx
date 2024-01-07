import Head from "next/head";
import ResizableComponent from "../../common/resizableComponent";
import styles from "./styles/index.module.css";
import { useState } from "react";
import Nav from "../../common/Nav";
import SideNav from "../../common/sideNav";

export default function Page() {
  const [children, setChildren] = useState([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Buildify</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Nav />
      <SideNav children={children} setChildren={setChildren} />
      <>
        <div>
          {children.map((child, index) => {
            return (
              <ResizableComponent
                key={index}
                className={styles.resizableComponent}
                child={child.element}
              />
            );
          })}
        </div>
      </>
    </div>
  );
}
