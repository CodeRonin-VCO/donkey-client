import FooterPage from "../../layout/footer/footer.jsx";
import HeaderPage from "../../layout/header/header.jsx";
import MainMessagesPage from "./components/main-messages.jsx";
import styles from "./messages.route.module.css";

export default function MessagesPage() {
    return (
        <div className={"page" + " " + styles.custom_page}>
            <HeaderPage />
            <MainMessagesPage />
            <FooterPage />
        </div>
    )
}