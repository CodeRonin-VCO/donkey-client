import styles from "./mob-navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import useNavBarLogic from "../../../../hooks/useNavBarLogic.js";
import useAuth from "../../../../hooks/useAuth.js";
import { useTranslation } from "react-i18next";

export default function MobileNavBar() {
    // trad
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const { menuOpen, handleOpenMenuBurger, handleCloseMenuBurger } = useNavBarLogic();

    // Disconnect logic
    const { fetchLogout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await fetchLogout();
        navigate("/disconnected");
    }

    return (
        <nav className={`${styles.nav_mobile} ${menuOpen ? styles.active : ""}`}>
            <div className={`${styles.menu_burger} ${menuOpen ? styles.active : styles.paused}`} onClick={handleOpenMenuBurger}>
                <div className={styles.line + " " + styles.line_top}></div>
                <div className={styles.line + " " + styles.line_middle}></div>
                <div className={styles.line + " " + styles.line_bottom}></div>
            </div>
            <nav className={`${styles.panel_menu} ${menuOpen ? styles.active : ""}`}>
                <div className={`${styles.close_menu} ${menuOpen ? styles.active : ""}`} onClick={handleCloseMenuBurger}><FontAwesomeIcon icon={faXmark} /></div>
                <ul className={styles.menu_wrapper + " " + styles.menu_mobile}>
                    <li><Link to="/" className={styles.navlink}>{t("navbar.home")}</Link></li>
                    <li><Link to="/profile" className={styles.navlink}>{t("navbar.profile")}</Link></li>
                    <li><Link to="/user" className={styles.navlink}>{t("navbar.connections")}</Link></li>
                    <li><Link to="/messages" className={styles.navlink}>{t("navbar.messages")}</Link></li>
                    <li><Link to="/" className={styles.navlink} onClick={handleLogout}>{t("navbar.disconnect")}</Link></li>
                    <li>
                        {i18n.language === "fr" ? (
                            <button onClick={() => changeLanguage("en")} className={styles.btn_disconnect}>English</button>
                        ) : (
                            <button onClick={() => changeLanguage("fr")} className={styles.btn_disconnect}>Français</button>
                        )}
                    </li>
                </ul>
            </nav>
        </nav>
    )
}