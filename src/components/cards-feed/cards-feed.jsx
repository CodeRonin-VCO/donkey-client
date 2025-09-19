import usePosts from "../../hooks/usePosts.js";
import styles from "./cards-feed.module.css";
import { useEffect, useState } from "react";
import PostsCards from "./components/cards-post.jsx";
import { useAtom } from "jotai";
import { tokenAtom } from "../../stores/auth.stores.js";



export default function FeedCards() {
    const { posts, fetchGetPosts } = usePosts();
    const [token] = useAtom(tokenAtom)

    useEffect(() => {
        if (token) {
            fetchGetPosts();
        }
    }, [token]);


    return (
        <>
            {posts?.length > 0 ? (
                posts.map(post => (
                    <PostsCards key={post._id} post={post} />
                ))
            ) : (
                <p className={styles.empty}>Aucun post à afficher.</p>
            )}
        </>
    )
}