import React, { useEffect, useState } from 'react'
import sampleContacts from '../../sampleContacts'
import { IoPerson, Io, IoCloseCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { FaFacebookMessenger } from 'react-icons/fa';
import { IoInformationCircle, IoInformation, IoCheckmark, IoClose, IoDocumentText, IoDocument } from 'react-icons/io5';
import { FaMoon, FaCheck } from 'react-icons/fa';
import { getAddedFriends, getFriendRequests, getUserData, readMessages, returnUserData } from '../../firebase/reads';
import { approveFriendRequest, writeNewMessage } from '../../firebase/writes';

const NewMessage = ({toggleNewMessage, addedFriends, toggleChangesMade}) => {
    const [filter, setFilter] = useState("");
    const [selectedFriend, setSelectedFriend] = useState("");
    const [messageText, setMessageText] = useState("");
    const userID = useSelector(state => state.userID);
    return(
        <div className='w-4/5 h-96 bg-primary mt-8 rounded-2xl flex flex-col space-y-1 pt-8 items-center mb-8 absolute top-20 shadow-2xl text-secondary'>
            <IoCloseCircle onClick={() => toggleNewMessage()} className='absolute top-2 right-2 text-secondary text-2xl hover:cursor-pointer' />
            {
                selectedFriend.length === 0 &&
                <div className='flex flex-col items-center w-full h-auto'>
                    <input type={"text"} className='w-4/5 h-8 bg-secondary text-primary rounded-2xl text-xs pl-4 mb-4' placeholder='type here...' value={filter} onChange={(e) => {setFilter(e.target.value);}} />
                    <div className='relative pt-2 w-full h-auto space-y-4'>
                        {
                            addedFriends.map((item) => {
                                return(
                                    <RenderMessageItem item={item} filter={filter} setSelectedFriend={setSelectedFriend} />
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                selectedFriend.length !== 0 &&
                <div className='w-full h-full items-center flex flex-col'>
                    <img src={selectedFriend.profilePhotoURL} className='w-14 h-14 rounded-full border-4 border-secondary shadow-2xl' />
                    <span className='text-secondary font-semibold mt-4'>{selectedFriend.fullName.toLowerCase()}</span>
                    <div className='w-4/5 h-2/5 pt-6'>
                        <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} className='w-full h-full bg-secondary text-primary text-sm py-2 px-1 resize-none rounded-2xl' placeholder='write message here...' />
                    </div>
                    <div className='absolute bottom-0 w-full h-16 bg-secondary text-primary flex justify-center items flex-col items-center rounded-b-2xl border-2 border-primary'>
                        <div className='w-full h-8 bg-primary text-secondary flex justify-center items-center hover:cursor-pointer'>
                            <span onClick={() => {writeNewMessage(userID, selectedFriend.userID, messageText); toggleNewMessage(); toggleChangesMade();}}>send</span>
                        </div>
                        <span className='hover:cursor-pointer' onClick={() => setSelectedFriend("")}>cancel</span>
                    </div>
                </div>
            }
        </div>
    )
}

const RenderMessageItem = ({item, filter, setSelectedFriend}) => {
    const [userData, setUserData] = useState();
    const [dataReady, setDataReady] = useState(false);
    const toggleDataReady = () => {setDataReady(!dataReady);}
    const userID = useSelector(state => state.userID);

    useEffect(() => {
        getUserData(item, setUserData, toggleDataReady);
    }, []);

    useEffect(() => {}, []);
    if(userData){
        if(!filter){
            return(
                <div
                    className='text-secondary text-sm flex flex-row justify-center items-center w-full hover:bg-terciary pt-1 hover:cursor-pointer transiton-all duration-300 hover:rounded-lg'
                    onClick={()=> setSelectedFriend(userData)}
                >
                    <div className='w-2/12 relative flex justify-end pr-1'>
                        <img src={userData.profilePhotoURL} className='w-4 h-4 rounded-full' />
                    </div>
                    <div className='w-6/12  flex justify-start items-center relative pl-1 text-xs'>
                        <span className='mr-4'>{userData.fullName.toLowerCase()}</span>
                    </div>
                    <div className='w-4/12 flex justify-center items-center flex-row relative space-x-2'>
                    </div>
                </div>
            )
        }else{
            if(userData.fullName.toLowerCase().startsWith(filter.toLowerCase())){
                return(
                    <div
                        className='text-secondary text-sm flex flex-row justify-center items-center w-full hover:bg-terciary pt-1 hover:cursor-pointer transiton-all duration-300 hover:rounded-lg'
                        onClick={()=> setSelectedFriend(userData)}
                    >
                        <div className='w-2/12 relative flex justify-end pr-1'>
                            <img src={userData.profilePhotoURL} className='w-4 h-4 rounded-full' />
                        </div>
                        <div className='w-6/12  flex justify-start items-center relative pl-1 text-xs'>
                            <span className='mr-4'>{userData.fullName.toLowerCase()}</span>
                        </div>
                        <div className='w-4/12 flex justify-center items-center flex-row relative space-x-2'>
                        </div>
                    </div>
                )
            }else{
                return  <div></div>
            }
        }
    }else{
        return  <div></div>
    }
}

const RenderItem = ({item, toggleChangesMade, request, filter}) => {
    const [userData, setUserData] = useState();
    const [dataReady, setDataReady] = useState(false);
    const toggleDataReady = () => {setDataReady(!dataReady);}
    const userID = useSelector(state => state.userID);

    useEffect(() => {
        getUserData(item, setUserData, toggleDataReady);
    }, []);

    useEffect(() => {}, []);
    if(userData){
        if(!filter){
            return(
                <div className='text-secondary text-sm flex flex-row justify-center items-center w-full hover:bg-terciary py-1 transiton-all duration-300 hover:rounded-lg'>
                    <div className='w-2/12 relative flex justify-end pr-1'>
                        <img src={userData.profilePhotoURL} className='w-4 h-4 rounded-full' />
                    </div>
                    <div className='w-6/12  flex justify-start items-center relative pl-1 text-xs'>
                        <span className='mr-4'>{userData.fullName.toLowerCase()}</span>
                    </div>
                    {   
                        request &&
                        <div className='w-4/12 flex justify-center items-center flex-row relative space-x-2'>
                            <IoCheckmark onClick={() => approveFriendRequest(userID, item, toggleChangesMade)} className='hover:cursor-pointer' />
                            <IoClose className='hover:cursor-pointer' />
                        </div>
                    }
                    {   
                        !request &&
                        <div className='w-4/12 flex justify-center items-center flex-row relative space-x-2'>
                        </div>
                    }
                </div>
            )
        }else{
            if(userData.fullName.toLowerCase().startsWith(filter.toLowerCase())){
                return(
                    <div className='text-secondary text-sm flex flex-row justify-center items-center w-full hover:bg-terciary py-1 transiton-all duration-300 hover:rounded-lg' >
                        <div className='w-2/12 relative flex justify-end pr-1'>
                            <img src={userData.profilePhotoURL} className='w-4 h-4 rounded-full' />
                        </div>
                        <div className='w-6/12  flex justify-start items-center relative pl-1 text-xs'>
                            <span className='mr-4'>{userData.fullName.toLowerCase()}</span>
                        </div>
                        {   
                            request &&
                            <div className='w-4/12 flex justify-center items-center flex-row relative space-x-2'>
                                <IoCheckmark onClick={() => approveFriendRequest(userID, item, toggleChangesMade)} className='hover:cursor-pointer' />
                                <IoClose className='hover:cursor-pointer' />
                            </div>
                        }
                        {   
                            !request &&
                            <div className='w-4/12 flex justify-center items-center flex-row relative space-x-2'>
                            </div>
                        }
                    </div>
                )
            }else{
                return  <div></div>
            }
        }
    }else{
        return  <div></div>
    }
}

const FriendRequests = ({friendRequests, addedFriends, toggleModalVis, toggleChangesMade}) => {
    return(
        <div className='w-4/5 h-96 bg-primary mt-8 rounded-2xl flex flex-col space-y-2 pt-8 items-center mb-8 absolute top-20 shadow-2xl'>
            <IoCloseCircle onClick={() => toggleModalVis()} className='absolute top-2 right-2 text-secondary text-2xl hover:cursor-pointer' />
            <span className='font-semibold text-lg text-secondary'>friend requests</span>
            {
                friendRequests.map((item) => {
                    return(
                        <RenderItem item={item} toggleChangesMade={toggleChangesMade} request={true} />
                    )
                })
            }
            <div className='w-4/5 h-1 border-b-secondary border-b-[1px]'></div>
            <span className='font-semibold text-lg text-secondary'>added friends</span>
            {
                addedFriends.map((item) => {
                    return(
                        <RenderItem item={item} toggleChangesMade={toggleChangesMade} request={false} />
                    )
                })
            }
        </div>
    )
}

const ChatPreview = ({friendID}) => {
    const [userData, setUserData] = useState();
    const [dataReady, setDataReady] = useState(false);
    const toggleDataReady = () => {setDataReady(!dataReady);}
    const userID = useSelector(state => state.userID);

    useEffect(() => {
        getUserData(friendID, setUserData, toggleDataReady);
    }, []);

    useEffect(() => {}, []);
    if(userData){
        return(
            <div className='w-4/5 h-16 bg-primary text-secondary flex items-center space-x-2 pl-2 rounded-2xl shadow-2xl hover:cursor-pointer'>
                <img src={userData.profilePhotoURL} className='w-10 h-10 rounded-full border-secondary border-2' />
                <div>
                    {userData.fullName}    
                </div>
            </div>        
        )
    }else{
        return(<div></div>)
    }
}

const Home = () => {
    const userID = useSelector(state => state.userID);
    const [friendRequests, setFriendRequests] = useState([]);
    const [changesMade, setChangesMade] = useState(false);
    const toggleChangesMade = () => {setChangesMade(!changesMade);}

    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [uniqueIDs, setUniqueIDs] = useState([]);

    const [addedFriends, setAddedFriends] = useState([]);

    const [modalVis, setModalVis] = useState(false);
    const toggleModalVis = () => {
        if(newMessage) toggleNewMessage();
        setModalVis(!modalVis);
    }

    const [newMessage, setNewMessage] = useState(false);
    const toggleNewMessage = () => {
        if(modalVis) toggleModalVis();
        setNewMessage(!newMessage);
    }

    useEffect(() => {
        getFriendRequests(userID, setFriendRequests, toggleChangesMade);
        getAddedFriends(userID, setAddedFriends, toggleChangesMade);
        readMessages(userID, setSentMessages, setReceivedMessages, setUniqueIDs, toggleChangesMade);
    }, [])

    useEffect(() => {
        readMessages(userID, setSentMessages, setReceivedMessages, setUniqueIDs, toggleChangesMade);
    }, [changesMade]);

    return (
    <div
        className='w-full h-full flex justify-center text-primary relative'
    >
        {   
            modalVis && <FriendRequests friendRequests={friendRequests} addedFriends={addedFriends} toggleModalVis={toggleModalVis} toggleChangesMade={toggleChangesMade} />
        }
        {   
            newMessage && <NewMessage toggleNewMessage={toggleNewMessage} addedFriends={addedFriends} toggleChangesMade={toggleChangesMade} />
        }
        {
            uniqueIDs.length !== 0 &&
            <div className='w-full h-full flex flex-col items-center space-y-2 pt-8'>
                {
                    uniqueIDs.map((item, index) => {
                        return(
                            <ChatPreview key={index} friendID={item} />
                        )
                    })
                }
            </div>
        }
        <div className='absolute bottom-0 w-full h-16 bg-primary text-secondary flex flex-row justify-center items-center space-x-12 text-xl'>
            <div className='relative hover:cursor-pointer' onClick={() => toggleModalVis()}>
                <span className='absolute -right-2 -top-2 text-secondary font-bold text-sm'>{friendRequests.length}</span>
                <IoPerson />
            </div>
            <div className='relative hover:cursor-pointer'>
                <span className='absolute -right-2 -top-2 text-secondary font-bold text-sm'>+</span>
                <IoDocument onClick={() => toggleNewMessage()} />
            </div>
            <FaMoon />
        </div>
    </div>
  )
}

export default Home