import { Link } from "react-router";
import styles from "./desk-nav-bar.module.css";


export default function DesktopNavBar() {
    

    return (
        <nav className={styles.container_nav}>
            <ul className={styles.navbar}>
                <li><Link to={"/feed"} className={styles.nav_links}>Home</Link></li>
                <li><Link to={"/feed/profil"} className={styles.nav_links}>Profile</Link></li>
                <li><Link to={"/feed/message"} className={styles.nav_links}>Messages</Link></li>
                {/* // todo: ajouter l'avatar de l'utilisateur */}
                <li><button type="button" className={styles.btn_disconnect}>Disconnect</button></li>
            </ul>
        </nav>
    )
}