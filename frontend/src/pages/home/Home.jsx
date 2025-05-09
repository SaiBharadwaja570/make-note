import React from 'react'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/Cards/NoteCard'

const Home = () => {
  return (
    <>
      <Navbar />

      <div className='container mx-auto'>
        <NoteCard title="Meeting on 7th May" date="3rd April 2024" content="Metiing on 7th may"  />
      </div>
    </>
  )
}

export default Home
