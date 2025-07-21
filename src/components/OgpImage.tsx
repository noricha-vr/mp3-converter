import React from 'react';

const OgpImage: React.FC = () => {
  return (
    <div style={{
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(255,255,255,0.1) 10px,
          rgba(255,255,255,0.1) 20px
        )`
      }} />
      
      {/* Main content */}
      <div style={{
        textAlign: 'center',
        zIndex: 1
      }}>
        {/* Icon */}
        <div style={{
          width: '120px',
          height: '120px',
          margin: '0 auto 32px',
          background: 'white',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}>
          <svg width="80" height="80" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="240" fill="#4F46E5" />
            <g transform="translate(120, 100)">
              <path d="M80 120v160c-8.8-12.2-23.3-20-40-20-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48V160l96-32V80L80 120z" fill="white"/>
              <ellipse cx="136" cy="112" rx="48" ry="16" fill="white"/>
            </g>
            <g transform="translate(256, 256)">
              <path d="M-20 -40 L20 -40 L20 -20 L50 0 L20 20 L20 40 L-20 40 L-20 20 L-50 20 L-50 -20 L-20 -20 Z" fill="white"/>
            </g>
            <text x="256" y="380" fontFamily="Arial, sans-serif" fontSize="64" fontWeight="bold" textAnchor="middle" fill="white">MP3</text>
          </svg>
        </div>
        
        {/* Title */}
        <h1 style={{
          fontSize: '72px',
          fontWeight: 'bold',
          margin: '0 0 16px',
          textShadow: '0 4px 16px rgba(0,0,0,0.2)'
        }}>
          MP3 Converter
        </h1>
        
        {/* Subtitle */}
        <p style={{
          fontSize: '32px',
          margin: '0 0 48px',
          opacity: 0.9
        }}>
          動画・音声ファイルを簡単にMP3に変換
        </p>
        
        {/* Features */}
        <div style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '28px' }}>✅</span>
            <span>無料</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '28px' }}>✅</span>
            <span>高速変換</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '28px' }}>✅</span>
            <span>ブラウザで完結</span>
          </div>
        </div>
      </div>
      
      {/* URL */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        fontSize: '24px',
        opacity: 0.8
      }}>
        mp3-converter.example.com
      </div>
    </div>
  );
};

export default OgpImage;