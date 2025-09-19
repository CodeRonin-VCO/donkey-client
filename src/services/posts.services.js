

const baseUrl = "http://localhost:8008/api/posts";

export const createPost = async ({ author, content, images }, token) => {
    const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ author, content, images }),
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
}