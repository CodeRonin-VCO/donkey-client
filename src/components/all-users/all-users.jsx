import { useAtom } from "jotai";
import styles from "./all-users.module.css";
import { tokenAtom, userAtom } from "../../stores/auth.stores.js";
import useUser from "../../hooks/useUser.js";
import { useEffect, useState } from "react";
import logoDonkey from "./../../assets/logo-donkey-profile.png"
import { useTranslation } from "react-i18next";

export default function AllUsersComponents({ onFriendAdded, searchTerm }) {
    // trad
    const { t } = useTranslation();

    const [token] = useAtom(tokenAtom);
    const [currentUser] = useAtom(userAtom);
    const { fetchGetAllUsers, fetchAddFriend } = useUser();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    // Load data
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const result = await fetchGetAllUsers();
                const filteredOutCurrentUser = result.users.filter(user => user._id !== currentUser?._id);
                setUsers(filteredOutCurrentUser);

            } catch (error) {
                console.error("Failed to fetch users", error);
            };
        };
        loadUserData();

    }, [token]);

    // Add friend
    const handleAddFriend = async (friendUserId) => {
        try {
            const { success, friends } = await fetchAddFriend(friendUserId);
            if (success) {
                console.log("Friend added !");
                // refresh list
                if (onFriendAdded) onFriendAdded();
            }
        } catch (error) {
            console.error("Error to add friend : ", error.message);
        }
    }

    // Searchbar results (display)
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredUsers([]);
            return;
        }

        const filtered = users.filter(user =>
            user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredUsers(filtered);
    }, [searchTerm, users]);
    const displayedUsers = searchTerm.trim() !== "" ? filteredUsers : users;


    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>{t("connections.listUsers")}</h4>
            {displayedUsers.length > 0 ? (
                displayedUsers.map((user) => (
                    <div key={user._id} className={styles.user}>
                        <div className={styles.user_avatar}>
                            <img
                                src={user.avatar || logoDonkey}
                                alt={`avatar-${user.firstname}`} />
                        </div>
                        <p>{user.firstname} {user.lastname}</p>
                        <div className={styles.container_btn} onClick={() => handleAddFriend(user._id)}>
                            <button title={t("connections.addFriend")}>+</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>{t("connections.noUsers")}</p>
            )}
        </div>
    )
}