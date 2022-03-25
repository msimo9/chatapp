import React from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = () => {
  return (
    <div
        className='w-full h-full flex justify-center py-8'
    > 
        <div className='w-full h-12 flex justify-center items-center'>
          <input
            className='w-4/5 h-12 bg-primary text-secondary rounded-md font-extralight focus:border-2 focus:border-secondary px-2'
          />
          <FaSearch onClick={() => null} className='text-secondary absolute right-10 opacity-80 z-50 hover:cursor-pointer' />
        </div>
    </div>
  )
}

export default Search