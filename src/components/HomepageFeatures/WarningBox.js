import React from 'react';

export default function WarningBox({ icon = "⚠️", title, children }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#e4141e',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px'
      }}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '28px',
          marginRight: '15px',
          flexShrink: 0,
          lineHeight: '50px',               // Ensures emoji is vertically centered
          textAlign: 'center',
        }}
      >
        <span style={{
          display: 'inline-block',
          lineHeight: '1',
          verticalAlign: 'middle'
        }}>{icon}</span>
      </div>
      <div>
        {title && <h3 style={{ margin: 0, marginBottom: '10px', color: 'white' }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}
