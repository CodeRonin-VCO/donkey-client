import styles from "./card-comment.module.css";
import logoDonkey from "./../../assets/logo-donkey-perplexe.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";


export default function CommentsCards() {
    // todo: affichage dynamique (photo utilisateur + connect DB)

    return (
        <article className={styles.cards}>
            
            <div className={styles.cards_head}>
                <div className={styles.avatar}><img src={logoDonkey} alt="logo-user" /></div>
            </div>

            <form className={styles.container_area}>
                <textarea
                    name="comment"
                    id="comment"
                    placeholder="Write a comment."
                    className={styles.add_comment}
                    rows={1}
                    onInput={(e) => {
                        e.target.style.height = 'auto'
                        e.target.style.height = `${e.target.scrollHeight}px`
                    }}>
                </textarea>

                <button className={styles.btn_publish_comment}>
                    <FontAwesomeIcon icon={faShareNodes} />
                    <span className={styles.content_type}>Share</span>
                </button>
            </form>
        </article>
    )
}