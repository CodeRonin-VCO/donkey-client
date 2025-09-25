import styles from "./not-found.route.module.css";
import logoDonkeyTong from "./../../assets/logo-donkey-langue.png";
import { useTranslation } from "react-i18next";

export default function NotFoudPage() {
    // trad
    const { t } = useTranslation();

    return (
        <div className="page">
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <img src={logoDonkeyTong} alt="logo-donkey" />
                </div>
                <h1 className={styles.title}>{t("notFound.Error 404")}</h1>
                <h2 className={styles.title}>{t("notFound.Donkeylost")}</h2>
            </div>
        </div>
    )
}