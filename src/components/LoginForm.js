import React, { useState } from 'react'
import {handleSignUp} from '../firebase/writes.js';
import {useDispatch} from 'react-redux'
import { setActiveMenuElement} from '../redux';
import BirthDatePicker from './BirthDatePicker.js';

const Divider = () => (<div className='w-4/5 my-4 h-[1px] bg-white transition-all duration-300'></div>)

const StartingScreen = ({toggleLogIn, toggleSignUp}) => {
    return(
        <div className='w-96 h-96 relative bg-primary rounded-xl shadow-2xl drop-shadow-md hover:drop-shadow-2xl transition-all duration-300 flex pt-20 flex-col items-center'>
            <span className='text-white text-xl font-thin mb-4'>start chatting with your friends.</span>

            <div className='w-4/5 my-2 h-10 flex relative justify-center items-center bg-white text-primary rounded-3xl hover:rounded-md transition-all duration-300'>
                <img src={require("../assets/logo-google.png")} alt="google_logo" className='w-4 h-4 mr-2 flex justify-center items-center' />
                <span>sign in with google</span>
            </div>

            <Divider />

            <div onClick={() => toggleSignUp()} className='hover:cursor-pointer w-4/5 my-2 h-10 flex relative justify-center items-center bg-white text-primary rounded-3xl hover:rounded-md transition-all duration-300'>
                <span>create an account</span>
            </div>

            <div className='flex absolute bottom-8 w-4/5 text-white text-sm font-thin'>
                already have an account?
                <span onClick={() => toggleLogIn()} className='text-secondary ml-1 font-bold cursor-pointer'>log in</span>!
            </div>
        </div>
    )
}

const LogInForm = ({toggleLogIn, username, password, setUsername, setPassword, toggleLoginVis}) => {
    const [passwordVis, setPasswordVis] = useState(false);
    const togglePassword = () => {
        setPasswordVis(!passwordVis)
    }
    return(
        <div className='w-96 h-96 relative bg-primary rounded-xl shadow-2xl drop-shadow-md hover:drop-shadow-2xl transition-all duration-300 flex justify-center flex-col items-center'>
            <span className='text-white text-xl font-thin mb-4'>login now!</span>

            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username or email' className='w-4/5 my-2 h-10 px-2 flex relative justify-center items-center bg-white text-primary rounded-3xl hover:rounded-md transition-all duration-300'/>


            <div className='w-full h-12 flex justify-center items-center'>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' type={passwordVis ? "text" : "password"} className='w-4/5 my-2 h-10 px-2 flex relative justify-center items-center bg-white text-primary rounded-3xl hover:rounded-md transition-all duration-300'/>
            </div>

            <div className='w-4/5 justify-end items-end flex mb-4 pr-2 hover:cursor-pointer'>
                <span onClick={() => togglePassword()} className='text-white text-xs italic'>
                    {!passwordVis && "show password"}
                    {passwordVis && "hide password"}
                </span>
            </div>
            
            <Divider />

            <div onClick={() => toggleLoginVis()} className='h-10 w-2/5 flex relative justify-center items-center bg-secondary text-primary rounded-3xl hover:rounded-md transition-all duration-300 hover:cursor-pointer'>
                <span className='text-primary font-bold'>log in!</span>
            </div>

            <div className='flex absolute bottom-8 w-4/5 text-white text-sm font-thin'>
                <span onClick={() => toggleLogIn()} className='text-secondary ml-1 font-bold cursor-pointer'>
                    go back
                </span>.
            </div>
        </div>
    )
}

