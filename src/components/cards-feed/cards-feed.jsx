import usePosts from "../../hooks/usePosts.js";
import styles from "./cards-feed.module.css";
import { useEffect } from "react";
import PostsCards from "./components/cards-post.jsx";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../stores/auth.stores.js";
import { useTranslation } from "react-i18next";


export default function FeedCards() {
    // trad
    const { t } = useTranslation();

    const { posts, fetchGetPosts } = usePosts();
    const [token] = useAtom(tokenAtom)
    const [user] = useAtom(userAtom);

    useEffect(() => {
        if (token) {
            fetchGetPosts();
        }
    }, [token]);


    return (
        <>
            {posts?.length > 0 ? (
                posts.map(post => (
                    <PostsCards
                        key={post._id}
                        post={post}
                        token={token}
                    />
                ))
            ) : (
                <p className={styles.empty}>{t("feed.noPost")}</p>
            )}
        </>
    )
}