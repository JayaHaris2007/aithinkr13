import React from 'react';

export default function AboutUs() {
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#222',
        lineHeight: 1.6,
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#1a73e8' }}>
        About AIThinkr
      </h1>

      <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
        Welcome to <strong>AIThinkr</strong>, where innovation meets intelligence! 
        We are a team passionate about building smart, AI-powered tools that simplify your digital life. 
        Our mission is to empower users through technology that’s both powerful and easy to use.
      </p>

      <h2 style={{ marginTop: '32px', marginBottom: '12px', color: '#333' }}>
        Meet Our Team
      </h2>
      <p style={{ marginBottom: '24px' }}>
        Our diverse team combines a wide range of skills and experience to deliver the best AI solutions:
      </p>

      <ul style={{ listStyle: 'disc inside', marginBottom: '24px' }}>
        <li>
          <strong>Jaya Haris</strong>: The visionary lead and full-stack developer, weaving AI seamlessly into our applications.
        </li>
        <li>
          <strong>Praveen</strong>: The backend maestro, crafting robust, scalable, and secure server-side systems.
        </li>
        <li>
          <strong>Nihal Ahmed</strong>: Our frontend wizard, designing sleek, intuitive, and user-friendly interfaces that delight.
        </li>
      </ul>

      <h2 style={{ marginBottom: '12px', color: '#333' }}>
        Why Choose AIThinkr?
      </h2>
      <p>
        We believe in creating technology that adapts to your needs. Whether you're exploring AI for the first time or integrating complex automation into your workflow, AIThinkr is designed to help you think smarter and act faster.
      </p>

      <p style={{ marginTop: '24px', fontStyle: 'italic', color: '#555' }}>
        Thank you for joining us on this journey. Together, let’s unlock the future of intelligent technology.
      </p>

      {/* Buttons for Guest and Login */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
        <button
          onClick={() => window.location.href = "/guest"}
          style={{
            backgroundColor: '#f0f0f0',
            border: '2px solid #aaa',
            color: '#555',
            padding: '14px 28px',
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.3s, color 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#ddd';
            e.currentTarget.style.color = '#222';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
            e.currentTarget.style.color = '#555';
          }}
          aria-label="Guest Mode"
        >
          Guest Mode
        </button>

        <button
          onClick={() => window.location.href = "/login"}
          style={{
            backgroundColor: '#222',
            border: 'none',
            color: 'white',
            padding: '14px 28px',
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#444')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#222')}
          aria-label="Login"
        >
          Login
        </button>
      </div>
    </div>
  );
}
