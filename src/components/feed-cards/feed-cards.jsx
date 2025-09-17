import styles from "./feed-cards.module.css";
import logoDonkey from "./../../assets/logo-donkey-profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faImage, faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

export default function FeedCards() {
    // todo: rendre l'affichage dynamique ← mockup

    return (
        <article className={styles.cards + " " + styles.color}>
            <div className={styles.cards_head}>
                <div className={styles.avatar}><img src={logoDonkey} alt="logo-user" /></div>
                <div>
                    <h6 className={styles.color_title}>Donkey</h6>
                    <p><small>Share something...</small></p>
                </div>
            </div>
            <form className={styles.container_area}>
                <textarea name="post" id="post" placeholder="What's up?"></textarea>
            </form>
            <div className={styles.container_options}>
                <div className={styles.container_btn}>
                    <button className={styles.btn_add_content}>
                        <FontAwesomeIcon icon={faImage} />
                        <span className={styles.content_type}>Photo</span>
                    </button>
                    <button className={styles.btn_add_content}>
                        <FontAwesomeIcon icon={faVideo} />
                        <span className={styles.content_type}>Videos</span>
                    </button>
                    <button className={styles.btn_add_content}>
                        <FontAwesomeIcon icon={faFaceSmile} />
                        <span className={styles.content_type}>Emoji</span>
                    </button>
                    <button className={styles.btn_publish}>
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        <span className={styles.content_type}>Publish</span>
                    </button>
                </div>
            </div>
        </article>
    )
}