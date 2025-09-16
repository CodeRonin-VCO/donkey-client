import FooterPage from "../../layout/footer/footer.jsx";
import HeaderPage from "../../layout/header/header.jsx";
import MainFeedPage from "./components/main-feed.jsx";
import styles from "./feed.route.module.css";

export default function FeedPage() {
    
    return (
        <div className={"page" + " " + styles.custom_page}>
            <HeaderPage />
            <MainFeedPage />
            <FooterPage />
        </div>
    )
}