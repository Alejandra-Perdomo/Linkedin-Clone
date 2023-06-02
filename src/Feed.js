import React, { useEffect, useState } from 'react'
import './Feed.css'
import Post from './Post';
import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import { collection, db, getDocs, addDoc, serverTimestamp, orderBy, query } from './firebase';

function Feed() {
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState('');

    async function fetchData(){
        const postsCollection = collection(db,"posts");
        const q = query(postsCollection, orderBy("timeStamp","desc"));
        const postSnapshot = await getDocs(q);
        setPosts(
            postSnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        );
        console.log('data fetched');  
    }

    useEffect(()=>{
        fetchData();
    },[])

    const sendPost = async(e) =>{
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "posts"), {
              name: "Ada",
              description: "This is a test post",
              message: input,
              photoUrl: '',
              timeStamp: serverTimestamp(), 
            });
            console.log("Document written with ID: ", docRef.id);
            fetchData();
            setInput("");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

  return (
    <div className='feed'>
        <div className="feed__inputContainer">
            <div className="feed__input">
                <CreateIcon/>
                <form >
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
                    <button type='submit' onClick={sendPost}>Send</button>
                </form>
            </div>
            <div className="feed__inputOptions">
                <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9"/>
                <InputOption Icon={SubscriptionsIcon} title="Video" color="#e7a33e"/>
                <InputOption Icon={EventNoteIcon} title="Event" color="#c0cbcd"/>
                <InputOption Icon={CalendarViewDayIcon} title="Write Article" color="#7fc15e"/>
            </div>
        </div>
        {posts.map(({id, data:{name, description, message, photoUrl}})=>(
            <Post 
            key={id}
            name={name}
            description={description} 
            message={message} 
            photoUrl={photoUrl}/> 
        ))}
    </div>
  )
}

export default Feed