import React, { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import Header from './components/Header'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'
import SAMPLE from './components/Sample'
import Trash from './components/Trash'
import { Footer } from './components/Footer'
import { loadNotes, saveNotes, loadTrash, saveTrash } from './utils/storage'
function makeId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

export default function App() {
  const [notes, setNotes] = useState(() => loadNotes() || SAMPLE)
  const [trash, setTrash] = useState(() => loadTrash())
  const [showTrash, setShowTrash] = useState(false)
  const [currentId, setCurrentId] = useState(notes[0]?.id || null)
  const [query, setQuery] = useState('')
  const saveTimer = useRef(null)
  const trashTimer = useRef(null)

  useEffect(() => {
    if (!currentId && notes.length) setCurrentId(notes[0].id)
  }, [notes, currentId])

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      saveNotes(notes)
    }, 400)
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current) }
  }, [notes])

  useEffect(() => {
    if (trashTimer.current) clearTimeout(trashTimer.current)
    trashTimer.current = setTimeout(() => {
      saveTrash(trash)
    }, 400)
    return () => { if (trashTimer.current) clearTimeout(trashTimer.current) }
  }, [trash])

  function createNote() {
    const n = { id: makeId(), title: `Untitled ${notes.length + 1}`, body: '', updatedAt: Date.now() }
    setNotes((s) => [n, ...s])
    setCurrentId(n.id)
  }

  function deleteNote(id) {
    const noteToDelete = notes.find((n) => n.id === id)
    setTrash((prev) => [noteToDelete, ...prev])
    setNotes((s) => s.filter((x) => x.id !== id))
    if (id === currentId) setCurrentId((prev) => {
      const remaining = notes.filter((n) => n.id !== id)
      return remaining[0]?.id || null
    })
  }

  function updateNote(id, patch) {
    setNotes((s) => s.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n)))
  }

  function restoreFromTrash(id) {
    const noteToRestore = trash.find((n) => n.id === id)
    setNotes((prev) => [noteToRestore, ...prev])
    setTrash((prev) => prev.filter((n) => n.id !== id))
  }

  function permanentlyDelete(id) {
    setTrash((prev) => prev.filter((n) => n.id !== id))
  }

  const filtered = useMemo(() => {
    if (!query.trim()) return notes

    const q = query.toLowerCase()
    return notes.filter((n) => (n.title + '\n' + n.body).toLowerCase().includes(q))
  }, [notes, query])

  const current = notes.find((n) => n.id === currentId) || null

  return (
    <div className="notes-app">
      <Header 
        onNew={createNote} 
        query={query} 
        setQuery={setQuery} 
        showTrash={showTrash}
        trashCount={trash.length}
      />
      
        <div className="main">
          <NoteList notes={filtered} currentId={currentId} onSelect={(id) => setCurrentId(id)} onDelete={deleteNote} />
          <div className="editor-area">
            <NoteEditor note={current} onChange={(patch) => updateNote(currentId, patch)} />
             <Trash 
          items={trash} 
          onRestore={restoreFromTrash} 
          onDelete={permanentlyDelete}
        />
          </div>
        </div>
      <Footer/>
    </div>
  )
}
