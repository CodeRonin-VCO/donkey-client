import FooterPage from "../../layout/footer/footer.jsx";
import HeaderPage from "../../layout/header/header.jsx";
import MainProfilePage from "./components/main-profile.jsx";
import styles from "./profile.route.module.css";


export default function ProfilPage() {

    return (
        <div className={"page" + " " + styles.custom_page}>
            <HeaderPage />
            <MainProfilePage />
            <FooterPage />
        </div>
    )
}