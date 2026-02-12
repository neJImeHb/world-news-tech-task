import { Routes, Route } from 'react-router-dom';
import './App.css';
import Categories from './components/Categories';
import LatestNews from './pages/LatestNews';
import { useState } from 'react';

function App() {
  const [category, setCategory] = useState("general")
  const [search, setSearch] = useState("")
  const [submitText, setSubmitText] = useState("")

  return (
    <>
      <header>
        <h3 style={{ marginLeft: '50px', cursor: 'pointer' }} onClick={() => { setSubmitText("") }}>WORLD NEWS</h3>
        <form>
          <input className='search-input' placeholder='Search news...' value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className='search-button' onClick={(e) => { e.preventDefault(); setSubmitText(search) }}>Search</button>
        </form>
      </header>
      <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
      <Categories setCategory={setCategory} category={category} submitText={submitText} />
      <Routes>
        <Route path="/" element={<LatestNews category={category} submitText={submitText} />} />
      </Routes>
    </>
  );
}

export default App;
