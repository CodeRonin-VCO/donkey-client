const baseUrl = "http://localhost:8008/api/posts";

export const createPost = async (content, token, photo, videos) => {
    const formData = new FormData();
    formData.append("content", content);

    photo.forEach(file => {
        formData.append("images", file);
    });

    videos.forEach(file => {
        formData.append("videos", file);
    });


    const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Publish post failed.");
    };

    return response.json();
};

export const getPosts = async (token) => {
    const response = await fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });


    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch posts.");
    };

    return response.json();
};

export const toggleLike = async (postId, token) => {
    const response = await fetch(`${baseUrl}/${postId}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to toggle like");
    };

    return response.json();

};

export const addComment = async (postId, text, token) => {
    const response = await fetch(`${baseUrl}/${postId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add comment.");
    };

    return response.json();
};

export const getComments = async (postId, token) => {
    const response = await fetch(`${baseUrl}/${postId}/comments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch comments.");
    };

    return response.json();
};