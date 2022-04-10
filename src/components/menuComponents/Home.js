import React, { useEffect, useState } from 'react'
import sampleContacts from '../../sampleContacts'
import { IoPerson, Io, IoCloseCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { FaFacebookMessenger } from 'react-icons/fa';
import { IoInformationCircle, IoInformation, IoCheckmark, IoClose, IoDocumentText, IoDocument } from 'react-icons/io5';
import { FaMoon, FaCheck } from 'react-icons/fa';
import { getFriendRequests } from '../../firebase/reads';

const FriendRequests = ({friendRequests, toggleModalVis}) => {
    return(
        <div className='w-4/5 h-96 bg-primary mt-8 rounded-2xl flex flex-col space-y-2 pt-8 items-center mb-8 absolute top-20 shadow-2xl'>
            <IoCloseCircle onClick={() => toggleModalVis()} className='absolute top-2 right-2 text-secondary text-2xl hover:cursor-pointer' />
            <span className='font-semibold text-lg text-secondary'>friend requests</span>
            {
                friendRequests.map((item) => {
                    return(
                        <div className='text-secondary text-xs flex flex-row space-x-2 justify-center items-center'>
                            <span className='mr-4'>{item.substring(0,7)}</span>
                            <IoCheckmark className='hover:cursor-pointer' />
                            <IoClose className='hover:cursor-pointer' />
                        </div>
                    )
                })
            }
        </div>
    )
}

const Home = () => {
    const userID = useSelector(state => state.userID);
    const [friendRequests, setFriendRequests] = useState([]);
    const [changesMade, setChangesMade] = useState(false);
    const toggleChangesMade = () => {setChangesMade(!changesMade);}

    const [modalVis, setModalVis] = useState(false);
    const toggleModalVis = () => {setModalVis(!modalVis);}

    useEffect(() => {
        getFriendRequests(userID, setFriendRequests, toggleChangesMade);
    }, [])

    useEffect(() => {}, [friendRequests, changesMade]);

    return (
    <div
        className='w-full h-full flex justify-center text-primary'
    >
        {   
            modalVis && <FriendRequests friendRequests={friendRequests} toggleModalVis={toggleModalVis} />
        }
        <div className='absolute bottom-0 w-full h-16 bg-primary text-secondary flex flex-row justify-center items-center space-x-12 text-xl'>
            <div className='relative hover:cursor-pointer' onClick={() => toggleModalVis()}>
                <span className='absolute -right-2 -top-2 text-secondary font-bold text-sm'>{friendRequests.length}</span>
                <IoPerson />
            </div>
            <div className='relative hover:cursor-pointer'>
                <span className='absolute -right-2 -top-2 text-secondary font-bold text-sm'>+</span>
                <IoDocument />
            </div>
            <FaMoon />
        </div>
    </div>
  )
}

export default Home