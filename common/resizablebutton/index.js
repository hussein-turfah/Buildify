import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import styles from "./styles/index.module.css";

const ResizableComponent = () => {

  return (
    <Draggable>
      <Resizable className={styles.container}
        size={{ width: 100, height: 100 }}
      >
        Your text here...
      </Resizable>
    </Draggable>
  );
};

export default ResizableComponent;
