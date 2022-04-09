import React, { useEffect, useState } from 'react'
import { FaSearch, FaPlus, FaCheck, FaQuestion, FaUserFriends} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { getAddedFriends, searchFieldOutput } from '../../firebase/reads';
import { addFriend, removeFriend } from '../../firebase/writes';

const Search = () => {
  const userID = useSelector(state => state.userID);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const toggleIsFriend = () => setIsFriend(!isFriend);
  const [myFriends, setMyFriends] = useState([]);

  /*if(filter === ""){
    setFilteredUsers(users);
  }else{
    let tempArr = users.filter(item => item.startsWith(filter));
    setFilteredUsers(tempArr);
  }*/

  useEffect(() => {
    searchFieldOutput(setUsers);
    getAddedFriends(userID, setMyFriends);
  }, [])

  const updateMyFriends = (friendID) => {
    const index = myFriends.indexOf(friendID);
    if (index > -1) {
      myFriends.splice(index, 1);
    }
  }
  
  useEffect(() => {
    if(filter === ""){
      setFilteredUsers(users);
    }else{
      let tempArr = users.filter(item => {
        if(item.fullName.toLowerCase().startsWith(filter.toLowerCase()) || item.username.toLowerCase().startsWith(filter.toLowerCase()) && item.userID !== userID && userID !== undefined ){
            return true;
        }
        return false;
      });
      setFilteredUsers(tempArr);
    }
  }, [users, filter])

  
  return (
    <div
        className='w-full h-full justify-center py-8 flex-col'
    > 
        <div className='w-full h-12 flex justify-center items-center'>
          <input
            value={filter}
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
                  const friendID = item.userID;
                  return(
                    <div className='flex flex-row w-5/6 bg-primary text-secondary h-20 rounded-xl transition-all duration-300 px-2 text-sm group items-center relative'>
                      <div className='mr-2 shadow-2xl'>
                        <img src={item.profilePhotoURL} alt="" className='h-16 w-16 border-4 border-white rounded-full object-cover' />
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
                          myFriends.includes(item.userID) ?
                            <FaUserFriends onClick={() => {removeFriend(userID, friendID); updateMyFriends(friendID); }} className='text-secondary' />
                          :
                            <FaPlus onClick={() => {addFriend(userID, friendID); myFriends.push(friendID); } } className='text-secondary' />
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          
           : null}
        </div>
        {
          filter.length > 0 &&
          <div onClick={() => setFilter("")} className='mt-12 opacity-80 w-full h-auto flex justify-center items-center hover:cursor-pointer'>
            <div className='w-3/5 bg-primary rounded-2xl h-8 flex justify-center items-center text-secondary text-xs font-bold'>
                clear filter
            </div>
          </div>
        }
    </div>
  )
}

export default Search