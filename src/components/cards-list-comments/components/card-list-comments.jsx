import styles from "./card-list-comments.module.css";
import logoDonkey from "./../../../assets/logo-donkey-profile.png";
import { useTranslation } from "react-i18next";


export default function ListCommentsCards({ comment }) {
    // trad
    const { t } = useTranslation();
    const { author, text, date } = comment;

    // Format date
    const formattedCreatedAt = new Date(date).toLocaleString(`${t("feed.fr-FR")}`, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <article className={styles.container_list}>
            <p className={styles.comments}>
                <span>{text}</span>
                <small className={styles.date}>{formattedCreatedAt}</small>
            </p>

            <div className={styles.cards_head}>
                <div className={styles.avatar}><img src={author.avatar || logoDonkey} alt={`logo-${author.firstname}`} /></div>
                <p><small>{author.firstname}</small></p>
            </div>
        </article >
    )
}