import { useAtom } from "jotai"
import { postsAtom } from "../stores/posts.stores.js"
import * as postsService from "./../services/posts.services.js";
import { tokenAtom } from "../stores/auth.stores.js";



export default function usePosts() {
    const [posts, setPosts] = useAtom(postsAtom);
    const [token] = useAtom(tokenAtom);


    const fetchCreatePosts = async ({ author, content }, photo, videos) => {

        try {
            const result = await postsService.createPost({ author, content }, token, photo, videos);

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

            return { success: true }

        } catch (error) {
            setPosts([]);
            throw error;
        }
    };

    return {
        posts,
        fetchCreatePosts,
        fetchGetPosts
    };
};

