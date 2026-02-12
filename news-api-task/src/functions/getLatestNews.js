import axios from "axios"
import { NEWS_API, API_KEY } from "../env/env"

export default async function getLatestNews(setArticles, page = 1, setLastPage, category, submitText) {
    try {
        await axios.get(`${NEWS_API}/top-headlines`, {
            params: {
                apiKey: API_KEY,
                country: "us",
                pageSize: 10,
                page: page,
                category: submitText ? "" : category,
                q: submitText
            }
        }).then((res) => {
            console.log(res.data)
            if (res.data.articles.length === 0) setLastPage(true)
            console.log(page === 1)
            if (page !== 1) {
                setArticles(prev => [...prev, ...res.data.articles])
            } else {
                setArticles(res.data.articles)
            }
        })
    } catch (error) {
        console.error(error)
    }
}
