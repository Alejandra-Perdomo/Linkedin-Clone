import { Avatar } from '@mui/material'
import React from 'react'
import './Sidebar.css'
import { useSelector } from 'react-redux'
import { selectUser } from './features/counter/userSlice'

function Sidebar() {
    const user = useSelector(selectUser).user;
    
    const recentItem = (topic) =>(
        <div className="sidebar__recentItem">
        <span className="sidebar_hash">#</span>
        <p>{topic}</p>
        </div>
    )

  return (
    <div className="sidebar">
        <div className="sidebar__top">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" />
            <Avatar src={user.photoUrl} className='sidebar__avatar'>{user.email[0].toUpperCase()}</Avatar>
            <h2>{user.displayName}</h2>
            <h4>{user.email}</h4>
        </div>
        <div className="sidebar__stats">
            <div className="sidebar__stat">
                <p>Who viewed you</p>
                <p className="sidebar__statNumber">2,543</p>
            </div>
            <div className="sidebar__stat">
                <p>Who viewed you</p>
                <p className="sidebar__statNumber">2,543</p>
            </div>
        </div>
        <div className="sidebar__bottom">
            <p>Recent</p>
            {recentItem('reactjs')}
            {recentItem('programming')}
            {recentItem('soft')}
            {recentItem('softwareengineering')}
            {recentItem('design')}
        </div>
    </div>
  )
}

export default Sidebar