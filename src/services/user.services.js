const baseUrl = "http://localhost:8008/api/user/info";

export const getPersonalData = async (token) => {
    const response = await fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch personal data");
    }

    return response.json();
};

export const changePersonalData = async (token, updates) => {
    const allowedUpdates = ["firstname", "lastname", "bio", "loc"];
    const filteredUpdates = {};

    for (const key in updates) {
        if (
            updates[key] !== undefined &&
            updates[key] !== null &&
            allowedUpdates.includes(key)
        ) {
            filteredUpdates[key] = updates[key];
        }
    }

    const response = await fetch(`${baseUrl}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" // Important : on envoie du JSON
        },
        body: JSON.stringify(filteredUpdates)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update personal data");
    }

    return response.json();
};

export const deletePersonalData = async (token) => {
    const response = await fetch(baseUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete personal data");
    }

    return response.json();
};

export const uploadBanner = async (token, bannerFile) => {
    const formData = new FormData();
    formData.append("banner", bannerFile);

    const response = await fetch(`${baseUrl}/banner`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload banner");
    }

    return response.json();
};

export const uploadAvatar = async (token, avatarFile) => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const response = await fetch(`${baseUrl}/avatar`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
            // Ne pas mettre "Content-Type", laisser le navigateur gérer le multipart/form-data
        },
        body: formData
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload avatar");
    }

    return response.json();
};

export const getUserFriends = async (token) => {
    const response = await fetch(`${baseUrl}/connections`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user friends");
    };

    return response.json();
};

export const getAllUser = async (token) => {
    const response = await fetch(`${baseUrl}/connections/allusers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch all users");
    };

    return response.json();
}

export const addFriend = async (token, friendId) => {
    const response = await fetch(`${baseUrl}/connections`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ friendId })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch all users");
    };

    return response.json();
}

export const deleteFriend = async (token, friendId) => {
    const response = await fetch(`${baseUrl}/connections`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ friendId })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete friend from list");
    }

    return response.json();
}

export const getOtherUserData = async (token, userId) => {
    const response = await fetch(`${baseUrl}/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch other user data");
    };

    return response.json();
};


