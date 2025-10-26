import React from 'react'

import Nav from '../components/guestNav';
import ChatBox from '../components/Chatbox'

export const Guest = () => {
  return (
    <div className="guest-mode">
      <Nav />
      <ChatBox />
    </div>
  )
}