const SignUpForm = ({toggleSignUp, username, password, setUsername, setPassword, password_r, setPassword_r, toggleLoginVis}) => {
    const [passwordVis, setPasswordVis] = useState(false);
    const togglePassword = () => {
        setPasswordVis(!passwordVis)
    }
    const [additionalInfo, setAdditionalInfo] = useState(false);
    const toggleAdditionalInfo = () => {setAdditionalInfo(!additionalInfo);}

    const [day, setDay] = useState(31);
    const [month, setMonth] = useState(12);
    const [year, setYear] = useState(2022);
    const [usern, setUsern] = useState("");
    const [fullN, setFullN] = useState(""); 
    const birthDate = day+". "+month+". "+year;

    if(!additionalInfo){
    return(
        <div className='w-96 h-4/5 relative bg-primary rounded-xl shadow-2xl drop-shadow-md hover:drop-shadow-2xl transition-all duration-300 flex pt-20 flex-col items-center'>
            <span className='text-white text-xl font-thin mb-4'>signup now!</span>

            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='email' className='w-4/5 my-4 h-10 px-2 flex relative justify-center items-center bg-white text-primary rounded-3xl hover:rounded-md transition-all duration-300'/>


            <div className='w-full h-12 flex justify-center items-center mt-4 mb-2'>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' type={passwordVis ? "text" : "password"} className='w-4/5 h-10 px-2 flex relative justify-center items-center bg-white text-primary rounded-3xl hover:rounded-md transition-all duration-300'/>
            </div>

            <div className='w-full h-12 flex justify-center items-center'>
            <input value={password_r} onChange={(e) => setPassword_r(e.target.value)} placeholder='repeat password' type={passwordVis ? "text" : "password"} className='w-4/5 h-10 px-2 flex relative justify-center items-center bg-white text-primary rounded-3xl hover:rounded-md transition-all duration-300'/>
            </div>

            <div className='w-4/5 justify-end items-end flex mb-4 pr-2 hover:cursor-pointer'>
                <span onClick={() => togglePassword()} className='text-white text-xs italic'>
                    {!passwordVis && "show password"}
                    {passwordVis && "hide password"}
                </span>
            </div>

            <Divider />

            <div onClick={() => {
                    if(password.length > 0 && username.length >= 3 && password === password_r){
                        /*handleSignUp(username, password);*/ 
                        toggleAdditionalInfo(); }
                    }                    
                }
                
                className=
                {password.length > 0 && username.length >= 3 && password === password_r ?
                'h-10 w-2/5 flex relative justify-center items-center bg-secondary text-primary rounded-3xl hover:rounded-md transition-all duration-300 hover:cursor-pointer mt-4'
                : 'h-10 w-2/5 flex relative justify-center items-center bg-gray-400 text-primary rounded-3xl hover:rounded-md transition-all duration-300 mt-4'
                }

            >
                <span className='text-primary font-bold'>continue!</span>
            </div>
            
            <div className='flex absolute bottom-8 w-4/5 text-white text-sm font-thin'>
                <span onClick={() => toggleSignUp()} className='text-secondary ml-1 font-bold cursor-pointer'>
                    go back
                </span>.
            </div>
        </div>
    )
    }else if(additionalInfo){
        return(
        <div className='w-96 h-4/5 relative bg-primary rounded-xl shadow-2xl drop-shadow-md hover:drop-shadow-2xl transition-all duration-300 flex pt-20 flex-col items-center'>
            <span className='text-white text-xl font-thin mb-4'>signup now!</span>

            <input value={usern} onChange={(e) => setUsern(e.target.value)} placeholder='username' className='w-4/5 my-2 h-10 px-2 flex relative justify-center items-center bg-white text-primary rounded-3xl hover:rounded-md transition-all duration-300'/>
            
            <input value={fullN} onChange={(e) => setFullN(e.target.value)} placeholder='full name' className='w-4/5 my-2 h-10 px-2 flex relative justify-center items-center bg-white text-primary rounded-3xl hover:rounded-md transition-all duration-300'/>

            <BirthDatePicker setDay={setDay} setMonth={setMonth} setYear={setYear} />

            <Divider />
            <div onClick={() => {handleSignUp(username, password, usern, fullN, birthDate); toggleLoginVis(); }} className='h-10 w-2/5 flex relative justify-center items-center bg-secondary text-primary rounded-3xl hover:rounded-md transition-all duration-300 hover:cursor-pointer mt-4'>
                <span className='text-primary font-bold'>sign up!</span>
            </div>

            <div className='flex absolute bottom-8 w-4/5 text-white text-sm font-thin'>
                <span onClick={() => toggleAdditionalInfo()} className='text-secondary ml-1 font-bold cursor-pointer'>
                    go back
                </span>.
            </div>
        </div>
        )
    }
}

const LoginForm = ({toggleLoginVis}) => {

    const [logInVisibility, setLogInVisibility] = useState(false);
    const [signUpVisibility, setSignUpVisibility] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password_r, setPassword_r] = useState("");
    const toggleLogIn = () => {setLogInVisibility(!logInVisibility);}
    const toggleSignUp = () => {setSignUpVisibility(!signUpVisibility);}
    
    const dispatch = useDispatch();
    dispatch(setActiveMenuElement("Home"));

    return (
        <div className='w-full h-full flex justify-center items-center'>
            {
                !logInVisibility && !signUpVisibility &&
                <StartingScreen toggleLogIn={toggleLogIn} toggleSignUp={toggleSignUp}/>
            }
            {
                logInVisibility &&
                <LogInForm toggleLogIn={toggleLogIn} username={username} password={password} setUsername={setUsername} setPassword={setPassword} toggleLoginVis={toggleLoginVis} />
            }
            {
                signUpVisibility &&
                <SignUpForm toggleSignUp={toggleSignUp} username={username} password={password} setUsername={setUsername} setPassword={setPassword} password_r={password_r} setPassword_r={setPassword_r} toggleLoginVis={toggleLoginVis} />
            }
        </div>
    )
}

export default LoginForm