import React from 'react';

export default function InfoBox({ emoji, title, children }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#8CD2F4', // Light blue
        color: 'black',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          width: '100px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          marginRight: '15px',
        }}
      >
        {emoji}
      </div>
      <div>
        {title && <h3 style={{ margin: 0, marginBottom: '10px' }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}
