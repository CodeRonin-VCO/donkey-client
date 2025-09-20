import usePosts from "../../hooks/usePosts.js";
import styles from "./cards-feed.module.css";
import { useEffect } from "react";
import PostsCards from "./components/cards-post.jsx";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../stores/auth.stores.js";



export default function FeedCards() {
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
                        currentUserId={user?._id}
                    />
                ))
            ) : (
                <p className={styles.empty}>Aucun post à afficher.</p>
            )}
        </>
    )
}