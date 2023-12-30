import React, { useState, useRef, useEffect } from 'react';
import './App.css'

const data = [
  'Lorem ipsum dolor sit amet,  elitconsectetur adipiscing elitconsectetur adipiscing elitconsectetur adipiscing elit',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.',
  'Fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
];

const TwoColumnGrid = () => {
  const [secondCellMarginTop, setSecondCellMarginTop] = useState('')
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '86px',
  };

  const cellStyle = {
    backgroundColor: '#e0e0e0',
    padding: '36px',
    width: "300px",
    border: '1px solid #ccc',
    overflow: 'hidden',
  };

  const firstCellRef = useRef();

  useEffect(() => {
    const firstCellHeight = firstCellRef.current.clientHeight;
    setSecondCellMarginTop(`${firstCellHeight / 2}px`);
  }, []);

  return (
    <div style={gridContainerStyle}>
      {data.map((text, index) => (
        <div key={index} ref={index === 0 ? firstCellRef : null} style={{ ...cellStyle, gridRow: index === 0 ? 'span 1' : 'span 2', marginTop: index === 1 ? secondCellMarginTop : '' }}>
          {text}
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <div className='App'>
      <TwoColumnGrid />
    </div>
  );
}


export default App
