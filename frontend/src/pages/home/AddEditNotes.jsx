import React, { useState } from 'react'

const AddEditNotes = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || '')
  const [content, setContent] = useState(noteData?.content || '')
  const [tags, setTags] = useState(noteData?.tags || ['personal', 'work'])
  const [tagInput, setTagInput] = useState('')
  const [error, setError] = useState(null)

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const addNewNote = () => {
    
  }


  const editNote = () => {
    
  }

  const handleAddNote = () => {
    if (!title.trim()) {
      setError('Title is required.')
      return
    }
    if (!content.trim()) {
      setError('Content is required.')
      return
    }

    setError(null)

    if(type == 'edit'){
        editNote();
    }
    else addNewNote()
    
    // const newNote = {
    //   title: title.trim(),
    //   content: content.trim(),
    //   tags,
    //   date: new Date().toLocaleDateString()
    // }

    // console.log('Saving note:', newNote)

    // TODO: Pass data back to parent or API

    onClose()
  }

  return (
    <div className="relative max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">

      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold focus:outline-none"
        aria-label="Close"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {type === 'edit' ? 'Edit Note' : 'Create Note'}
      </h2>

      {error && (
        <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
      )}

      <div className="flex flex-col gap-2 mb-5">
        <label className="font-medium text-gray-700" htmlFor="note-title">Title</label>
        <input 
          id="note-title"
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg px-3 py-2 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          placeholder="Note title"
        />
      </div>

      <div className="flex flex-col gap-2 mb-5">
        <label className="font-medium text-gray-700" htmlFor="note-content">Content</label>
        <textarea
          id="note-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-md px-3 py-2 bg-gray-50 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none h-40"
          placeholder="Write here..."
        />
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <label className="font-medium text-gray-700">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
              {tag}
              <button 
                onClick={() => removeTag(tag)}
                className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 bg-gray-50 rounded-l-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
            placeholder="Add a tag..."
          />
          <button 
            onClick={addTag}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleAddNote}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
        >
          {type === 'edit' ? 'Update Note' : 'Save Note'}
        </button>
      </div>
    </div>
  )
}

export default AddEditNotes
