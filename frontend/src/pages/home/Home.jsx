import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Model from 'react-modal'
import { apiGet, apiPost, apiPut, apiDelete, apiPatch } from '../../../utils/helper'

const Home = () => {
  const [openAddEditMode, setOpenAddEditMode] = useState({
    isShown: false,
    type: 'add',
    data: null
  })
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('token')

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      const res = await apiGet('/notes', token)
      if (res.error) setError(res.message || 'Failed to fetch notes')
      else setNotes(res.notes)
      setLoading(false)
    }
    fetchNotes()
  }, [token])

  // Add note
  const handleAddNote = async (note) => {
    const res = await apiPost('/add-note', note, token)
    if (!res.error) setNotes([res.note, ...notes])
    return res
  }

  // Edit note
  const handleEditNote = async (id, note) => {
    const res = await apiPut(`/note/${id}`, note, token)
    if (!res.error) setNotes(notes.map(n => n._id === id ? res.note : n))
    return res
  }

  // Delete note
  const handleDeleteNote = async (id) => {
    const res = await apiDelete(`/note/${id}`, token)
    if (!res.error) setNotes(notes.filter(n => n._id !== id))
    return res
  }

  // Pin/unpin note
  const handlePinNote = async (id) => {
    const res = await apiPatch(`/note/${id}/pin`, {}, token)
    if (!res.error) setNotes(notes.map(n => n._id === id ? res.note : n))
    return res
  }

  // Open edit modal
  const openEditModal = (note) => {
    setOpenAddEditMode({ isShown: true, type: 'edit', data: note })
  }

  // Open add modal
  const openAddModal = () => {
    setOpenAddEditMode({ isShown: true, type: 'add', data: null })
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-gray-500">Loading notes...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={new Date(note.createdOn).toLocaleDateString()}
                content={note.content}
                tags={note.tags.join(', ')}
                isPinned={note.isPinned}
                onEdit={() => openEditModal(note)}
                onDelete={() => handleDeleteNote(note._id)}
                onPinNote={() => handlePinNote(note._id)}
              />
            ))}
          </div>
        )}
      </div>
      <button
        className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-blue-600 fixed bottom-6 right-6 shadow-md hover:shadow-xl hover:bg-blue-700 transition-all duration-200 ease-in-out"
        onClick={openAddModal}
      >
        <MdAdd className="text-3xl text-white" />
      </button>
      <Model
        isOpen={openAddEditMode.isShown}
        onRequestClose={() => setOpenAddEditMode({ isShown: false, type: 'add', data: null })}
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.2)' }
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditMode.type}
          noteData={openAddEditMode.data}
          onClose={() => setOpenAddEditMode({ isShown: false, type: 'add', data: null })}
          onAdd={handleAddNote}
          onEdit={handleEditNote}
        />
      </Model>
    </>
  )
}

export default Home
