import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

function Clientchat() {
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('history', (history) => setMessages(history));
    socket.on('message', (msg) => setMessages((prev) => [...prev, msg]));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoin = () => {
    if (name) {
      socket.emit('join', { type: 'customer', name });
      setJoined(true);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (text) {
      socket.emit('message', { text });
      setText('');
    }
  };

  if (!joined) {
    return (
      <div style={{ padding: 20 }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleJoin}>Join Chat</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h2>Chat with Agent</h2>
      <div style={{ height: 300, overflowY: 'scroll', border: '1px solid #ccc', padding: 10 }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.from === 'customer' ? 'right' : 'left',
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                background: msg.from === 'customer' ? '#dcf8c6' : '#fff',
                padding: 10,
                borderRadius: 10,
                boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
              }}
            >
              {msg.text}
            </div>
            <div style={{ fontSize: 12, color: '#999' }}>{msg.time}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} style={{ marginTop: 10 }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          style={{ width: '80%' }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Clientchat;