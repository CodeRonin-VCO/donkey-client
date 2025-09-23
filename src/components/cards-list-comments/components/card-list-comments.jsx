import styles from "./card-list-comments.module.css";

export default function ListCommentsCards({ comment }) {
    const { author, text, date } = comment;

    // Format date
    const formattedCreatedAt = new Date(date).toLocaleString("fr-FR", {
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
                {/* //todo: hover date */}
                <small className={styles.date}>{formattedCreatedAt}</small>
            </p>

            <div className={styles.cards_head}>
                {/* //todo: mettre une image fallback */}
                <div className={styles.avatar}><img src={author.avatar} alt={`logo-${author.firstname}`} /></div>
            </div>
        </article >
    )
}