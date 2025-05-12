import React from 'react'
import { MdOutlinePushPin } from 'react-icons/md';
import { MdCreate, MdDelete } from 'react-icons/md';

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
    <div className="border rounded-lg p-3 bg-white hover:shadow-md transition-all duration-200 ease-in-out w-80">
        <div className="flex items-start justify-between">
            <div>
                <h6 className="text-sm font-semibold text-gray-800">{title}</h6>
                <span className="text-xs text-gray-500">{date}</span>
            </div>
            <MdOutlinePushPin
                className={`cursor-pointer text-lg transition-colors duration-150 ${
                    isPinned ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
                }`}
                onClick={onPinNote}
            />
        </div>

        <p className="text-xs text-gray-600 mt-2 line-clamp-2">
            {content?.slice(0, 80)}
        </p>

        <div className="flex items-center justify-between mt-3">
            <div className="text-xs text-gray-400 italic">{tags}</div>
            <div className="flex items-center gap-2">
                <MdCreate
                    className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors"
                    onClick={onEdit}
                />
                <MdDelete
                    className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                    onClick={onDelete}
                />
            </div>
        </div>
    </div>
);
}

export default NoteCard;
