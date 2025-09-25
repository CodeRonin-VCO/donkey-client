import styles from "./disconnect.route.module.css";
import logoDonkeyBack from "./../../assets/logo-donkey-back.png";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function DisconnectPage() {
    // trad
    const { t } = useTranslation();

    return (
        <div className="page">
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <img src={logoDonkeyBack} alt="logo-donkey" />
                </div>
                <h1 className={styles.title}>{t("disconnect.Donkey has trotted off.")}</h1>
                <h2 className={styles.title}>{t("disconnect.You’ve been kicked out of the stable.")}</h2>
                <Link to={"/"} className={styles.btn}>{t("disconnect.Chase him to login?")}</Link>
            </div>
        </div>
    )
}