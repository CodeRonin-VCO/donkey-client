import { useState } from "react";
import AllUsersComponents from "../../../components/all-users/all-users.jsx";
import ConnectionsComponents from "../../../components/connections/connections.jsx";
import Searchbar from "../../../layout/header/components/searchbar/searchbar.jsx";
import styles from "./main-user.module.css";
import { useTranslation } from "react-i18next";

export default function MainUserPage() {
    // trad
    const { t } = useTranslation();

    // Updated list without refresh page
    const [friendsUpdated, setFriendsUpdated] = useState(false);
    // Search users
    const [searchTerm, setSearchTerm] = useState("");

    const handleFriendAdded = () => {
        setFriendsUpdated((prev) => !prev);
    };


    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <hgroup className={styles.hgroup}>
                    <h2>{t("connections.myconnections")}</h2>
                    <h6 className={styles.color}>{t("connections.manageNet")}</h6>
                </hgroup>
                <div className={styles.search}>
                    <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <div className={styles.your_connections}>
                    <ConnectionsComponents friendsUpdated={friendsUpdated} />
                </div>
                <div className={styles.people}>
                    <AllUsersComponents onFriendAdded={handleFriendAdded} searchTerm={searchTerm} />
                </div>
            </div>
        </main>
    )
}