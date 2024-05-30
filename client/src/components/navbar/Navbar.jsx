import React, { useContext } from 'react'
import './navbar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';

function Navbar() {

    const { toggle , darkMode} = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);

  return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration: "none"}}>
                <span>Social App</span>
                </Link>
                <HomeOutlinedIcon className='icon' 
                onClick={() => window.location.href = "/"} 
                />
                {darkMode ? <WbSunnyOutlinedIcon onClick={toggle} className='icon'/> : <DarkModeOutlinedIcon onClick={toggle} className='icon'/>}
                <GridViewOutlinedIcon className='icon'/>
            </div>
            <div className="search">
                <SearchOutlinedIcon />
                <input type="text" placeholder='Search' id='searchBar'/>
            </div>
            <div className="right">
                <PersonOutlinedIcon className='icon'/>
                <EmailOutlinedIcon className='icon'/>
                <NotificationsOutlinedIcon className='icon'/>
                <div className="user">
                    <img src={currentUser?.profilePic} alt="" />
                    <span>{currentUser?.name}</span>
                </div>
            </div>
        </div>
  )
}

export default Navbar