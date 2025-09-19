import { Link, useNavigate } from "react-router";
import styles from "./desk-nav-bar.module.css";
import useAuth from "../../../../hooks/useAuth.js";


export default function DesktopNavBar() {
    const {fetchLogout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await fetchLogout();
        navigate("/disconnected");
    }
    

    return (
        <nav className={styles.container_nav}>
            <ul className={styles.navbar}>
                <li><Link to={"/feed"} className={styles.nav_links}>Home</Link></li>
                <li><Link to={"/profile"} className={styles.nav_links}>Profile</Link></li>
                <li><Link to={"/feed/message"} className={styles.nav_links}>Messages</Link></li>
                {/* // todo: ajouter l'avatar de l'utilisateur */}
                <li><button type="button" className={styles.btn_disconnect} onClick={handleLogout}>Disconnect</button></li>
            </ul>
        </nav>
    )
}