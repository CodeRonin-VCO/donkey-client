import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../stores/auth.stores.js";
import * as userService from "./../services/user.services.js";


export default function useUser() {
    const [user, setUser] = useAtom(userAtom);
    const [token, setToken] = useAtom(tokenAtom);

    const fetchGetPersonalData = async () => {
        try {
            const result = await userService.getPersonalData(token);
            setUser(result.user);

            return { success: true };

        } catch (error) {
            setUser({});
            throw error;
        };
    };

    const fetchChangePersonalData = async (updates) => {
        try {
            const result = await userService.changePersonalData(token, updates);
            setUser(result.user);

            return { success: true, user: result.user };

        } catch (error) {
            throw error;
        };
    };

    const fetchDeletePersonalData = async () => {
        try {
            const result = await userService.deletePersonalData(token);
            setUser({});
            setToken(null);

            return { success: true };

        } catch (error) {
            throw error;
        };
    };

    const uploadUserBanner = async (bannerFile) => {
        try {
            const result = await userService.uploadBanner(token, bannerFile);
            if (result.user) {
                setUser(result.user);
            }
            return { success: true, user: result.user };
        } catch (error) {
            throw error;
        }
    };

    const uploadUserAvatar = async (avatarFile) => {
        try {
            const result = await userService.uploadAvatar(token, avatarFile);
            if (result.user) {
                setUser(result.user);
            }
            return { success: true, user: result.user };
        } catch (error) {
            throw error;
        }
    };

    const fetchGetUserFriends = async () => {
        try {
            const result = await userService.getUserFriends(token);

            return { success: true, friends: result.friends }

        } catch (error) {
            throw error;
        };
    };

    const fetchGetAllUsers = async () => {
        try {
            const result = await userService.getAllUser(token);

            return { success: true, users: result.users }

        } catch (error) {
            throw error;
        };
    };

    const fetchAddFriend = async (friendId) => {
        try {
            const result = await userService.addFriend(token, friendId);

            return { success: true, friends: result.friends };

        } catch (error) {
            throw error;
        };
    };

    const fetchDeleteFriend = async (friendId) => {
        try {
            const result = await userService.deleteFriend(token, friendId);

            return { success: true };

        } catch (error) {
            throw error;
        };
    };

    const fetchGetOtherUserData = async (userId) => {
        try {
            const result = await userService.getOtherUserData(token, userId);
            return { success: true, user: result.user };
        } catch (error) {
            throw error;
        }
    };

    const fetchGetProfileById = async (userId) => {
        try {
            const result = await userService.getProfileById(token, userId);

            return { success: true, user: result.user }
        } catch (error) {
            throw error;
        }
    };


    return {
        fetchGetPersonalData,
        fetchChangePersonalData,
        fetchDeletePersonalData,
        uploadUserBanner,
        uploadUserAvatar,
        fetchGetUserFriends,
        fetchGetAllUsers,
        fetchAddFriend,
        fetchDeleteFriend,
        fetchGetOtherUserData,
        fetchGetProfileById
    };
};