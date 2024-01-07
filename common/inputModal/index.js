import styles from "./styles/index.module.css";
export const InputModal = ({ text, setText, setShowModal }) => {
  return (
    <div className={styles.container}>
      <input 
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};
