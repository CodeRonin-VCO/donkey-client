import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./profile.module.css";
import { faCalendar, faCamera, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import logoDonkey from "./../../assets/logo-donkey-profile.png";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useActionState, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../stores/auth.stores.js";
import useUser from "../../hooks/useUser.js";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";


export default function ProfileComponent() {
    // trad
    const { t } = useTranslation();

    const [isModified, setIsModified] = useState(false);
    const [isBanner, setIsBanner] = useState(false);
    const [isAvatar, setIsAvatar] = useState(false);
    const [avatarFileName, setAvatarFileName] = useState("Upload avatar 📎");
    const [bannerFileName, setBannerFileName] = useState("Upload banner 📎");
    const [user] = useAtom(userAtom);
    const [token] = useAtom(tokenAtom);
    const { fetchGetPersonalData, fetchChangePersonalData, fetchDeletePersonalData, uploadUserAvatar, uploadUserBanner } = useUser();
    const navigate = useNavigate();

    // Load data
    useEffect(() => {
        const loadUserData = async () => {
            try {
                await fetchGetPersonalData();

            } catch (error) {
                console.error("Failed to fetch personal data", error);
            };
        };
        loadUserData();

    }, [token]);

    function onModifyInfo() {
        if (!isModified) {
            setIsModified(true)
        } else {
            setIsModified(false)
        };
    };

    function onModifyingBanner() {
        if (!isBanner) {
            setIsBanner(true)
        } else {
            setIsBanner(false)
        };
    };

    function onModifyingAvatar() {
        if (!isAvatar) {
            setIsAvatar(true)
        } else {
            setIsAvatar(false)
        };
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const inputName = e.target.name;

        if (file) {
            if (inputName === "avatar") {
                setAvatarFileName(file.name);
            } else if (inputName === "banner") {
                setBannerFileName(file.name);
            }
        }
    };

    // Upload banner
    const handleBannerUpload = async () => {
        if (!bannerFileName || bannerFileName === "Upload banner 📎") return;

        const fileInput = document.getElementById("banner-upload");
        const file = fileInput?.files?.[0];
        if (!file) return;

        try {
            await uploadUserBanner(file);
            await fetchGetPersonalData();
            setIsBanner(false);
            setBannerFileName("Upload banner 📎");
        } catch (error) {
            console.error(error.message || "Failed to upload banner");
        }
    };

    // Upload avatar
    const handleAvatarUpload = async () => {
        if (!avatarFileName || avatarFileName === "Upload avatar 📎") return;

        const fileInput = document.getElementById("avatar-upload");
        const file = fileInput?.files?.[0];
        if (!file) return;

        try {
            await uploadUserAvatar(file);
            await fetchGetPersonalData();
            setIsAvatar(false);
            setAvatarFileName("Upload avatar 📎");
        } catch (error) {
            console.error(error.message || "Failed to upload avatar");
        }
    };

    // Manage form → upload text info
    async function onSubmitForm(prevState, formData) {
        const requiredFields = ["firstname", "lastname", "bio", "loc"];
        let updates = {};
        const errors = {};

        for (const field of requiredFields) {
            // Get data
            const value = formData.get(field);

            // Add errors
            if (!value) {
                errors[field] = "This field must be completed.";
            } else {
                updates[field] = value;
            };
        };

        if (Object.keys(errors).length > 0) {
            return { data: null, errors, message: "Invalid data. All fields are required." }
        };

        try {
            await fetchChangePersonalData(updates);
            await fetchGetPersonalData();
            setIsModified(false);

            return { data: updates, message: "Your profile has been successfully updated. 🎉", errors: {} }

        } catch (error) {
            return { data: null, errors: {}, message: error.message || "Failed to update profile." };
        };
    };

    // Delete account
    async function handleDeleteAccount() {
        const confirmation = window.confirm("Are you sure you want to delete your account? This action is irreversible.")
        if (!confirmation) return;

        try {
            await fetchDeletePersonalData();
            navigate("/login");

        } catch (error) {
            console.error("Failed to delete account.", error.message);
        };
    };

    // Submit ActionState
    const initialData = { data: null, message: null, errors: {} }
    const [state, handleform, isPending] = useActionState(onSubmitForm, initialData)

    // Format date
    const formattedCreatedAt = new Date(user?.createdAt).toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.banner}>
                {user?.banner && <img src={user?.banner} alt="No banner" />}
                <button type="button" className={styles.btn_add_pic} onClick={() => onModifyingBanner()}>
                    <FontAwesomeIcon icon={faCamera} />
                </button>

            </div>
            <div className={styles.user_info}>
                <div className={styles.profile}>
                    <div className={styles.personnal_data}>
                        <div className={styles.cards_head}>
                            <div className={styles.avatar}>
                                <img src={user?.avatar || logoDonkey} alt="logo-user" />
                                <button type="button" className={styles.btn_add_pic + " " + styles.add_pic_bottom} onClick={() => onModifyingAvatar()}>
                                    <FontAwesomeIcon icon={faCamera} />
                                </button>
                            </div>
                            <hgroup className={styles.hgroup}>
                                <h6 className={styles.color_title}>{user?.firstname + " " + user?.lastname}</h6>
                                <p className={styles.color_transp}><small>{user?.email || "@current_user"}</small></p>
                            </hgroup>
                        </div>
                    </div>
                    <div className={styles.modify}>
                        <button type="button" className={styles.btn_add_content} onClick={() => onModifyInfo()}>
                            <FontAwesomeIcon icon={faPencil} />
                            <span className={styles.content_type}>{t("profile.modifypro")}</span>
                        </button>
                        <button type="button" className={styles.btn_delete_profile} onClick={handleDeleteAccount}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </div>
                </div>
                <div className={styles.social_info}>
                    <div>
                        <div className={styles.number}>{user?.postsCount ?? 0}</div>
                        <div className={styles.color_transp}>{t("profile.posts")}</div>
                    </div>
                    <div>
                        <div className={styles.number}>{user?.friendsCount ?? 0}</div>
                        <div className={styles.color_transp}>{t("profile.friends")}</div>
                    </div>
                    <div>
                        <div className={styles.number}>{user?.heartsGivenCount ?? 0}</div>
                        <div className={styles.color_transp}>{t("profile.Hearts")}</div>
                    </div>
                </div>

                {
                    isModified
                        ? <form action={handleform} className={styles.form_info}>
                            <div className={styles.input_group}>
                                <label htmlFor="firstname">{t("profile.Firstname")}:</label>
                                <input type="text" id="firstname" name="firstname" placeholder="Ex.: Jean" defaultValue={user?.firstname || ""} />
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="lastname">{t("profile.Lastname")}:</label>
                                <input type="text" id="lastname" name="lastname" placeholder="Ex.: Peuplu" defaultValue={user?.lastname || ""} />
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="bio">{t("profile.bio")}</label>
                                <textarea name="bio" id="bio" placeholder={t("profile.placeBio")} rows={3} defaultValue={user?.bio || ""}></textarea>
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="loc">{t("profile.loc")}</label>
                                <input type="text" id="loc" name="loc" placeholder={t("profile.placeLoc")} defaultValue={user?.loc || ""} />
                            </div>
                            <div className={styles.btn_container}>
                                <button type="submit" className={styles.btn_save}>{isPending ? `${t("profile.saving")}` : `${t("profile.save")}`}</button>
                                <button type="button" className={styles.btn_cancel} onClick={() => onModifyInfo()}>{t("profile.cancel")}</button>
                            </div>
                        </form>
                        : <div className={styles.connection_info}>
                            <h6>{t("profile.userBio")}</h6>
                            <p className={styles.color_transp}>{user?.bio || `${t("profile.noBio")}`}</p>
                            <h6>{t("profile.userLoc")}</h6>
                            <p className={styles.color_transp}>{user?.loc || `${t("profile.noLoc")}`}</p>
                            <p className={styles.color_transp + " " + styles.membersince}>
                                <FontAwesomeIcon icon={faCalendar} />
                                {t("profile.memberSince")} {formattedCreatedAt}
                            </p>
                        </div>
                }
            </div>

            {/* // ==== Popup ==== */}
            {
                isAvatar && <div className={styles.popup}>
                    <h6>{t("profile.uploadAvatar")}</h6>
                    <div className={styles.container_input}>
                        <label htmlFor="avatar-upload" className={styles.custom_file_upload}>{avatarFileName}</label>
                        <input type="file" id="avatar-upload" name="avatar" onChange={handleFileChange} />
                    </div>
                    <div className={styles.btn_container}>
                        <button type="submit" className={styles.btn_save} onClick={handleAvatarUpload}>{t("profile.save")}</button>
                        <button type="button" className={styles.btn_cancel} onClick={() => onModifyingAvatar()}>{t("profile.cancel")}</button>
                    </div>
                </div>
            }
            {
                isBanner && <div className={styles.popup}>
                    <h6>{t("profile.uploadBanner")}</h6>
                    <div className={styles.container_input}>
                        <label htmlFor="banner-upload" className={styles.custom_file_upload}>{bannerFileName}</label>
                        <input type="file" id="banner-upload" name="banner" onChange={handleFileChange} />
                    </div>
                    <div className={styles.btn_container}>
                        <button type="submit" className={styles.btn_save} onClick={handleBannerUpload}>{t("profile.save")}</button>
                        <button type="button" className={styles.btn_cancel} onClick={() => onModifyingBanner()}>{t("profile.cancel")}</button>
                    </div>
                </div>
            }
        </div>
    )
}