import styles from "./list-comments.module.css";
import usePosts from "../../hooks/usePosts.js";
import ListCommentsCards from "./components/card-list-comments.jsx";
import { useEffect } from "react";


export default function ListComments({ comments }) {
    // Fallback if no comments
    if (!comments || comments.length === 0) {
        <p className={styles.no_comments}>No comments yet.</p>
        return;
    };
        

    return (
        <>
            {
                comments.map(comment =>
                    <ListCommentsCards key={comment._id} comment={comment} />
                )
            }
        </>
    )
}