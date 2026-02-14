    import axios from "axios"

    export default async function getLatestNews(page = 1, category, submitText, signal) {
        try {
            const res = await axios.get(`${process.env.REACT_APP_NEWS_API}/top-headlines`, {
                params: {
                    apiKey: process.env.REACT_APP_API_KEY,
                    country: "us",
                    pageSize: 10,
                    page,
                    ...(submitText ? { q: submitText } : { category: category })
                },
                signal,
            });

            if (!Array.isArray(res.data?.articles)) {
                console.error(
                    `Error during fetching a news data. 
                    Response from API:${res}`
                )
                return {
                    articles: [],
                    error: "Error during fetching a news data"
                }
            }

            return {
                articles: res.data.articles,
                error: res.data.articles.length === 0 && page === 1
                    ? "No one article was found :("
                    : ""
            };
        } catch (error) {
            if (axios.isCancel(error)) {
                return { articles: [], error: "" };
            }
            console.error(error);
            return {
                articles: [],
                error: "Failed to retrieve the latest news list. Please try again later."
            };
        }
    }
