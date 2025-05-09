import React from 'react';
import { BiSearch } from 'react-icons/bi'; // Updated search icon
import { AiOutlineCloseCircle } from 'react-icons/ai'; // Updated close icon

const SearchBox = ( { value, onChange, handleSearch, onClearSearch } ) => {

    return (
        <div className='w-80 h-10 flex items-center px-4 bg-slate-100 rounded-full'>
            <input type="text" 
            placeholder='Search Notes'
            className='w-full text-xs bg-transparent py=[11px] outline-none'
            value={value} 
            onChange={onChange}
            />
                { value && 
                <AiOutlineCloseCircle className='text-slate-500 cursor-pointer hover:text-black' 
                onClick={onClearSearch} 
                /> }

            <BiSearch className='text-slate-500 cursor-pointer hover:text-black' 
            onClick={handleSearch}
            />  

        </div>
    )
}

export default SearchBox
