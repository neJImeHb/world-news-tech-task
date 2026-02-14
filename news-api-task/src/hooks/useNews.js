import { useState, useEffect, useCallback } from "react";
import getLatestNews from "../functions/getLatestNews";

export function useNews({ category, submitText }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [error, setError] = useState("");

  const loadNews = useCallback(async (pageNum, signal) => {
    setLoading(true);
    const result = await getLatestNews(pageNum, category, submitText, signal);

    if (result.articles.length === 0) setLastPage(true);

    setArticles(prev => pageNum === 1 ? result.articles : [...prev, ...result.articles]);
    setError(result.error);
    setLoading(false);
  }, [category, submitText]);

  useEffect(() => {
    const controller = new AbortController();
    setArticles([]);
    setPage(1);
    setLastPage(false);
    loadNews(1, controller.signal);

    return () => controller.abort();
  }, [category, submitText, loadNews]);

  const loadNextPage = useCallback(() => {
    if (loading || lastPage) return;
    setPage(prev => prev + 1);
  }, [loading, lastPage]);

  useEffect(() => {
    if (page === 1) return;
    const controller = new AbortController();
    loadNews(page, controller.signal);
    return () => controller.abort();
  }, [page, loadNews]);

  useEffect(() => {
    let throttleTimeout = null;

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadNextPage();
      }
    };

    const throttledScroll = () => {
      if (throttleTimeout) return;
      throttleTimeout = setTimeout(() => {
        handleScroll();
        throttleTimeout = null;
      }, 300);
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [loadNextPage]);

  return { articles, loading, error, loadNextPage };
}
