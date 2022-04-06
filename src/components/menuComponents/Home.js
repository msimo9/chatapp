import React from 'react'
import sampleContacts from '../../sampleContacts'
import { IoPerson } from "react-icons/io5";
import { useSelector } from 'react-redux';

const Home = () => {
    const friendsList = useSelector(state => state.friendsList);
  return (
    <div
        className='w-full h-full flex justify-center text-primary'
    >
        {
            friendsList.length === 0
            ? "No friends found :("
            : null
        }
        {/*
            sampleContacts.map((item) => {
                let hours = Math.floor(Math.random() * 25);
                let minutes = Math.floor(Math.random() * 61);
                if(hours < 10) hours = "0"+hours;
                if(minutes < 10) minutes = "0"+minutes;
                return(
                    <div className='w-4/5 h-16 relative bg-primary text-white my-2 rounded-md flex items-center px-2 z-30'>
                        <div className='w-12 h-12 justify-center items-center flex duration-300 transition-all shadow-2xl drop-shadow-2xl'>
                            <IoPerson className='text-secondary shadow-2xl drop-shadow-2xl'/>
                        </div>

                        <div className='mx-2 text-white flex flex-col text-sm'>
                            <span className='font-bold'>{item.name} {item.surname}</span>
                            <span className='font-thin italic'>@{item.username}</span>
                        </div>

                        <div className='absolute right-2 bottom-1 text-xs flex text-secondary'>
                            <span className='font-thin italic'>{hours}:{minutes}</span>
                        </div>
                    </div>
                )
            })
        */}
    </div>
  )
}

export default Home