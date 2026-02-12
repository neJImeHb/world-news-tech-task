import React, { useEffect, useState } from 'react'
import getLatestNews from '../functions/getLatestNews'
import '../css/latest-news.css'

export default function LatestNews({ category, submitText }) {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [lastPage, setLastPage] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading
      ) {
        setPage(prev => prev + 1)
      }
    }

    let throttleTimeout = null
    const throttledScroll = () => {
      if (throttleTimeout) return
      throttleTimeout = setTimeout(() => {
        handleScroll()
        throttleTimeout = null
      }, 300)
    }

    window.addEventListener('scroll', throttledScroll)
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [loading])

  useEffect(() => {
    if (lastPage) return
    loadNews(page)
  }, [page])

  useEffect(() => {
    setPage(1)
    loadNews(1)
  }, [category, submitText])

  const loadNews = async (pageNum) => {
    setLoading(true)
    await getLatestNews(setArticles, pageNum, setLastPage, category, submitText)
    setLoading(false)
  }

  return (
    <div style={{ marginTop: '25px', marginLeft: '50px', marginRight: '50px', marginBottom: '25px' }}>

      {articles.length > 0 ?
        <>
          <div className='first-article-div'>
            <img src={articles[0].urlToImage} alt="first" />
            <div className="article-title">
              <h1>{articles[0].title}</h1>
              <p style={{ opacity: '0.8' }}>{articles[0].author}</p>
            </div>
          </div>

          <div className="articles-grid">
            {articles.slice(1).map((el, index) => (
              <div className='article-div' key={index}>
                <div>
                  <h4>{el.title}</h4>
                  <p style={{ opacity: '0.8' }}>{el.author}</p>
                </div>
                <div className='article-div-img'>
                  <img src={el.urlToImage} alt={el.title} />
                </div>
              </div>
            ))}
          </div>
        </>
        :
        <h2 style={{textAlign: 'center'}}>No one article was found :(</h2>
      }

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
    </div>
  )
}
