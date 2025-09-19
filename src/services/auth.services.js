const baseUrl = "http://localhost:8008/api/auth";

export const login = async (email, password) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Connexion failed.");
    };

    return response.json();
};

export const logout = async () => {
    return Promise.resolve();
};

export const register = async (firstname, lastname, email, password) => {

    const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed.");
    };

    return response.json();
}