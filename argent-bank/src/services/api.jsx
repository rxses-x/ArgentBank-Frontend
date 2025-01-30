const api = "http://localhost:3001/api/v1/";

export const fetchData = async (url, options) => {
    try {
        const response = await fetch(`${api}${url}`, options);
        return response;
    } catch (error) {
        console.error("Error fetching:", error);
    }
}