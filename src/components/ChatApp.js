import React, { useEffect, useState } from 'react'
import SideMenu from './SideMenu'
import Home from './menuComponents/Home'
import Messages from './Messages'
import { useSelector } from 'react-redux'
import Search from './menuComponents/Search'
import Profile from './menuComponents/Profile'
import { handleSignOut } from '../firebase/writes'

const ActiveMenuDiv = ({selectedMenuItem, signOut}) => {
  return(
    <div
        className='bg-secondary absolute left-16 top-0 w-64 h-full z-20'
    >
      {
          selectedMenuItem === "Home" ? <Home />
          : selectedMenuItem === "Search" ? <Search />
          : selectedMenuItem === "Profile" ? <Profile /> :
          handleSignOut(signOut)
      }
    </div>
  )
}

const ChatApp = ({signOut}) => {
  const selectedMenuItem = useSelector(state =>state.activeMenuElement);
  const [selectedUser, setSelectedUser] = useState({});
  const [messages, setMessages] = useState([]);
  useEffect(() => {

  }, [selectedMenuItem])
  return (
    <div className='w-full h-full text-primary'>
      <div className='h-full w-auto'>
        <SideMenu />
        <ActiveMenuDiv selectedMenuItem={selectedMenuItem} signOut={signOut}/>
        
        {/*<SideContactMenu />*/}
        
        <Messages />
      </div>
      
    </div>
  )
}

export default ChatApp