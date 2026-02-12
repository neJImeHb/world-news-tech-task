import React from 'react'
import '../css/categories.css'

export default function Categories({ category, setCategory, submitText }) {
    const changeCategory = (e) => {
        setCategory(e.target.value)
    }

    const checkValue = (value) => {
        return category === value ? { backgroundColor: "red", color: "white" } : {}
    }

    if (submitText) return null

    return (
        <div>
            <div className='category-div'>
                <button className='category-button' style={checkValue("general")} value="general" onClick={changeCategory}>All</button>
                <button className='category-button' style={checkValue("technology")} value="technology" onClick={changeCategory}>Technologies</button>
                <button className='category-button' style={checkValue("sports")} value="sports" onClick={changeCategory}>Sports</button>
                <button className='category-button' style={checkValue("health")} value="health" onClick={changeCategory}>Health</button>
                <button className='category-button' style={checkValue("business")} value="business" onClick={changeCategory}>Business</button>
                <button className='category-button' style={checkValue("science")} value="science" onClick={changeCategory}>Science</button>
                <button className='category-button' style={checkValue("entertainment")} value="entertainment" onClick={changeCategory}>Entertainment</button>
            </div>
            <hr style={{ marginTop: '0px', marginBottom: '0px'}} />
        </div>
    )
}
