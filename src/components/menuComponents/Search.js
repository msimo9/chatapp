import React, { useEffect, useState } from 'react'
import { FaSearch, FaPlus, FaCheck, FaQuestion, FaUserFriends} from 'react-icons/fa'
import { searchFieldOutput } from '../../firebase/reads';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const toggleIsFriend = () => setIsFriend(!isFriend);

  /*if(filter === ""){
    setFilteredUsers(users);
  }else{
    let tempArr = users.filter(item => item.startsWith(filter));
    setFilteredUsers(tempArr);
  }*/

  useEffect(() => {
    searchFieldOutput(setUsers);
  }, [])

  useEffect(() => {
    if(filter === ""){
      setFilteredUsers(users);
    }else{
      let tempArr = users.filter(item => item.fullName.toLowerCase().startsWith(filter.toLowerCase()));
      setFilteredUsers(tempArr);
    }
  }, [users, filter])

  
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

        <div className='flex justify-center mt-4 w-full relative'>
          <span className='italic text-xs'>{filter.length === 0 ? "start typing..." : null}</span>
          {filter.length !== 0 ? 
            
            <div className='w-full justify-center items-center flex flex-col space-y-4'>
              {
                filteredUsers.map((item) => {
                  return(
                    <div className='flex flex-row w-5/6 bg-primary text-secondary h-20 rounded-xl transition-all duration-300 px-2 text-sm group items-center relative'>
                      <div className='mr-2'>
                        <img src="" alt="" className='h-16 w-16 border-2 border-white rounded-full' />
                      </div>
                      
                      <div className='flex flex-col'>
                        <span className='text-secondary group-hover:text-base font-bold transition-all duration-300'>
                          {item.fullName.toLowerCase()}
                        </span>
                        <span className='italic text-xs'>
                          @{item.username.toLowerCase()}
                        </span>
                      </div>
                      <div className=' absolute right-2 bottom-2 border-red-700 border- justify-center flex items-center w-4 h-4 hover:cursor-pointer' onClick={() => toggleIsFriend()}>
                        {
                          isFriend ?
                            <FaUserFriends className='text-secondary' />
                          :
                            <FaPlus className='text-secondary' />
                        }
                      </div>
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