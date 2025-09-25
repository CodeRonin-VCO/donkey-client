import { useTranslation } from "react-i18next";
import ProfileComponent from "../../../components/profile/profile.jsx";
import styles from "./main-profile.module.css";

export default function MainProfilePage() {
    // trad
    const { t } = useTranslation();

    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <hgroup className={styles.hgroup}>
                    <h2>{t("profile.myprofile")}</h2>
                    <h6 className={styles.color}>{t("profile.manageyour")}</h6>
                </hgroup>
                <ProfileComponent />
            </div>
        </main>
    )
}