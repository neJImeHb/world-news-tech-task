import React, { useEffect } from 'react'

export default function ShowError({ error }) {
    if (!error) return null

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>{error}</h2>
        </div>
    )
}
