import styles from "./main-feed.module.css";
import FeedCards from "../../../components/cards-feed/cards-feed.jsx";
import PublishCards from "../../../components/cards-publish/cards-publish.jsx";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/auth.stores.js";
import { useTranslation } from "react-i18next";

export default function MainFeedPage() {
    // trad
    const { t } = useTranslation();

    const [user] = useAtom(userAtom);

    return (
        <main className={styles.main}>
            <h1 className={styles.title_username}>{t("feed.Welcome")} <span className={styles.name}>{user?.firstname} !</span></h1>
            <div className={styles.wrapper}>
                <h2>{t("feed.news")}</h2>
                <h6 className={styles.color}>{t("feed.discover")}</h6>
                <PublishCards />
                <FeedCards />
            </div>
        </main>
    )
}