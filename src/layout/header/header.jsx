import styles from "./header.module.css";
import logoDonkey from "./../../assets/logo-donkey.jpg";
import NavBar from "./components/nav-bar/nav-bar.jsx";
import TitleLogo from "../../components/title-logo/title-logo.jsx";

export default function HeaderPage() {
    

    return (
        <header className={styles.header}>
            <div className="small-title">
                <TitleLogo />
            </div>
            <NavBar />
        </header>
    )
}