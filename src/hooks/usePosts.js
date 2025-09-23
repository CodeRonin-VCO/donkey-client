import { useAtom } from "jotai"
import { postsAtom } from "../stores/posts.stores.js"
import * as postsService from "./../services/posts.services.js";
import { tokenAtom } from "../stores/auth.stores.js";



export default function usePosts() {
    const [posts, setPosts] = useAtom(postsAtom);
    const [token] = useAtom(tokenAtom);


    const fetchCreatePosts = async (content, photo, videos) => {
        try {
            const result = await postsService.createPost(content, token, photo, videos);

            // Manage image url
            const correctedPost = {
                ...result.post,
                images: result.post.images.map(img =>
                    img.startsWith('http') ? img : `http://localhost:8008${img}`
                ),
                videos: result.post.videos.map(vid => vid.startsWith('http') ? vid : `http://localhost:8008${vid}`)
            };
            setPosts(prev => [correctedPost, ...prev]);

            return { success: true, post: result.post }

        } catch (error) {
            throw error;
        }
    };

    const fetchGetPosts = async () => {
        try {
            const result = await postsService.getPosts(token);
            setPosts(result.posts);

            return { success: true };

        } catch (error) {
            setPosts([]);
            throw error;
        };
    };

    const fetchToggleLike = async (postId) => {
        try {
            const result = await postsService.toggleLike(postId, token);
            setPosts(prevPosts => {
                const postIndex = prevPosts.findIndex(post => post._id === postId);

                if (postIndex === -1) {
                    console.warn("Post not found.");
                    return prevPosts;
                };

                const updatedPost = {
                    ...prevPosts[postIndex],
                    likesCount: result.likesCount,
                    isLiked: result.isLiked
                };

                return [
                    ...prevPosts.slice(0, postIndex),
                    updatedPost,
                    ...prevPosts.slice(postIndex + 1),
                ];
            });

            return { success: true };

        } catch (error) {
            console.error("Error toggle like", error);
            throw error;
        };
    };

    const fetchAddComments = async (postId, text) => {
        try {
            const result = await postsService.addComment(postId, text, token);
            setPosts(prevPosts => {
                const postIndex = prevPosts.findIndex(post => post._id === postId);

                if (postIndex === -1) {
                    console.warn("Post not found.");
                    return prevPosts;
                };

                const updatedPost = {
                    ...prevPosts[postIndex],
                    comments: [
                        ...prevPosts[postIndex].comments, 
                        result.comments,
                    ],
                    commentsCount: result.commentsCount
                };

                return [
                    ...prevPosts.slice(0, postIndex),
                    updatedPost,
                    ...prevPosts.slice(postIndex + 1),
                ];
            });

            return { success: true, commentsCount: result.commentsCount }

        } catch (error) {
            throw error
        };
    };

    const fetchGetComments = async (postId) => {
        try {
            const result = await postsService.getComments(postId, token);
            setPosts(prevPosts => {
            const postIndex = prevPosts.findIndex(post => post._id === postId);

            if (postIndex === -1) {
                console.warn("Post not found.");
                return prevPosts;
            }

            const updatedPost = {
                ...prevPosts[postIndex],
                comments: result.comments,
                commentsCount: result.comments.length
            };

            return [
                ...prevPosts.slice(0, postIndex),
                updatedPost,
                ...prevPosts.slice(postIndex + 1),
            ];
        });

            return { success: true, comments: result.comments };

        } catch (error) {
            throw error;
        };
    };

    return {
        posts,
        fetchCreatePosts,
        fetchGetPosts,
        fetchToggleLike,
        fetchAddComments,
        fetchGetComments
    };
};

