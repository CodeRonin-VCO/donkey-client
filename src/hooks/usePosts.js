import { useAtom } from "jotai"
import { postsAtom } from "../stores/posts.stores.js"
import * as postsService from "./../services/posts.services.js";
import { tokenAtom } from "../stores/auth.stores.js";



export default function usePosts() {
    const [posts, setPosts] = useAtom(postsAtom);
    const [token] = useAtom(tokenAtom);


    const fetchCreatePosts = async ({ author, content, images }) => {

        try {
            const result = await postsService.createPost({ author, content, images }, token);
            setPosts(prev => [result.post, ...prev]);

            return { success: true }

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

