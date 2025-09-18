import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./bio.module.css";
import { faCalendar, faCamera, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import logoDonkey from "./../../assets/logo-donkey-profile.png";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function BioComponent() {
    // todo: affichage dynamique !!

    const [isModified, setIsModified] = useState(false);
    const [isBanner, setIsBanner] = useState(false);
    const [isAvatar, setIsAvatar] = useState(false);

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


    return (
        <div className={styles.wrapper}>
            <div className={styles.banner}>
                <button type="button" className={styles.btn_add_pic} onClick={() => onModifyingBanner()}>
                    <FontAwesomeIcon icon={faCamera} />
                </button>
                {
                    isBanner && <div className={styles.popup}>
                        <h6>Upload your new banner :</h6>
                        <div className={styles.container_input}>
                            <label htmlFor="file" className={styles.custom_file_upload}>Upload file : Browse 📎</label>
                            <input type="file" id="file" name="file" />
                        </div>
                        <div className={styles.btn_container}>
                            <button type="submit" className={styles.btn_save}>Save</button>
                            <button type="button" className={styles.btn_cancel} onClick={() => onModifyingBanner()}>Cancel</button>
                        </div>
                    </div>
                }
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
                                {
                                    isAvatar && <div className={styles.popup}>
                                        <h6>Upload your new avatar :</h6>
                                        <div className={styles.container_input}>
                                            <label htmlFor="file" className={styles.custom_file_upload}>Upload file : Browse 📎</label>
                                            <input type="file" id="file" name="file" />
                                        </div>
                                        <div className={styles.btn_container}>
                                            <button type="submit" className={styles.btn_save}>Save</button>
                                            <button type="button" className={styles.btn_cancel} onClick={() => onModifyingAvatar()}>Cancel</button>
                                        </div>
                                    </div>
                                }
                            </div>
                            <hgroup className={styles.hgroup}>
                                <h6 className={styles.color_title}>Donkey</h6>
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
                        ? <form action="" className={styles.form_info}>
                            <div className={styles.input_group}>
                                <label htmlFor="firstname">Firstname:</label>
                                <input type="text" id="firstname" placeholder="Ex.: Jean" />
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="lastname">Lastname:</label>
                                <input type="text" id="lastname" placeholder="Ex/: Peuplu" />
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" placeholder="Ex.: jean@peuplu.com" />
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="bio">Bio</label>
                                <textarea name="bio" id="bio" placeholder="Tell us about yourself" rows={3}></textarea>
                            </div>
                            <div className={styles.input_group}>
                                <label htmlFor="loc">Localisation</label>
                                <input type="text" id="loc" placeholder="Your city, country" />
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
        </div>
    )
}