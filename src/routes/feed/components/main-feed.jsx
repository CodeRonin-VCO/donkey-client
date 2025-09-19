import styles from "./main-feed.module.css";
import FeedCards from "../../../components/cards-feed/cards-feed.jsx";
import PublishCards from "../../../components/cards-publish/cards-publish.jsx";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/auth.stores.js";

export default function MainFeedPage() {
    const [user] = useAtom(userAtom);

    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                <h1 className={styles.title_username}>Welcome <span className={styles.name}>{user?.firstname} !</span></h1>
                <h2>News feed</h2>
                <h6 className={styles.color}>Discover the latest posts from your network</h6>
                <PublishCards />
                <FeedCards />
            </div>
        </main>
    )
}