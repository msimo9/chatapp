import React, { useEffect, useState } from 'react'
import sampleContacts from '../../sampleContacts'
import { IoPerson, Io, IoCloseCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { FaFacebookMessenger } from 'react-icons/fa';
import { IoInformationCircle, IoInformation, IoCheckmark, IoClose, IoDocumentText, IoDocument } from 'react-icons/io5';
import { FaMoon, FaCheck } from 'react-icons/fa';
import { getFriendRequests, getUserData, returnUserData } from '../../firebase/reads';
import { approveFriendRequest } from '../../firebase/writes';

const RenderItem = ({item, toggleChangesMade}) => {
    const [userData, setUserData] = useState();
    const [dataReady, setDataReady] = useState(false);
    const toggleDataReady = () => {setDataReady(!dataReady);}
    const userID = useSelector(state => state.userID);

    useEffect(() => {
        getUserData(item, setUserData, toggleDataReady);
    }, []);

    useEffect(() => {}, []);
    if(userData){
        console.log(userData);
    return(
        <div className='text-secondary text-sm flex flex-row justify-center items-center w-full'>
            <div className='w-2/12 relative flex justify-end pr-1'>
                <img src={userData.profilePhotoURL} className='w-4 h-4 rounded-full' />
            </div>
            <div className='w-6/12  flex justify-start items-center relative pl-1 text-xs'>
                <span className='mr-4'>{userData.fullName}</span>
            </div>
            <div className='w-4/12 flex justify-center items-center flex-row relative space-x-2'>
                <IoCheckmark onClick={() => approveFriendRequest(userID, item, toggleChangesMade)} className='hover:cursor-pointer' />
                <IoClose className='hover:cursor-pointer' />
            </div>
        </div>
    )
    }else{
        return  <div></div>
    }
}

const FriendRequests = ({friendRequests, toggleModalVis, toggleChangesMade}) => {
    return(
        <div className='w-4/5 h-96 bg-primary mt-8 rounded-2xl flex flex-col space-y-2 pt-8 items-center mb-8 absolute top-20 shadow-2xl'>
            <IoCloseCircle onClick={() => toggleModalVis()} className='absolute top-2 right-2 text-secondary text-2xl hover:cursor-pointer' />
            <span className='font-semibold text-lg text-secondary'>friend requests</span>
            {
                friendRequests.map((item) => {
                    return(
                        <RenderItem item={item} toggleChangesMade={toggleChangesMade} />
                    )
                })
            }
            <div className='w-4/5 h-1 border-b-secondary border-b-[1px] mt-12'></div>
            <span className='font-semibold text-lg text-secondary'>added friends</span>
        </div>
    )
}

const Home = () => {
    const userID = useSelector(state => state.userID);
    const [friendRequests, setFriendRequests] = useState([]);
    const [changesMade, setChangesMade] = useState(false);
    const toggleChangesMade = () => {setChangesMade(!changesMade);}

    const [addedFriends, setAddedFriends] = useState([]);

    const [modalVis, setModalVis] = useState(false);
    const toggleModalVis = () => {setModalVis(!modalVis);}

    useEffect(() => {
        getFriendRequests(userID, setFriendRequests, toggleChangesMade);
    }, [])

    useEffect(() => {}, [changesMade]);

    return (
    <div
        className='w-full h-full flex justify-center text-primary'
    >
        {   
            modalVis && <FriendRequests friendRequests={friendRequests} toggleModalVis={toggleModalVis} toggleChangesMade={toggleChangesMade} />
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