import React from 'react'
import '../App.css'
import { useState } from 'react'

export default function NoteList({ notes = [], currentId, onSelect, onDelete }) {

  return (
     <>
     
    <aside className="note-list">
      <div>
            <h3>Notes({notes.length} )</h3>
       </div>
      
      {notes.length === 0 ? (
          <select defaultValue="" disabled>
            <option>No notes found</option>
          </select>
      ) : (
       <div className="note-list-items">
         {
          notes.map((note)=>(
            <div 
              key={note.id}
              className={`note-item ${currentId === note.id ? 'selected' : ''}`}
              onClick={() => onSelect(note.id)}
            >
              <h4>{note.title || 'Untitled'}</h4>
              <p>{note.body.substring(0, 100)}{note.body.length > 100 ? '...' : ''}</p>
            <button className="trash-btn" onClick={() => onDelete(note.id)}>🗑️</button>
            </div>
          ))}
       </div>
      )}
     
    </aside>
    </>
  )
}
