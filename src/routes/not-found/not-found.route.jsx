import styles from "./not-found.route.module.css";
import logoDonkeyTong from "./../../assets/logo-donkey-langue.png";

export default function NotFoudPage() {


    return (
        <div className="page">
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <img src={logoDonkeyTong} alt="logo-donkey" />
                </div>
                <h1 className={styles.title}>Error 404.</h1>
                <h2 className={styles.title}>Donkey is lost. And so are you.</h2>
            </div>
        </div>
    )
}