import React from 'react'
import './HeaderOption.css'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUser } from './features/counter/userSlice'
const avatarUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg0UZu5ezMCYXEdjyPjubk0OfJyymSmaLOT9sOXYAR-AWdYLxA_R4mtjp4S0HxRqZuUd4&usqp=CAU"

function HeaderOption({avatar, Icon, title, onClick}) {

  const user = useSelector(selectUser).user;
/*   console.log('header',user.email[0].toUpperCase()); */
  console.log('avatar',avatar)
  return (
    <div onClick={onClick} className="headerOption">
        {Icon && <Icon className="headerOption__icon"/>}
        {avatar && <Avatar className="headerOption__icon" src={user?user.photoUrl:avatarUrl}>{user?user.email[0].toUpperCase():""}</Avatar>}
        <h3 className='headerOption__title'>{title}</h3>
    </div>
  )
}

export default HeaderOption