import styles from "./profileById.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import logoDonkey from "./../../../assets/logo-donkey-profile.png";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { tokenAtom } from "../../../stores/auth.stores.js";
import useUser from "../../../hooks/useUser.js";

export default function OtherUserProfile() {
    // Trad
    const { t } = useTranslation();
    const [otherUser, setOtherUser] = useState(null);
    const [token] = useAtom(tokenAtom);
    const { fetchGetProfileById } = useUser();
    const { userId } = useParams();

    // Load data
    useEffect(() => {
        const loadOtherUserData = async () => {
            try {
                const { user } = await fetchGetProfileById(userId);
                setOtherUser(user);
            } catch (error) {
                console.error("Failed to fetch other user data", error);
            }
        };
        if (userId) {
            loadOtherUserData();
        }
    }, [userId, token]);

    // Format date
    const formattedCreatedAt = otherUser?.createdAt
        ? new Date(otherUser.createdAt).toLocaleString("en-GB", {
              year: "numeric",
              month: "long",
          })
        : "";

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.banner}>
                        {otherUser?.banner && <img src={otherUser?.banner} alt="No banner" />}
                    </div>
                    <div className={styles.user_info}>
                        <div className={styles.profile}>
                            <div className={styles.personnal_data}>
                                <div className={styles.cards_head}>
                                    <div className={styles.avatar}>
                                        <img src={otherUser?.avatar || logoDonkey} alt="logo-user" />
                                    </div>
                                    <hgroup className={styles.hgroup}>
                                        <h6 className={styles.color_title}>
                                            {otherUser?.firstname + " " + otherUser?.lastname}
                                        </h6>
                                        <p className={styles.color_transp}>
                                            <small>{otherUser?.email || "@user"}</small>
                                        </p>
                                    </hgroup>
                                </div>
                            </div>
                        </div>
                        <div className={styles.social_info}>
                            <div>
                                <div className={styles.number}>{otherUser?.postsCount ?? 0}</div>
                                <div className={styles.color_transp}>{t("profile.posts")}</div>
                            </div>
                            <div>
                                <div className={styles.number}>{otherUser?.friendsCount ?? 0}</div>
                                <div className={styles.color_transp}>{t("profile.friends")}</div>
                            </div>
                            <div>
                                <div className={styles.number}>{otherUser?.heartsGivenCount ?? 0}</div>
                                <div className={styles.color_transp}>{t("profile.Hearts")}</div>
                            </div>
                        </div>
                        <div className={styles.connection_info}>
                            <h6>{t("profile.userBio")}</h6>
                            <p className={styles.color_transp}>{otherUser?.bio || `${t("profile.noBio")}`}</p>
                            <h6>{t("profile.userLoc")}</h6>
                            <p className={styles.color_transp}>{otherUser?.loc || `${t("profile.noLoc")}`}</p>
                            <p className={styles.color_transp + " " + styles.membersince}>
                                <FontAwesomeIcon icon={faCalendar} />
                                {t("profile.memberSince")} {formattedCreatedAt}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
