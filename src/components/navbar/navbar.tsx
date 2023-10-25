'use client'
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHome } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import { BsCart4 } from 'react-icons/bs';
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineFeaturedPlayList } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { VscAccount } from 'react-icons/vsc';
import styles from '../../app/styles/nav.module.css';
const Navbar = () => {
    const [nav, setNav] = useState(false);


    const links = [
        {
            id: 1,
            link: "Home",
            name:'Home',
            icon:<AiOutlineHome size={20}/>
        },
        {
            id: 2,
            link: "About",
            name:'About',
            icon:<TbListDetails size={20}/>
        },
        {
            id: 3,
            link: "Feature",
            name:'Feature',
            icon:<MdOutlineFeaturedPlayList size={20}/>
        },
        {
            id: 4,
            link: "Cart",
            name:'Cart',
            icon:<BsCart4 size={20}/>
        },
        {
            id: 5,
            link: "/login",
            name:'Account',
            icon:<VscAccount size={20}/>
        },
    ];
    
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', height: '70px', alignItems: 'center', width: '100%', background: '#3876BF', color: 'white', position: 'relative' }}
        >

            <div style={{paddingLeft:'20px'}}>
                {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
                <h1 className="text-5xl font-signature ml-2">
                    <a
                        className="link-underline link-underline-black"
                        href=""
                        target="_blank"
                        rel="noreferrer"
                    >
                        Logo
                    </a>
                </h1>
            </div>
            <div className={styles.clickIcon} style={{paddingRight:'20px'}}>

                <ul style={{ display: 'flex', flexDirection: 'row', listStyle: 'none', gap: '45px' }}>
                    {links.map(({ id, link,icon,name }) => (
                        
                        <li
                            key={id}
                            className="nav-links px-4 cursor-pointer capitalize font-medium  hover:scale-105  duration-200 link-underline"
                            style={{display:'flex',flexDirection:'row',gap:'2px',justifyContent:'center',alignItems:'center'}}
                        >
                            {icon}
                            <Link style={{ textDecoration: 'none',color:'white',fontSize:'18px' }} href={link}>{name}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            {nav && (
                <ul
                    // className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500"
                    className={styles.navClickIcon}
                    style={{ listStyle: 'none', position: 'absolute', top: '70px',zIndex: 10, width: '100%', background: 'white' }}
                >

                    {links.map(({ id, link,name }) => (
                        <li
                            key={id}
                            className="px-4 cursor-pointer capitalize py-6 text-4xl"
                            style={{ background: 'green', height: '35px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',paddingLeft:'20px' }}

                        >
                            <Link style={{ textDecoration: 'none',color:'white',fontSize:'20px'}} onClick={() => setNav(!nav)} href={link}>
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            <div
                onClick={() => setNav(!nav)}
                // className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden navicon{}"
                className={styles.navicon}
                style={{ cursor: 'pointer',paddingRight:'20px' }}
            >
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>
            
        </div>

    );
};

export default Navbar;