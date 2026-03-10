import React, { useEffect, useState } from 'react'
import '../App.css'


export default function NoteEditor({ note, onChange }) {
  
  const [title, setTitle] = useState(note?.title || '')
  const [body, setBody] = useState(note?.body || '')

  useEffect(() => {
    
    setTitle(note?.title || '')
    setBody(note?.body || '')
  }, [note?.id])


  useEffect(() => {

    if (!note) return
    onChange({ title, body })
  }, [title, body]) 
 
  if (!note) return <div className="editor empty">Select or create a note</div>

 
  return (
    <div className="editor">
    
      <input 
        className="note-title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
      />
      
      <textarea 
        className="note-body" 
        value={body} 
        onChange={(e) => setBody(e.target.value)} 
        placeholder="Write your note..." 
      />
   
    </div>
  )
}
