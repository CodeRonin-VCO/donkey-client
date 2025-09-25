import { Link, useNavigate } from "react-router";
import styles from "./desk-nav-bar.module.css";
import useAuth from "../../../../hooks/useAuth.js";
import { useTranslation } from "react-i18next";


export default function DesktopNavBar() {
    const { fetchLogout } = useAuth();
    const navigate = useNavigate();

    // trad
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleLogout = async () => {
        await fetchLogout();
        navigate("/disconnected");
    }


    return (
        <nav className={styles.container_nav}>
            <ul className={styles.navbar}>
                <li><Link to={"/feed"} className={styles.nav_links}>{t("navbar.home")}</Link></li>
                <li><Link to={"/profile"} className={styles.nav_links}>{t("navbar.profile")}</Link></li>
                <li><Link to={"/user"} className={styles.nav_links}>{t("navbar.connections")}</Link></li>
                <li><Link to={"/messages"} className={styles.nav_links}>{t("navbar.messages")}</Link></li>
                <li><button type="button" className={styles.btn_disconnect} onClick={handleLogout}>{t("navbar.disconnect")}</button></li>
                <li>
                    {i18n.language === "fr" ? (
                        <button onClick={() => changeLanguage("en")} className={styles.btn_disconnect}>English</button>
                    ) : (
                        <button onClick={() => changeLanguage("fr")} className={styles.btn_disconnect}>Français</button>
                    )}
                </li>
            </ul>
        </nav>
    )
}