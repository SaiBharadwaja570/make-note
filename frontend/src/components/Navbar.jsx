import React from 'react'
import ProfileInfo from './Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBox from './SearchBar/SearchBox';

const Navbar = () => {
  const [ searchQuery, setSearchQuery ] = React.useState('');
  const navigte = useNavigate;

  const onLogout = () => {
    navigte('/login')
  }

  const handleSearch = () => {
    
  }

  const onClearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h1 className='text-xl text-black py-2'>Make Note</h1>

      <SearchBox value={searchQuery}
      onChange={ ( {target} ) => {
        setSearchQuery(target.value)
      } }
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}
      />

      <ProfileInfo onLogout={onLogout} />
    </div>
  )
}

export default Navbar
