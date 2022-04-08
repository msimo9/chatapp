import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { getUserData } from '../../firebase/reads';
import { handleUpdateUserInfo, uploadProfilePhoto } from '../../firebase/writes';
import { FaEdit, FaCross, FaXbox, FaCheckCircle, FaCheck, FaUpload} from 'react-icons/fa'
import { useFilePicker } from 'use-file-picker';
import { storage } from '../../firebase/firebase';

const EditProfile = ({toggleEditProfile, toggleChangesMade, fullName, username, email, birthDate, userID}) => {

    const [fn, setFn] = useState(fullName);
    const [un, setUn] = useState(username);
    const [em, setEm] = useState(email);
    const [bd, setBd] = useState(birthDate);

    const [image, setImage] = useState("");
    console.log(image);
    const upload = ()=>{
        if(image == null)
          return;
        storage.ref(`/images/${image.name}`).put(image)
        .on("state_changed" , alert("success") , alert);
      }

    const [openFileSelector, { filesContent }] = useFilePicker({
        readAs: "DataURL", 
        accept: 'image/*',
        multiple: false,
    });    
    return(
        <div className='w-full h-full absolute bg-primary text-secondary px-4 py-4 border-4 border-secondary rounded-3xl hover:rounded-sm transition-all duration-300 flex items-center flex-col'>
            <FaXbox className='hover:cursor-pointer text-base hover:text-xl transition-all duration-300 absolute top-4 right-4' onClick={() =>toggleEditProfile()}/>
            <span className='mt-12 text-secondary shadow-2xl font-semibold text-lg'>edit profile</span>
            <input value={fn} onChange={(e) => setFn(e.target.value)} placeholder='full name' type={"text"} className='w-4/5 bg-secondary h-10 mt-4 text-primary px-2 rounded-lg' />
            <input value={un} onChange={(e) => setUn(e.target.value)} placeholder='user name' type={"text"} className='w-4/5 bg-secondary h-10 mt-4 text-primary px-2 rounded-lg' />
            <input value={em} onChange={(e) => setEm(e.target.value)} placeholder='email' type={"text"} className='w-4/5 bg-secondary h-10 mt-4 text-primary px-2 rounded-lg' />
            <input value={bd} onChange={(e) => setBd(e.target.value)} placeholder='birth date' type={"text"} className='w-4/5 bg-secondary h-10 mt-4 text-primary px-2 rounded-lg' />
            
            {
                filesContent.length !== 0
                ? <span onClick={() => uploadProfilePhoto(filesContent[0].content)} className='mt-6 text-xs font-extralight italic'>upload photo</span>
                : null
            }

            <div className='w-full mt-6 mb-4 flex justify-center items-center flex-row'>
                { filesContent.length > 0 
                    ? <div className='h-auto w-auto rounded-full mx-2'>
                        <img src={filesContent[0].content} className='w-10 h-10 rounded-full border-2 border-secondary hover:w-20 hover:h-20 hover:border-4 transition-all duration-500' alt='profilePhoto' />
                    </div>
                    : null
                }
                <FaUpload onClick={() => openFileSelector()} className='mx-2 hover:cursor-pointer'/>
            </div>

            <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
            <span onClick={() => upload()}>upload</span>

            <div className='group hover:w-36 py-[2px] transition-all duration-700 hover:bg-secondary mt-4 rounded-3xl justify-center items-center flex hover:cursor-pointer' onClick={() => {handleUpdateUserInfo(userID, fn, un, em, bd, toggleChangesMade); toggleEditProfile();}}>
                <FaCheckCircle className='text-2xl group-hover:scale-0 relative group-hover:absolute'/>
                <FaCheck className='text-2xl text-primary group-hover:scale-100 scale-0 absolute group-hover:relative'/>
            </div>
        </div>
    )
}

const Profile = () => {
    const [userData, setUserData] = useState({});
    const userID = useSelector(state => state.userID);
    const [dataReady, setDataReady] = useState(false);
    const toggleDataReady = () =>{setDataReady(true);}
    const [editProfile, setEditProfile] = useState(false);
    const toggleEditProfile = () => {setEditProfile(!editProfile);}
    const [changesMade, setChangesMade] = useState(false);
    const toggleChangesMade = () => {setChangesMade(!changesMade);}

    useEffect(() =>{
        getUserData(userID, setUserData, toggleDataReady);
    }, []);

    useEffect(() =>{
        getUserData(userID, setUserData, toggleDataReady);
    }, [changesMade]);

    return (
        <div
            className='w-full h-full flex flex-col items-center'
        >
            {editProfile &&
                <EditProfile
                    toggleEditProfile={toggleEditProfile}
                    toggleChangesMade={toggleChangesMade}
                    fullName={userData.fullName}
                    username={userData.username}
                    email={userData.email}
                    birthDate={userData.birthDate}
                    userID={userID}
                />
            }
            <h1 className='text-primary mt-8 text-xl font-medium mb-8'>user profile</h1>
            {dataReady &&
            <div className='text-primary text-sm flex flex-col space-y-4 w-4/5'>
                <div className='bg-primary text-secondary rounded-lg w-full px-2 h-10 flex items-center'>
                    <span className='w-2/5'>fullname:</span>
                    <span className='font-bold px-1'>{userData.fullName}</span>
                </div>
                <div className='bg-primary text-secondary rounded-lg w-full px-2 h-10 flex items-center'>
                    <span className='w-2/5'>username:</span>
                    <span className='font-bold px-1'>{userData.username}</span>
                </div>
                <div className='bg-primary text-secondary rounded-lg w-full px-2 h-10 flex items-center'>
                    <span className='w-2/5'>email:</span>
                    <span className='font-bold px-1'>{userData.email}</span>
                </div>
                <div className='bg-primary text-secondary rounded-lg w-full px-2 h-10 flex items-center'>
                    <span className='w-2/5'>birthdate:</span>
                    <span className='font-bold px-1'>{userData.birthDate}</span>
                </div>
                <div className='flex justify-center items-center w-full'>
                    <div className='my-4 text-2xl hover:cursor-pointer' onClick={() => toggleEditProfile()}>
                        <FaEdit className='' />
                    </div>
                </div>
                
            </div>
            }
        </div>
    )
}

export default Profile