import Image from "next/image";
import styles from "./styles/index.module.css";

export default function Nav() {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <Image
          src="/logo.svg"
          width={270}
          height={70}
          objectFit="contain"
          alt="logo"
          priority
        />
      </div>
    </div>
  );
}
