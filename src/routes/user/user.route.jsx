import FooterPage from "../../layout/footer/footer.jsx";
import HeaderPage from "../../layout/header/header.jsx";
import MainUserPage from "./components/main-user.jsx";
import styles from "./user.route.module.css";

export default function UserPage() {


    return (
        <div className={"page" + " " + styles.custom_page}>
            <HeaderPage />
            <MainUserPage />
            <FooterPage />
        </div>
    )
}; 