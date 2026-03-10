import React from 'react'
import '../App.css'

export default function Trash({ items = [], onRestore, onDelete }) {
  return (
    <div className="trash-container">
      <div className="trash-header">
        <h2>Trash</h2>
        <p>{items.length} item{items.length !== 1 ? 's' : ''} in trash</p>
      </div>

      {items.length === 0 ? (
        <div className="trash-empty">
          <p>Trash is empty</p>
        </div>
      ) : (
        <div className="trash-grid">
          {items.map((item) => (
            <div key={item.id} className="trash-card">
              <div className="trash-card-content">
                <h3>{item.title || 'Untitled'}</h3>
                <p>{item.body?.substring(0, 100)}...</p>
              </div>
              <div className="trash-card-actions">
                <button 
                  className="restore-btn" 
                  onClick={() => onRestore(item.id)}
                  title="Restore this note"
                >
                  ↩️ Restore
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => {
                    if (window.confirm('Permanently delete this item? This action cannot be undone.')) {
                      onDelete(item.id)
                    }
                  }}
                  title="Permanently delete"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}