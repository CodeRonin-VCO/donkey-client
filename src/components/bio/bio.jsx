import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./bio.module.css";
import { faCalendar, faCamera, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import logoDonkey from "./../../assets/logo-donkey-profile.png";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useActionState, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../stores/auth.stores.js";


export default function BioComponent() {
    // todo: affichage dynamique !!

    const [isModified, setIsModified] = useState(false);
    const [isBanner, setIsBanner] = useState(false);
    const [isAvatar, setIsAvatar] = useState(false);
    const [avatarFileName, setAvatarFileName] = useState("Upload avatar 📎");
    const [bannerFileName, setBannerFileName] = useState("Upload banner 📎");
    const [user] = useAtom(userAtom);

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
    }
    function onModifyingAvatar() {
        if (!isAvatar) {
            setIsAvatar(true)
        } else {
            setIsAvatar(false)
        };
    }

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


    // Manage form
    async function onSubmitForm(prevState, formData) {
        const requiredFields = ["firstname", "lastname", "email", "bio", "loc"];
        let data = {};

        const errors = {};

        for (const field of requiredFields) {
            // Get data
            const value = formData.get(field);
            data[field] = value;

            // Add errors
            if (!value) {
                errors[field] = "This field must be completed.";
            };
        };

        if (Object.keys(errors).length > 0) {
            return { data: null, errors, message: "Invalid data. All fields are required." }
        };

        return { data: data, message: "Your form has been successfully submitted. 🎉", errors }
    }

    // Submit ActionState
    const initialData = { data: null, message: null, errors: {} }
    const [state, handleform, isPending] = useActionState(onSubmitForm, initialData)

    return (
        <div className={styles.wrapper}>
            <div className={styles.banner}>
                <button type="button" className={styles.btn_add_pic} onClick={() => onModifyingBanner()}>
                    <FontAwesomeIcon icon={faCamera} />
                </button>

            </div>
            <div className={styles.user_info}>
                <div className={styles.profile}>
                    <div className={styles.personnal_data}>
                        <div className={styles.cards_head}>
                            <div className={styles.avatar}>
                                <img src={logoDonkey} alt="logo-user" />
                                <button type="button" className={styles.btn_add_pic + " " + styles.add_pic_bottom} onClick={() => onModifyingAvatar()}>
                                    <FontAwesomeIcon icon={faCamera} />
                                </button>
                            </div>
                            <hgroup className={styles.hgroup}>
                                <h6 className={styles.color_title}>{user?.firstname}</h6>
                                <p className={styles.color_transp}><small>@current_user</small></p>
                            </hgroup>
                        </div>
                    </div>
                    <div className={styles.modify}>
                        <button type="button" className={styles.btn_add_content} onClick={() => onModifyInfo()}>
                            <FontAwesomeIcon icon={faPencil} />
                            <span className={styles.content_type}>Modify profile</span>
                        </button>
                        <button type="button" className={styles.btn_delete_profile}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </div>
                </div>
                <div className={styles.social_info}>
                    <div>
                        <div className={styles.number}>0</div>
                        <div className={styles.color_transp}>Posts</div>
                    </div>
                    <div>
                        <div className={styles.number}>42</div>
                        <div className={styles.color_transp}>Subscribers</div>
                    </div>
                    <div>
                        <div className={styles.number}>38</div>
                        <div className={styles.color_transp}>Subscriptions</div>
                    </div>
                </div>

                {
                    isModified
                        ? <form action={handleform} className={styles.form_info}>
                            <div className={styles.input_group}>
                                <label htmlFor="firstname">Firstname:</label>
                                <input type="text" id="firstname" name="firstname" placeholder="Ex.: Jean" />
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="lastname">Lastname:</label>
                                <input type="text" id="lastname" name="lastname" placeholder="Ex/: Peuplu" />
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" placeholder="Ex.: jean@peuplu.com" />
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="bio">Bio</label>
                                <textarea name="bio" id="bio" placeholder="Tell us about yourself" rows={3}></textarea>
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="loc">Localisation</label>
                                <input type="text" id="loc" name="loc" placeholder="Your city, country" />
                            </div>
                            <div className={styles.btn_container}>
                                <button type="submit" className={styles.btn_save}>Save</button>
                                <button type="button" className={styles.btn_cancel} onClick={() => onModifyInfo()}>Cancel</button>
                            </div>
                        </form>
                        : <div className={styles.connection_info}>
                            <h6>User connected.</h6>
                            <p className={styles.color_transp}>
                                <FontAwesomeIcon icon={faCalendar} />
                                Member since January 2024
                            </p>
                        </div>
                }
            </div>

            {/* // ==== Popup ==== */}
            {
                isAvatar && <div className={styles.popup}>
                    <h6>Upload your new avatar :</h6>
                    <div className={styles.container_input}>
                        <label htmlFor="avatar-upload" className={styles.custom_file_upload}>{avatarFileName}</label>
                        <input type="file" id="avatar-upload" name="avatar" onChange={handleFileChange} />
                    </div>
                    <div className={styles.btn_container}>
                        <button type="submit" className={styles.btn_save}>Save</button>
                        <button type="button" className={styles.btn_cancel} onClick={() => onModifyingAvatar()}>Cancel</button>
                    </div>
                </div>
            }
            {
                isBanner && <div className={styles.popup}>
                    <h6>Upload your new banner :</h6>
                    <div className={styles.container_input}>
                        <label htmlFor="banner-upload" className={styles.custom_file_upload}>{bannerFileName}</label>
                        <input type="file" id="banner-upload" name="banner" onChange={handleFileChange} />
                    </div>
                    <div className={styles.btn_container}>
                        <button type="submit" className={styles.btn_save}>Save</button>
                        <button type="button" className={styles.btn_cancel} onClick={() => onModifyingBanner()}>Cancel</button>
                    </div>
                </div>
            }
        </div>
    )
}