import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { getUserData, readProfilePhotoURL } from '../../firebase/reads';
import { handleUpdateUserInfo, uploadProfilePhoto } from '../../firebase/writes';
import { FaEdit, FaCross, FaXbox, FaCheckCircle, FaCheck, FaUpload} from 'react-icons/fa'
import { useFilePicker } from 'use-file-picker';
import { storage } from '../../firebase/firebase';
import {ref, uploadBytes } from 'firebase/storage';

const EditProfile = ({toggleEditProfile, toggleChangesMade, fullName, username, email, birthDate, userID}) => {

    const [fn, setFn] = useState(fullName);
    const [un, setUn] = useState(username);
    const [em, setEm] = useState(email);
    const [bd, setBd] = useState(birthDate);

    const [image, setImage] = useState("");
    
    function previewImage() {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(document.getElementById("selectedFile").files[0]);
        fileReader.onload = function (readerEvent) {
            document.getElementById("preview").src = readerEvent.target.result;
        };
    };


    return(
        <div className='w-full h-full absolute bg-primary text-secondary px-4 py-4 border-4 border-secondary rounded-3xl hover:rounded-sm transition-all duration-300 flex items-center flex-col'>
            <FaXbox className='hover:cursor-pointer text-base hover:text-xl transition-all duration-300 absolute top-4 right-4' onClick={() =>{toggleEditProfile(); setImage("")}}/>
            <span className='mt-12 text-secondary shadow-2xl font-semibold text-lg'>edit profile</span>
            <input value={fn} onChange={(e) => setFn(e.target.value)} placeholder='full name' type={"text"} className='w-4/5 bg-secondary h-10 mt-4 text-primary px-2 rounded-lg' />
            <input value={un} onChange={(e) => setUn(e.target.value)} placeholder='user name' type={"text"} className='w-4/5 bg-secondary h-10 mt-4 text-primary px-2 rounded-lg' />
            <input value={em} onChange={(e) => setEm(e.target.value)} placeholder='email' type={"text"} className='w-4/5 bg-secondary h-10 mt-4 text-primary px-2 rounded-lg' />
            <input value={bd} onChange={(e) => setBd(e.target.value)} placeholder='birth date' type={"text"} className='w-4/5 bg-secondary h-10 mt-4 text-primary px-2 rounded-lg' />
            
            <div className='mt-6 w-full h-auto flex justify-center items-center'>
                <input type="file" onChange={(e)=>{{setImage(e.target.files[0]); previewImage()}}} className='scale-0 w-0' id="selectedFile" />
                <FaUpload onClick={() => document.getElementById('selectedFile').click()} className='mx-2 hover:cursor-pointer'/>
                {image && <img alt="" className='w-10 h-10 rounded-full border-2 border-secondary object-cover hover:w-20 hover:h-20 hover:border-4 transition-all duration-500 shadow-2xl' id="preview" />}
            </div>

            <div className='group hover:w-36 py-[2px] transition-all duration-700 hover:bg-secondary mt-4 rounded-3xl justify-center items-center flex hover:cursor-pointer' onClick={() => {handleUpdateUserInfo(userID, fn, un, em, bd, toggleChangesMade, image); toggleEditProfile(); setImage("")}}>
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

    const[profilePhoto, setProfilePhoto] = useState("");

    useEffect(() =>{
        getUserData(userID, setUserData, toggleDataReady);
    }, []);

    if(userID !== undefined) readProfilePhotoURL(userID, setProfilePhoto, toggleChangesMade);

    useEffect(() => {
    }, [profilePhoto])

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
                <div className='w-full flex justify-center items-center'>
                {profilePhoto.length > 0 ? <img src={profilePhoto} alt='' className='w-20 h-20 object-cover border-4 border-primary rounded-full shadow-2xl' /> : null}
                </div>
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