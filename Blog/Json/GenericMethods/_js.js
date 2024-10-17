export async function loadJson(fileSrc) {
    try {
        const response = await fetch(fileSrc);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching the posts:', error);
    }
}