import FeedCards from "../../../components/feed-cards/feed-cards.jsx";
import styles from "./main-feed.module.css";

export default function MainFeedPage() {
    
    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <h2>News feed</h2>
                <h6 className={styles.color}>Discover the latest posts from your network</h6>
                <FeedCards />
            </div>
        </main>
    )
}