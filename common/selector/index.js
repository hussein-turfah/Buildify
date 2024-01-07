import classNames from "classnames";
import styles from "./styles/index.module.css";

export default function Selector({ children }) {
  return (
    <div className={styles.container}>
      {children.map((child, index) => {
        return (
          <div
            key={index}
            className={classNames(styles.item, {
              [styles.selected]: child.selected,
            })}
          >
            <p className={styles.itemText}>{child.name}</p>
          </div>
        );
      })}
    </div>
  );
}
