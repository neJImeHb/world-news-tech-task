import React, { useMemo } from "react";
import { useNews } from "../hooks/useNews";
import ShowError from "../components/ShowError";
import Loading from "../components/Loading";
import "../css/latest-news.css";

export default function LatestNews({ category, submitText }) {
  const { articles, loading, error } = useNews({ category, submitText });

  const renderedArticles = useMemo(() => {
    if (!articles.length) return null;

    const firstArticle = articles[0];
    const restArticles = articles.slice(1);

    return (
      <>
        <div className="first-article-div">
          <img src={firstArticle.urlToImage || ""} alt={firstArticle.title} />
          <div className="article-title">
            <h1>{firstArticle.title}</h1>
            <p style={{ opacity: 0.8 }}>{firstArticle.author}</p>
          </div>
        </div>

        <div className="articles-grid">
          {restArticles.map(el => (
            <div className="article-div" key={el.url}>
              <div>
                <h4>{el.title}</h4>
                <p style={{ opacity: 0.8 }}>{el.author}</p>
              </div>
              <div className="article-div-img">
                <img src={el.urlToImage || ""} alt={el.title} />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }, [articles]);

  return (
    <div style={{ margin: "25px 50px" }}>
      {error && <ShowError error={error} />}
      {!error && renderedArticles}
      {loading && <Loading />}
    </div>
  );
}
