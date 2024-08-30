import React, { useState, useEffect } from 'react';

const LandingScreen = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [binaryCode, setBinaryCode] = useState('');
  const [canClose, setCanClose] = useState(false);
  const [isWiping, setIsWiping] = useState(false);
  const [intervalTime, setIntervalTime] = useState(200); // Start slow

  useEffect(() => {
    // Disable scrolling when the landing screen is active
    document.body.style.overflow = showLanding ? 'hidden' : '';

    // Start the wipe effect after 4 seconds
    const wipeTimer = setTimeout(() => {
      setIsWiping(true);
      setTimeout(() => {
        setShowLanding(false);
        document.body.style.overflow = ''; // Re-enable scrolling when hidden
      }, 2000); // Hide after wipe animation completes
    }, 2000);

    // Allow closing after 3 seconds
    const closeTimer = setTimeout(() => setCanClose(true), 2000);

    // Generate binary code with dynamic speed-up
    const generateBinary = () => {
      const newBinary = Array(200)
        .fill(0)
        .map(() => Math.round(Math.random()))
        .join('');
      setBinaryCode((prevCode) => (prevCode + newBinary).slice(-5000)); // Keep the last 5000 characters
    };

    const binaryInterval = setInterval(() => {
      generateBinary();
      setIntervalTime((prev) => (prev > 50 ? prev - 10 : 50)); // Speed up gradually
    }, intervalTime);

    return () => {
      clearTimeout(wipeTimer);
      clearTimeout(closeTimer);
      clearInterval(binaryInterval);
      document.body.style.overflow = ''; // Ensure scrolling is enabled if component unmounts
    };
  }, [showLanding, intervalTime]);

  const handleClick = () => {
    if (canClose) {
      setIsWiping(true);
      setTimeout(() => {
        setShowLanding(false);
        document.body.style.overflow = ''; // Re-enable scrolling when hidden
      }, 1000); // Trigger wipe on click if allowed
    }
  };

  if (!showLanding) return null;

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        opacity: showLanding ? 1 : 0,
        transition: 'opacity 2s ease-out',
        fontFamily: '"Courier New", Courier, monospace',
        animation: isWiping ? 'wipeUp 1.5s forwards' : '',
        zIndex: 9999, // Ensures the landing screen is above all other elements
      }}
    >
      <div
        style={{
          padding: '1rem',
          border: '2px solid #00ff00',
          textAlign: 'center',
          backgroundColor: 'black',
        }}
      >
        <h1 style={{ fontSize: '3rem', margin: 0, color: '#00ff00' }}>DP Hacks</h1>
        <h2 style={{ fontSize: '1.5rem', margin: '0.5rem 0 0 0', color: '#00ff00' }}>
          The Daily Pennsylvanian's Hackathon
        </h2>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          color: '#00ff00',
          fontSize: '1.5rem',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          animation: 'rise 10s linear infinite',
        }}
      >
        {binaryCode}
      </div>
      <style>
        {`
          @keyframes rise {
            from { transform: translateY(100%); }
            to { transform: translateY(-100%); }
          }

          @keyframes wipeUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100%); }
          }
        `}
      </style>
    </div>
  );
};

export default LandingScreen;
