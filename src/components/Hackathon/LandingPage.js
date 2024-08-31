import React, { useState, useEffect, useCallback } from 'react';

const LandingScreen = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [binaryCode, setBinaryCode] = useState('');
  const [canClose, setCanClose] = useState(false);
  const [isWiping, setIsWiping] = useState(false);

  const generateBinary = useCallback(() => {
    const newBinary = Array(200)
      .fill(0)
      .map(() => Math.round(Math.random()))
      .join('');
    setBinaryCode((prevCode) => (prevCode + newBinary).slice(-5000));
  }, []);

  useEffect(() => {
    if (!showLanding) return;

    document.body.style.overflow = 'hidden';
    
    const wipeTimer = setTimeout(() => {
      setIsWiping(true);
      setTimeout(() => setShowLanding(false), 1500);
    }, 2000);

    const closeTimer = setTimeout(() => setCanClose(true), 1500);

    let binaryInterval = setInterval(generateBinary, 50);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(wipeTimer);
      clearTimeout(closeTimer);
      clearInterval(binaryInterval);
    };
  }, [showLanding, generateBinary]);

  const handleClick = useCallback(() => {
    if (canClose) {
      setIsWiping(true);
      setTimeout(() => setShowLanding(false), 1000);
    }
  }, [canClose]);

  if (!showLanding) return null;

  return (
    <div
      onClick={handleClick}
      className="landing-screen"
      style={{
        opacity: showLanding ? 1 : 0,
        animation: isWiping ? 'wipeUp 1.5s forwards' : '',
      }}
    >
      <div className="content">
        <h1>DP Hacks</h1>
        <h2>The Daily Pennsylvanian's Hackathon</h2>
      </div>
      <div className="binary-code">{binaryCode}</div>
      <style jsx>{`
        .landing-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: black;
          color: #00ff00;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
          transition: opacity 2s ease-out;
          font-family: "Courier New", Courier, monospace;
          z-index: 9999;
        }
        .content {
          padding: 1rem;
          border: 2px solid #00ff00;
          text-align: center;
          background-color: black;
        }
        h1 {
          font-size: 3rem;
          margin: 0;
        }
        h2 {
          font-size: 1.5rem;
          margin: 0.5rem 0 0 0;
        }
        .binary-code {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          font-size: 1.5rem;
          white-space: pre-wrap;
          word-break: break-all;
          animation: rise 10s linear infinite;
        }
        @keyframes rise {
          from { transform: translateY(100%); }
          to { transform: translateY(-100%); }
        }
        @keyframes wipeUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        @media (max-width: 768px) {
          h1 { font-size: 2rem; }
          h2 { font-size: 1rem; }
          .binary-code { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default LandingScreen;