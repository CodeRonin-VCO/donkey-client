import { useAtom } from "jotai";
import styles from "./connections.module.css";
import { tokenAtom } from "../../stores/auth.stores.js";
import useUser from "../../hooks/useUser.js";
import { useEffect, useState } from "react";
import logoDonkey from "./../../assets/logo-donkey-profile.png";
import { useTranslation } from "react-i18next";


export default function ConnectionsComponents({ friendsUpdated, onSelectedFriend }) {
    // trad
    const { t } = useTranslation();

    const [token] = useAtom(tokenAtom);
    const { fetchGetUserFriends, fetchDeleteFriend } = useUser();
    const [friends, setFriends] = useState([]);

    // Load data
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const result = await fetchGetUserFriends();
                setFriends(result.friends);

            } catch (error) {
                console.error("Failed to fetch user friends", error);
            };
        };
        loadUserData();

    }, [token, friendsUpdated]);

    // Add friend
    const handleRemoveFriend = async (friendUserId) => {
        try {
            const { success, friends } = await fetchDeleteFriend(friendUserId);
            if (success) {
                setFriends((prev) => prev.filter(f => f._id !== friendUserId));
                console.log("Friend removed !");
            }
        } catch (error) {
            console.error("Error to remove friend : ", error.message);
        }
    }


    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>{t("connections.listFriends")}</h4>
            {friends.length > 0 ? (
                friends.map((friend) => (
                    <div key={friend._id} className={styles.friend} onClick={() => onSelectedFriend({ ...friend })}>
                        <div className={styles.friend_avatar}>
                            <img
                                src={friend.avatar || logoDonkey}
                                alt={`avatar-${friend.firstname}`} />
                        </div>
                        <p>{friend.firstname} {friend.lastname}</p>
                        <div className={styles.container_btn} onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFriend(friend._id)
                        }}>
                            <button title={t("connections.removeFriend")}>-</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>{t("connections.noFriend")}</p>
            )}
        </div>
    )
}