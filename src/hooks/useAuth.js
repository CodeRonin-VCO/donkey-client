// src/hooks/useAuth.js
import { useAtom } from "jotai";
import * as authService from "./../services/auth.services.js";
import { tokenAtom, userAtom } from "./../stores/auth.stores.js";

export default function useAuth () {
    const [token, setToken] = useAtom(tokenAtom);
    const [user, setUser] = useAtom(userAtom);

    const fetchLogin = async (email, password) => {
        try {
            const { token, user: userData } = await authService.login(email, password);
            setToken(token);
            if (userData) setUser(userData);
            
            return { success: true };

        } catch (error) {
            throw error;
        }
    };

    const fetchLogout = async () => {
        try {
            await authService.logout();

        } finally {
            setToken(null);
            setUser(null);
        }
    };

    const fetchRegister = async (firstname, lastname, email, password) => {
        try {
            const { user: newUser } = await authService.register(firstname, lastname, email, password);
            const loginResult = await fetchLogin(email, password);
            return { success: true, user: newUser };

        } catch (error) {
            throw error;
        };
    };

    return {
        isAuthenticated: !!token,
        token,
        user,
        fetchLogin,
        fetchLogout,
        fetchRegister
    };
};
