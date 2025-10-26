import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from "react-markdown";
import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';

// Initialize the Generative AI model
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const Chatbox = ({ userId, chatId, onNewChat }) => {
  const inputRef = useRef(null);
  const chatBodyRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load chat history when chatId changes
  useEffect(() => {
    const loadChat = async () => {
      if (!chatId) {
        setMessages([{ type: 'bot', text: 'Hi there! How can I help?' }]);
        return;
      }
      
      console.log('Loading chat with ID:', chatId);
      console.log('Current userId when loading chat:', userId);
      
      try {
        const chatRef = doc(db, 'chats', chatId);
        const chatSnap = await getDoc(chatRef);
        if (chatSnap.exists()) {
          setMessages(chatSnap.data().messages || []);
        }
      } catch (error) {
        console.error('Error loading chat:', error);
        if (error.code === 'permission-denied') {
          console.error('Permission denied when loading chat - check Firebase rules');
        }
      }
    };
    loadChat();
  }, [chatId, userId]);

  // Auto scroll chat to bottom smoothly when messages or loading changes
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    const userMsg = inputRef.current.value.trim();
    if (!userMsg) return;

    // Debug: Check authentication state
    console.log('Current userId:', userId);
    console.log('Current chatId:', chatId);

    const newMessages = [...messages, { type: 'user', text: userMsg }];
    setMessages(newMessages);
    inputRef.current.value = '';
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });
      const result = await model.generateContent(userMsg);
      const response = await result.response;
      const botReply = await response.text();

      const updatedMessages = [...newMessages, { type: 'bot', text: botReply }];

      // Only save to Firestore if a user is logged in
      if (userId) {
        let chatRef;
        if (chatId) {
          chatRef = doc(db, 'chats', chatId);
          await updateDoc(chatRef, {
            messages: updatedMessages
          });
        } else {
          // New chat for a logged-in user
          const newChatId = Date.now().toString();
          chatRef = doc(db, 'chats', newChatId);
          await setDoc(chatRef, {
            messages: updatedMessages,
            createdAt: serverTimestamp(),
            title: userMsg.substring(0, 20), // first message as title
            userId: userId
          });
          if (onNewChat) onNewChat(newChatId);
        }
      }

      setMessages(updatedMessages);

    } catch (error) {
      console.error('Firebase error:', error);
      let errorMessage = 'Sorry, something went wrong.';
      
      if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check your authentication.';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Please try again.';
      } else if (error.message.includes('Missing or insufficient permissions')) {
        errorMessage = 'Missing permissions. Please refresh and try again.';
      }
      
      setMessages(prev => [...prev, { type: 'bot', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainbar d-flex justify-content-center align-items-center">
      <div className="box">
        <h3 className="text-center mb-4">AIthinkr – Ask your doubt</h3>

        <div className="chat-body mb-3" ref={chatBodyRef} style={{ overflowY: 'auto', maxHeight: '400px' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              <span className={`badge ${msg.type === 'user' ? 'bg-primary' : 'bg-secondary'} me-1`}>
                {msg.type === 'user' ? 'You' : 'Bot'}:
              </span>
              <span className="chat-text"><ReactMarkdown>{msg.text}</ReactMarkdown></span>
            </div>
          ))}

          {loading && (
            <div className="chat-message bot typing-indicator">
              <span className="badge bg-secondary me-1">Bot:</span>
              <span className="chat-text">Typing...</span>
            </div>
          )}
        </div>

        <div className="chat-footer d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Type your message..."
            ref={inputRef}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={loading}
          />
          <button className="btn btn-primary" onClick={handleSend} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
