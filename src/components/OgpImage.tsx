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
      background: 'linear-gradient(135deg, #5B21B6 0%, #4C1D95 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.3) 0%, transparent 50%)
        `
      }} />
      
      {/* Main content */}
      <div style={{
        textAlign: 'center',
        zIndex: 1
      }}>
        {/* Logo */}
        <div style={{
          width: '160px',
          height: '160px',
          margin: '0 auto 40px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <svg width="120" height="120" viewBox="0 0 512 512">
            <rect width="512" height="512" rx="100" fill="white" fillOpacity="0.9" />
            <g transform="translate(140, 80)">
              <rect x="90" y="100" width="20" height="180" rx="10" fill="#5B21B6"/>
              <circle cx="70" cy="280" r="45" fill="#5B21B6"/>
              <path d="M90 100 Q90 80 110 80 L180 60 Q200 54 200 70 L200 80 Q200 96 180 100 L110 120 Q90 124 90 100" fill="#5B21B6"/>
            </g>
            <g transform="translate(280, 200)">
              <path d="M0 0 L60 0 M60 0 L40 -20 M60 0 L40 20" stroke="#5B21B6" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </g>
            <g transform="translate(256, 400)">
              <text x="0" y="10" fontFamily="SF Pro Display, -apple-system, sans-serif" fontSize="66" fontWeight="800" textAnchor="middle" fill="#5B21B6">MP3</text>
            </g>
          </svg>
        </div>
        
        {/* Title */}
        <h1 style={{
          fontSize: '84px',
          fontWeight: '900',
          margin: '0 0 24px',
          letterSpacing: '-2px',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          MP3 Converter
        </h1>
        
        {/* Subtitle */}
        <p style={{
          fontSize: '36px',
          margin: '0 0 56px',
          opacity: 0.95,
          fontWeight: '300'
        }}>
          Convert any media file to MP3 instantly
        </p>
        
        {/* Features */}
        <div style={{
          display: 'flex',
          gap: '48px',
          justifyContent: 'center',
          fontSize: '26px',
          fontWeight: '500'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ✓
            </div>
            <span>100% Free</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ✓
            </div>
            <span>No Upload</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ✓
            </div>
            <span>Fast & Secure</span>
          </div>
        </div>
      </div>
      
      {/* URL */}
      <div style={{
        position: 'absolute',
        bottom: '36px',
        fontSize: '28px',
        opacity: 0.7,
        fontWeight: '500'
      }}>
        mp3.kojin.works
      </div>
    </div>
  );
};

export default OgpImage;