import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { searchFieldOutput } from '../../firebase/reads';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    searchFieldOutput(setUsers);
  }, [])
  useEffect(() => {
  }, [users])
  return (
    <div
        className='w-full h-full justify-center py-8 flex-col'
    > 
        <div className='w-full h-12 flex justify-center items-center'>
          <input
            onChange={(e) => setFilter(e.target.value)}
            className='w-4/5 h-12 bg-primary text-secondary rounded-md font-extralight focus:border-2 focus:border-secondary px-2'
          />
          <FaSearch onClick={() => null} className='text-secondary absolute right-10 opacity-80 z-50 hover:cursor-pointer' />
        </div>

        <div className='flex justify-center mt-4 border-2 border-red-500 w-full relative'>
          {filter.length === 0 ? "start typing" : null}
          {filter.length !== 0 ? 
            
            <div>
              {
                users.map((item) => {
                  return(
                    <div>
                      {item.fullName}
                    </div>
                  )
                })
              }
            </div>
          
           : null}
        </div>
    </div>
  )
}

export default Search