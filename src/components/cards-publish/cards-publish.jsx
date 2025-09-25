import styles from "./cards-publish.module.css";
import logoDonkey from "./../../assets/logo-donkey-profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faImage, faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { userAtom } from "../../stores/auth.stores.js";
import usePosts from "../../hooks/usePosts.js";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function PublishCards() {
    // trad
    const { t } = useTranslation();

    // Connection
    const [user] = useAtom(userAtom);

    // Manage create post
    const { fetchCreatePosts } = usePosts();
    const [content, setContent] = useState("");

    // Manage popup
    const [popupType, setPopupType] = useState(null);
    const [photo, setPhoto] = useState([]);
    const [photoFileName, setPhotoFileName] = useState("Choose a photo");
    const [video, setVideo] = useState([]);
    const [videoFileName, setVideoFileName] = useState("Choose a video");
    const textareaRef = useRef(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const fileNames = files.map(file => file.name);
        const inputType = e.target.name;

        switch (inputType) {
            case "photo":
                setPhoto(files);
                setPhotoFileName(fileNames.join(", "));
                break;
            case "video":
                setVideo(files);
                setVideoFileName(fileNames.join(", "));
                break;
            default:
                console.warn("Type de fichier non pris en charge :", inputType);
        }

        setPopupType(null);
    };

    const handlePublish = async () => {
        const contentToSend = content.trim() === "" && (photo.length > 0 || video.length > 0)
            ? " "
            : content;

        try {
            const result = await fetchCreatePosts(contentToSend, photo, video);

            if (result.success) {
                setContent("");
                setPhoto([]);
                setPhotoFileName(`${t("feed.choosePhoto")}`)
                setVideo([]);
                setVideoFileName(`${t("feed.chooseVideo")}`)
            };

        } catch (error) {
            console.error("Error during publication:", error);
        }
    }

    // Emoji
    const insertEmojiAtCursor = (emoji) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.focus();

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const before = content.slice(0, start);
        const after = content.slice(end);
        const newContent = before + emoji + after;

        setContent(newContent);

        setTimeout(() => {
            textarea.setSelectionRange(start + emoji.length, start + emoji.length);
        }, 0);

        setPopupType(null);
    };

    return (
        <article className={styles.cards + " " + styles.color}>
            <div className={styles.cards_head}>
                <div className={styles.avatar}><img src={user?.avatar ? user?.avatar : logoDonkey} alt="logo-user" /></div>
                <div>
                    <h6 className={styles.color_title}>{user?.firstname}</h6>
                    <p><small>{t("feed.share")}</small></p>
                </div>
            </div>
            <form className={styles.container_area} onSubmit={(e) => e.preventDefault()}>
                <textarea
                    name="post"
                    id="post"
                    placeholder={t("feed.whatsup")}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    ref={textareaRef}
                ></textarea>
            </form>
            {(photo.length) > 0 && (
                <div className={styles.media_caption}>
                    <p>{photoFileName}</p>
                    <button
                        type="button"
                        className={styles.btn_cancel}
                        onClick={() => {
                            setPhoto([]);
                            setPhotoFileName(`${t("feed.choosePhoto")}`);
                        }}
                    >
                        X
                    </button>
                </div>
            )}
            {(video.length > 0) && (
                <div className={styles.media_caption}>
                    <p>{videoFileName}</p>
                    <button
                        type="button"
                        className={styles.btn_cancel}
                        onClick={() => {
                            setVideo([]);
                            setVideoFileName(`${t("feed.chooseVideo")}`);
                        }}
                    >
                        X
                    </button>
                </div>
            )}
            <div className={styles.container_options}>
                <div className={styles.container_btn}>
                    <button className={styles.btn_add_content} onClick={() => setPopupType("photo")}>
                        <FontAwesomeIcon icon={faImage} />
                        <span className={styles.content_type}>{t("feed.photo")}</span>
                    </button>
                    <button className={styles.btn_add_content} onClick={() => setPopupType("video")}>
                        <FontAwesomeIcon icon={faVideo} />
                        <span className={styles.content_type}>{t("feed.video")}</span>
                    </button>
                    <button className={styles.btn_add_content} onClick={() => setPopupType("emoji")}>
                        <FontAwesomeIcon icon={faFaceSmile} />
                        <span className={styles.content_type}>{t("feed.emoji")}</span>
                    </button>
                    <button
                        className={styles.btn_publish}
                        onClick={handlePublish}
                    >
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        <span className={styles.content_type}>{t("feed.publish")}</span>
                    </button>
                </div>
            </div>

            {/* // ==== Popups ==== */}
            {popupType === "photo" && (
                <div className={styles.popup}>
                    <h6>{t("feed.uploadPhoto")}</h6>
                    <div className={styles.container_input}>
                        <label htmlFor="photo-upload" className={styles.custom_file_upload}>{photoFileName}</label>
                        <input
                            type="file"
                            id="photo-upload"
                            name="photo"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className={styles.btn_container}>
                        <button type="button" className={styles.btn_cancel} onClick={() => setPopupType(null)}>{t("feed.cancel")}</button>
                    </div>
                </div>
            )}
            {popupType === "video" && (
                <div className={styles.popup}>
                    <h6>{t("feed.uploadVideo")}</h6>
                    <div className={styles.container_input}>
                        <label htmlFor="video-upload" className={styles.custom_file_upload}>{videoFileName}</label>
                        <input
                            type="file"
                            id="video-upload"
                            name="video"
                            accept="video/*"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className={styles.btn_container}>
                        <button type="button" className={styles.btn_cancel} onClick={() => setPopupType(null)}>{t("feed.cancel")}</button>
                    </div>
                </div>
            )}
            {popupType === "emoji" && (
                <div className={styles.popup}>
                    <h6>{t("feed.selectEmoji")}</h6>
                    <div className={styles.emoji_grid}>
                        {["😄", "❤️", "🔥", "😂", "😎", "👍", "💪", "😭", "😍", "😘", "🎉", "🙏", "✨", "👀", "👻", "🤮", "🤩", "😡"].map((emoji, index) => (
                            <button key={index} onClick={() => insertEmojiAtCursor(emoji)}>
                                {emoji}
                            </button>
                        ))}
                    </div>
                    <div className={styles.btn_container}>
                        <button type="button" className={styles.btn_cancel} onClick={() => setPopupType(null)}>{t("feed.cancel")}</button>
                    </div>
                </div>
            )}
        </article>
    )
}