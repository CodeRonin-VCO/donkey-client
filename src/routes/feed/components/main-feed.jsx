import FeedCards from "../../../components/cards-posts/cards-posts.jsx";
import PublishCards from "../../../components/cards-publish/cards-publish.jsx";
import styles from "./main-feed.module.css";

export default function MainFeedPage() {
    
    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <h2>News feed</h2>
                <h6 className={styles.color}>Discover the latest posts from your network</h6>
                <PublishCards />
                <FeedCards />
            </div>
        </main>
    )
}