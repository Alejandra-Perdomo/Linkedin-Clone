import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.css'
import HeaderOption from './HeaderOption';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { logout, selectUser } from './features/counter/userSlice';


function Header() {
  const user = useSelector(selectUser).user;
  console.log('header',user)
  const dispatch = useDispatch();

  const logOutOfApp = () =>{
    dispatch(logout());

    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('signed out')
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

  return (
    <div className='header'>
        <div className='header__left'>
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="" />
            <div className="header__search">
                <SearchIcon/>
                <input type="text" />
            </div>
        </div>
        <div className='header__right'>
            <HeaderOption Icon={HomeIcon} title="Home"/>
            <HeaderOption Icon={SupervisorAccountIcon} title="My Network"/>
            <HeaderOption Icon={BusinessCenterIcon} title="Jobs"/>
            <HeaderOption Icon={ChatIcon} title="Messaging"/>
            <HeaderOption Icon={NotificationsIcon} title="Notifications"/>
            <HeaderOption avatar={true} 
            title="Me"
            onClick={logOutOfApp}
            />

        </div> 
    </div>
  )
}

export default Header