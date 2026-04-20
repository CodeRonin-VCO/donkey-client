import OtherUserProfile from "../../components/profile/components/profileById.jsx";
import FooterPage from "../../layout/footer/footer.jsx";
import HeaderPage from "../../layout/header/header.jsx";
import styles from "./otherProfile.route.module.css";


export default function OtherUserProfilPage() {



    return (
        <div className={"page" + " " + styles.custom_page}>
            <HeaderPage />
            <OtherUserProfile />
            <FooterPage />
        </div>
    )
}