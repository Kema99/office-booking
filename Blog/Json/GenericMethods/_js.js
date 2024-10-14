export async function loadPosts() {
    try {
        const response = await fetch('../Json/Posts/_json.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching the posts:', error);
    }
}