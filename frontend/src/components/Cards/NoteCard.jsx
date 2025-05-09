import React from 'react'
import { MdOutlinePushPin } from 'react-icons/md';
import 

const NoteCard = ({
    title, 
    date, 
    content, 
    tags, 
    isPinned, 
    onEdit, 
    onDelete, 
    onPinNote
}) => {
  return (
    <div>
      <div className=''>
        <div>
            <h6 className='text-sm font-medium'> {title} </h6>
            <span className='text-xs text-slate-500'> {date} </span>
        </div>
        <MdOutlinePushPin 
          className={`cursor-pointer ${isPinned ? 'text-yellow-500' : 'text-gray-400'}`} 
          onClick={onPinNote} 
        />
      </div>
      <p className=''> {content?.slice(0,50)} </p>
    </div>
  )
}

export default NoteCard;

export default NoteCard
