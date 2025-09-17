import styles from "./header.module.css";
import TitleLogo from "../../components/title-logo/title-logo.jsx";
import DesktopNavBar from "./components/desktop-nav-bar/desk-nav-bar.jsx";
import Searchbar from "./components/searchbar/searchbar.jsx";
import MobileNavBar from "./components/mobile-nav-bar/mob-navbar.jsx";

export default function HeaderPage() {
    

    return (
        <header className={styles.header}>
            <div className="small-title">
                <TitleLogo />
            </div>
            <Searchbar />
            <DesktopNavBar />
            <MobileNavBar />
        </header>
    )
}