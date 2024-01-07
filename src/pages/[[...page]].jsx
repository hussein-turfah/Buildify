import Head from "next/head";
import ResizableComponent from "../../common/resizablebutton";
import styles from "./styles/index.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}></div>
      <div>
        <ResizableComponent />
      </div>
    </div>
  );
}
