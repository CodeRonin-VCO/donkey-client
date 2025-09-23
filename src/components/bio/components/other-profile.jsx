import styles from "./../bio.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import logoDonkey from "./../../../assets/logo-donkey-profile.png";
import useUser from "../../../hooks/useUser.js";

export default function OtherUserPage() {
    const { id } = useParams();
    const { fetchGetOtherUserData } = useUser();

    // Un seul state pour gérer user, loading, error
    const [status, setStatus] = useState({
        user: null,
        loading: true,
        error: null
    });

    // useEffect(() => {
    //     setStatus({ user: null, loading: true, error: null });

    //     fetchGetOtherUserData(id)
    //         .then(({ user }) => {
    //             if (!user) {
    //                 setStatus({ user: null, loading: false, error: "User not found" });
    //                 return;
    //             }
    //             setStatus({ user, loading: false, error: null });
    //         })
    //         .catch((err) => {
    //             setStatus({ user: null, loading: false, error: err.message || "Failed to load user" });
    //         });
    // }, [id]);

    if (status.loading) return <div>Loading user data...</div>;
    if (status.error) return <div>Error: {status.error}</div>;

    const user = status.user;
    const formattedCreatedAt = user?.createdAt
        ? new Date(user.createdAt).toLocaleString("en-GB", { year: "numeric", month: "long" })
        : "Unknown";

    return (
        <div className={styles.wrapper}>
            <div className={styles.banner}>
                {user.banner ? (
                    <img src={user.banner} alt={`${user.firstname}'s banner`} />
                ) : (
                    <div className={styles.bannerPlaceholder}>No banner available</div>
                )}
            </div>
            <div className={styles.user_info}>
                <div className={styles.profile}>
                    <div className={styles.personnal_data}>
                        <div className={styles.cards_head}>
                            <div className={styles.avatar}>
                                <img src={user.avatar || logoDonkey} alt={`${user.firstname}'s avatar`} />
                            </div>
                            <hgroup className={styles.hgroup}>
                                <h6 className={styles.color_title}>{user.firstname} {user.lastname}</h6>
                                <p className={styles.color_transp}><small>{user.email || "@unknown_user"}</small></p>
                            </hgroup>
                        </div>
                    </div>
                </div>
                <div className={styles.social_info}>
                    <div>
                        <div className={styles.number}>{user.postsCount ?? 0}</div>
                        <div className={styles.color_transp}>Posts</div>
                    </div>
                    <div>
                        <div className={styles.number}>{user.friendsCount ?? 0}</div>
                        <div className={styles.color_transp}>Friends</div>
                    </div>
                    <div>
                        <div className={styles.number}>{user.heartsGivenCount ?? 0}</div>
                        <div className={styles.color_transp}>Hearts given</div>
                    </div>
                </div>
                <div className={styles.connection_info}>
                    <h6>User bio :</h6>
                    <p className={styles.color_transp}>{user.bio || "No bio available."}</p>
                    <h6>User location :</h6>
                    <p className={styles.color_transp}>{user.loc || "No location available."}</p>
                    <p className={styles.color_transp + " " + styles.membersince}>
                        <FontAwesomeIcon icon={faCalendar} />
                        Member since {formattedCreatedAt}
                    </p>
                </div>
            </div>
        </div>
    );
}
