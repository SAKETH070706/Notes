import React from 'react'
import '../App.css'

export default function Header({ onNew, query, setQuery, onTrash, showTrash, trashCount }) {
  return (
    <header className="notes-header">
      <h1>Notes</h1>
      <div className="header-actions">
        
        <input 
          className="search" 
          placeholder="Search notes..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
       
        <button className="new-btn" onClick={onNew}>+ New</button>

       
      </div>
    </header>
  )
}
