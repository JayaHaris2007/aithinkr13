import Nav from '../components/Nav';
import ChatBox from '../components/Chatbox';
import Sidebar from '../components/Sidebar';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Main = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? 'User logged in' : 'No user');
      console.log('User ID:', user ? user.uid : 'null');
      console.log('Email verified:', user ? user.emailVerified : 'N/A');
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Hide sidebar when overlay is clicked
  const handleOverlayClick = () => setSidebarOpen(false);

  return (
    <div className={`layout${sidebarOpen ? ' sidebar-open' : ''}`}>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span style={{ fontSize: '2rem', lineHeight: '1' }}>&#9776;</span>
      </button>
      {/* Overlay for mobile, only when sidebar is open */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
      )}
      <div className={`sidebar-wrapper${sidebarOpen ? ' open' : ''}`}>
        <Sidebar
          userId={userId}
          onSelectChat={(id) => {
            setSelectedChatId(id);
            setSidebarOpen(false); // Also close sidebar when a chat is selected
          }}
          selectedChatId={selectedChatId}
        />
      </div>
      <div className="main-content">
        <Nav />
        <ChatBox userId={userId} chatId={selectedChatId} onNewChat={setSelectedChatId} />
      </div>
    </div>
  );
};

export default Main;