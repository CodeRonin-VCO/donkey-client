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


export default function PostsCards({ post }) {
    const [isLoved, setIsLoved] = useState(false);
    const [isCommented, setIsCommented] = useState(false);

    const { author, content, images, createdAt } = post;

    function onLovedElement() {
        if (!isLoved) {
            setIsLoved(true);
        } else {
            setIsLoved(false)
        };
    };
    function onCommentedelement() {
        if (!isCommented) {
            setIsCommented(true);
        } else {
            setIsCommented(false)
        };
    }

    return (
        <article className={styles.cards}>
            <div className={styles.cards_head}>
                <div className={styles.avatar}><img src={author.avatar} alt={`logo-${author.firstname}`} /></div>
                <div>
                    <h6 className={styles.color_title}>{author.firstname}</h6>
                    <p className={styles.color}><small>{createdAt}</small></p>
                </div>
            </div>
            <div className={styles.container_content}>
                <p className={styles.txt_content}>{content}</p>
                {images?.length > 0 && <img src={images[0]} alt="post media" />}
            </div>
            <div className={styles.container_options}>
                <div className={styles.container_btn}>
                    {
                        isLoved
                            ? <button className={styles.btn_add_content + " " + styles.heartfull} onClick={() => onLovedElement()}>
                                <FontAwesomeIcon icon={["fas", "heart"]} />
                                <span className={styles.content_type}>56</span>
                            </button>
                            : <button className={styles.btn_add_content + " " + styles.heart} onClick={() => onLovedElement()}>
                                <FontAwesomeIcon icon={["far", "heart"]} />
                                <span className={styles.content_type}>56</span>
                            </button>
                    }
                    <button className={styles.btn_add_content + " " + styles.comment} onClick={() => onCommentedelement()}>
                        <FontAwesomeIcon icon={faComment} />
                        <span className={styles.content_type}>0</span>
                    </button>


                </div>
                {
                    isCommented && (
                        <div className={styles.section_comments}>
                            <ListComments />
                            <CommentsCards />
                        </div>
                    )
                }
            </div>
        </article>
    )
}