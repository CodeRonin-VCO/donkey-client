import { useAtom } from "jotai";
import styles from "./connections.module.css";
import { tokenAtom } from "../../stores/auth.stores.js";
import useUser from "../../hooks/useUser.js";
import { useEffect, useState } from "react";
import logoDonkey from "./../../assets/logo-donkey-profile.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";


export default function ConnectionsComponents({ friendsUpdated, onSelectedFriend }) {
    // trad
    const { t } = useTranslation();

    const [token] = useAtom(tokenAtom);
    const { fetchGetUserFriends, fetchDeleteFriend } = useUser();
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

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

    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedFriend(null);
    };

    const handleViewProfile = () => {
        navigate(`/profile/${selectedFriend._id}`);
        setShowPopup(false);
    };

    // Remove friend
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
                    <div key={friend._id} className={styles.friend} onClick={() => {
                        if (onSelectedFriend) {
                            onSelectedFriend({ ...friend });
                            return;
                        }
                        handleFriendClick(friend)
                    }}>
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

            {showPopup && selectedFriend && (
                <div className={styles.popup_overlay}>
                    <div className={styles.popup}>
                        <div className={styles.popup_header}>
                            <h6>{t("connections.viewProfile")}</h6>
                            <button
                                className={styles.popup_close}
                                onClick={handleClosePopup}
                            >
                                <svg data-prefix="fas" data-icon="xmark" className="svg-inline--fa fa-xmark" role="img" viewBox="0 0 384 512" aria-hidden="true"><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"></path></svg>
                            </button>
                        </div>
                        <div className={styles.popup_content}>
                            <div className={styles.popup_avatar}>
                                <img
                                    src={selectedFriend.avatar || logoDonkey}
                                    alt={`avatar-${selectedFriend.firstname}`}
                                />
                            </div>
                            <p>
                                {t("connections.viewProfileMessage")} <strong>{selectedFriend.firstname} {selectedFriend.lastname}</strong> ?
                            </p>
                        </div>
                        <div className={styles.popup_actions}>
                            <button
                                className={styles.popup_btn_view}
                                onClick={handleViewProfile}
                            >
                                {t("connections.viewProfileBtn")}
                            </button>
                            <button
                                className={styles.btn_cancel}
                                onClick={handleClosePopup}
                            >
                                {t("connections.cancel")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}