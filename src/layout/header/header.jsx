import styles from "./header.module.css";
import logoDonkey from "./../../assets/logo-donkey.jpg";

export default function HeaderPage() {
    

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logoDonkey} alt="logo-donkey" />
            </div>
            <p>Here will come my header</p>
        </header>
    )
}