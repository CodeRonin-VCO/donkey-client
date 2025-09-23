// ---- Import fontAwesome ----
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faComment, faFaceSmile, faShareFromSquare, faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faVideo, faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
library.add(farHeart, fasHeart, faComment, faFaceSmile, faShareFromSquare, faVideo);
// ---- Fin import fontAwesome ----

import styles from "./cards-post.module.css";
import { useState } from "react";
import CommentsCards from "./../../cards-comment/card-comment.jsx";
import ListComments from "./../../cards-list-comments/list-comments.jsx";
import usePosts from "../../../hooks/usePosts.js";


export default function PostsCards({ post, token }) {

    const { author, content, images, videos, createdAt, likesCount, isLiked, comments, commentsCount } = post;

    const [isLoved, setIsLoved] = useState(isLiked || false);
    const [isLovedCount, setIsLovedCount] = useState(likesCount || 0);
    const [openCommentsSection, setOpenCommentsSection] = useState(false);
    const [isCommentsCount, setIsCommentsCount] = useState(commentsCount || 0);

    const { fetchToggleLike, fetchGetComments } = usePosts();

    // Manage like/heart
    const handleToggleLike = async () => {
        try {
            // Call backend
            await fetchToggleLike(post._id, token);

            if (isLoved) {
                setIsLovedCount(isLovedCount - 1);
            } else {
                setIsLovedCount(isLovedCount + 1);
            };

            setIsLoved(!isLoved);


        } catch (error) {
            console.error("Error liking", error);

            if (isLoved) {
                setIsLovedCount(isLovedCount + 1);
            } else {
                setIsLovedCount(isLovedCount - 1);
            };

            setIsLoved(!isLoved);
        };
    };

    // Open/ close section comments
    const toggleCommentsSection = async () => {
        if (!openCommentsSection) {
            // Load comments if opened section
            await fetchGetComments(post._id);
        };

        setOpenCommentsSection(!openCommentsSection);
    };

    // Format date
    const formattedCreatedAt = new Date(createdAt).toLocaleString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <article className={styles.cards}>
            <div className={styles.cards_head}>
                <div className={styles.avatar}><img src={author.avatar} alt={`logo-${author.firstname}`} /></div>
                <div>
                    <h6 className={styles.color_title}>{author.firstname}</h6>
                    <p className={styles.color}><small>{formattedCreatedAt}</small></p>
                </div>
            </div>
            <div className={styles.container_content}>
                <p className={styles.txt_content}>{content}</p>
                {images?.length > 0 && <img src={images[0]} alt="post media" />}
                {videos?.length > 0 && <video src={videos[0]} autoPlay muted controls></video>}

            </div>
            <div className={styles.container_options}>
                <div className={styles.container_btn}>
                    {
                        isLoved
                            ? <button className={styles.btn_add_content + " " + styles.heartfull} onClick={handleToggleLike}>
                                <FontAwesomeIcon icon={["fas", "heart"]} />
                                <span className={styles.content_type}>{isLovedCount}</span>
                            </button>
                            : <button className={styles.btn_add_content + " " + styles.heart} onClick={handleToggleLike}>
                                <FontAwesomeIcon icon={["far", "heart"]} />
                                <span className={styles.content_type}>{isLovedCount}</span>
                            </button>
                    }
                    <button className={styles.btn_add_content + " " + styles.comment} onClick={toggleCommentsSection}>
                        <FontAwesomeIcon icon={faComment} />
                        <span className={styles.content_type}>{isCommentsCount}</span>
                    </button>


                </div>
                {
                    openCommentsSection && (
                        <div className={styles.section_comments}>
                            <ListComments comments={comments} />
                            <CommentsCards
                                post={post}
                                token={token}
                                onCommentsAdded={setIsCommentsCount} />
                        </div>
                    )
                }
            </div>
        </article>
    )
}