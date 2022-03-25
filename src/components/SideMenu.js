import React, { useState } from 'react'
import { FaBeer, FaHome, FaDoorOpen, FaSearch, } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setActiveMenuElement } from '../redux';

const menuElements = [
    {
        name: "Home",
        alt: "",
        action: () => {console.log("Home")},
        image: <FaHome className='w-4 h-4 text-white'/>,
    },
    {
        name: "Search",
        alt: "",
        action: () => {console.log("Search")},
        image: <FaSearch className='w-4 h-4 text-white'/>,
    },
    {
        name: "Profile",
        alt: "",
        action: () => {console.log("Profile")},
        image: <IoPerson className='w-4 h-4 text-white'/>,
    },
    {
        name: "LogOut",
        alt: "",
        action: () => {console.log("LogOut")},
        image: <FaDoorOpen className='w-4 h-4 text-white'/>,
    },
];

const SideMenu = () => {

    const dispatch = useDispatch();
    const handleSetActiveElement = (element) =>{dispatch(setActiveMenuElement(element))}
    
  return (
    <div className='h-full w-16 absolute top-0 left-0 flex justify-end items-center flex-col bg-primary'>
        {
            menuElements.map((item, index) => {
                return(
                    <div
                    className='w-12 h-12 rounded-3xl hover:rounded-md transition-all duration-500 bg-secondary my-2 justify-center items-center flex group cursor-pointer'
                    onClick={() => handleSetActiveElement(item.name)}
                    key={item.name}
                    >
                        {item.image}
                        <div className='absolute -right-24 bg-primary transition-all duration-500 rounded-3xl scale-0 group-hover:scale-100 w-24 h-10 flex justify-center items-center text-secondary font-bold z-30'>{item.name.toUpperCase()}</div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default SideMenu