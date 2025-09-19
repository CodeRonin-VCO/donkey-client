import styles from "./mob-navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import useNavBarLogic from "../../../../hooks/useNavBarLogic.js";
import useAuth from "../../../../hooks/useAuth.js";

export default function MobileNavBar() {
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
                    <li><Link to="/" className={styles.navlink}>Home</Link></li>
                    <li><Link to="/contact" className={styles.navlink}>Profile</Link></li>
                    <li><Link to="/not-found" className={styles.navlink} onClick={handleLogout}>Disconnect</Link></li>
                </ul>
            </nav>
        </nav>
    )
}