import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';

const Sidebar = ({ userId, onSelectChat, selectedChatId }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!userId) {
      setChats([]);
      return;
    }
    const fetchChats = async () => {
      try {
        const q = query(
          collection(db, 'chats'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const chatList = [];
        querySnapshot.forEach((doc) => {
          chatList.push({ id: doc.id, ...doc.data() });
        });
        setChats(chatList);
      } catch (error) {
        console.error('Error fetching chats:', error);
        if (error.code === 'permission-denied') {
          console.error('Permission denied: Check Firebase security rules');
        }
        setChats([]);
      }
    };
    fetchChats();
  }, [userId]);

  const recentChats = chats.slice(0, 3);
  const historyChats = chats.slice(0, 7);

  return (
    <div className='sidebar'>
      <h2>Chat Menu</h2>
      <div className='newchat'>
        <a href="#newchat" className='btn btn-primary' onClick={() => onSelectChat(null)}>New Chat</a>
      </div>
      <br />
      <h3>Recent</h3>
      <ul>
        {recentChats.map(chat => (
          <li key={chat.id} className={selectedChatId === chat.id ? 'active' : ''}>
            <a href="#chat"
               onClick={() => onSelectChat(chat.id)}>
              {chat.title || `Chat ${chat.id.substring(0, 6)}`}
            </a>
          </li>
        ))}
      </ul>
      <h3>History</h3>
      <ul>
        {historyChats.map(chat => (
          <li key={chat.id} className={selectedChatId === chat.id ? 'active' : ''}>
            <a href="#chat"
               onClick={() => onSelectChat(chat.id)}>
              {chat.title || `Chat ${chat.id.substring(0, 6)}`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;