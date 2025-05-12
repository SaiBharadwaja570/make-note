import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Model from 'react-modal'

const Home = () => {

  const [ openAddEditMode, setOpenAddEditMode ] = useState({
    isShown: false,
    type: "add",
    data: null
  })


  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NoteCard
            title="Meeting on 7th May"
            date="3rd April 2024"
            content="Meeting on 7th May"
            tags="Meetings"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-blue-600 fixed bottom-6 right-6 shadow-md hover:shadow-xl hover:bg-blue-700 transition-all duration-200 ease-in-out"
        onClick={() => {
          setOpenAddEditMode({ isShown:true, type: "Add", data: null })
        }}
      >
        <MdAdd className="text-3xl text-white" />
      </button>

      <Model
      isOpen = {openAddEditMode.isShown}
      onRequestClose={() => {}}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)"
        }
      }}
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
      <AddEditNotes 
      type={openAddEditMode.type}
      noteData={openAddEditMode.data}
      onClose={() => {
        setOpenAddEditMode({isShown: false, type: "Add", data: null})
      }}
      />
      </Model>
    </>
  )
}

export default Home
