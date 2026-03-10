// ========================================================
// STORAGE UTILITY - localStorage Persistence Layer
// ========================================================
// This module handles saving and loading notes from browser localStorage
// Called from: App.jsx
// ========================================================

const KEY = 'notes_v1'
const TRASH_KEY = 'trash_v1'

// ========================================================
// FUNCTION 1: Load Notes from localStorage
// Called: When App component first mounts (initial state)
// Purpose: Restore user's notes from previous sessions
// ========================================================
export function loadNotes() {
  try {
    // Get the stored data from localStorage using KEY
    const raw = localStorage.getItem(KEY)
    
    // If nothing was stored, return null
    // App.jsx will use SAMPLE data instead
    if (!raw) return null
    
    // Parse JSON string back to JavaScript object and return
    return JSON.parse(raw)
  } catch (e) {
    // If there's any error (corrupted data, etc.), return null
    // Graceful fallback to prevent app crash
    return null
  }
}

// ========================================================
// FUNCTION 2: Save Notes to localStorage
// Called: Whenever notes change (debounced in App.jsx after 400ms)
// Purpose: Persist user's notes between browser sessions
// ========================================================
export function saveNotes(notes) {
  try {
    // Convert notes array to JSON string and save to localStorage
    localStorage.setItem(KEY, JSON.stringify(notes))
  } catch (e) {
    // If localStorage is full or unavailable, silently fail
    // App continues to work with in-memory data
    // (silent fail because localStorage quota is temporary/fixable)
  }
}

// ========================================================
// FUNCTION 3: Load Trash from localStorage
// Called: When App component first mounts
// Purpose: Restore user's deleted notes from trash
// ========================================================
export function loadTrash() {
  try {
    const raw = localStorage.getItem(TRASH_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

// ========================================================
// FUNCTION 4: Save Trash to localStorage
// Called: Whenever trash items change
// Purpose: Persist deleted notes in trash
// ========================================================
export function saveTrash(trash) {
  try {
    localStorage.setItem(TRASH_KEY, JSON.stringify(trash))
  } catch (e) {
    // Silent fail
  }
}
