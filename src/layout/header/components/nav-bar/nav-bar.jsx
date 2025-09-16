import styles from "./nav-bar.module.css";

export default function NavBar() {
    

    return (
        <nav className={styles.container_nav}>
            <ul className={styles.navbar}>
                <li>Feed</li>
                <li>Profile</li>
                <li>Disconnect</li>
            </ul>
        </nav>
    )
}