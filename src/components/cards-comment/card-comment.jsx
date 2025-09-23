import styles from "./card-comment.module.css";
import logoDonkey from "./../../assets/logo-donkey-perplexe.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import usePosts from "../../hooks/usePosts.js";
import { useAtom } from "jotai";
import { userAtom } from "../../stores/auth.stores.js";


export default function CommentsCards({ post, token, onCommentsAdded }) {
    const [user] = useAtom(userAtom);
    const {_id} = post;
    const [newCommentText, setNewCommentText] = useState("");

    const { fetchAddComments } = usePosts();

    const handleAddComments = async (e) => {
        e.preventDefault();

        try {
            const result = await fetchAddComments(_id, newCommentText, token);

            onCommentsAdded(result.commentsCount);
            setNewCommentText(""); // réinitialiser le champ    

        } catch (error) {
            console.error("Error adding comment:", error);
        };
    };


    return (
        <article className={styles.cards}>

            <div className={styles.cards_head}>
                <div className={styles.avatar}><img src={user.avatar || logoDonkey} alt={`logo-${user.firstname}`} /></div>
            </div>

            <form className={styles.container_area} onSubmit={handleAddComments}>
                <textarea
                    name="comment"
                    id="comment"
                    placeholder="Write a comment."
                    className={styles.add_comment}
                        rows={1}
                        value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onInput={(e) => {
                        e.target.style.height = 'auto'
                        e.target.style.height = `${e.target.scrollHeight}px`
                    }}>
                </textarea>

                <button className={styles.btn_publish_comment} type="submit">
                    <FontAwesomeIcon icon={faShareNodes} />
                    <span className={styles.content_type}>Share</span>
                </button>
            </form>
        </article>
    )
}