import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const data = [
  'Lorem ipsum dolor sit amet, elitconsectetur adipiscing elitconsectetur adipiscing elitconsectetur adipiscing elit',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.',
  'Fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
];

const TwoColumnGrid = () => {
  const [secondCellMarginTop, setSecondCellMarginTop] = useState('');
  const [gridRect, setGridRect] = useState([]);
  const [cellsRect, setCellsRect] = useState([]);

  const gridRef = useRef(null);

  useEffect(() => {
    const calculateRects = () => {
      const newGridRect = gridRef.current.getBoundingClientRect();
      setGridRect(newGridRect);

      const firstCellHeight = gridRef.current.children[1].clientHeight;
      setSecondCellMarginTop(`${firstCellHeight / 2}px`);

      const rect = Array.from(gridRef.current.children).map((child) =>
        child.getBoundingClientRect()
      );
      setCellsRect(rect);
    };

    calculateRects();

    window.addEventListener('resize', calculateRects);

    return () => {
      window.removeEventListener('resize', calculateRects);
    };
  }, [gridRef]);

  const createLine = (startY, endX) => (
    <path
      d={`M${endX}, ${startY}H300`}
      key={`line${startY}`}
      stroke="#635BE6"
      strokeWidth="4"
      strokeDasharray="8 8"
    />
  );

  const createPath = (startY, midY, endX) => (
    <path
      d={`M${endX} ${midY}H150v50`}
      key={`path${startY}`}
      stroke="#635BE6"
      strokeWidth="4"
      strokeDasharray="8 8"
    />
  );

  const lines = cellsRect.flatMap((_, index) => {
    if (index % 2 === 0 && index > 0 && index <= cellsRect.length - 1) {
      const startY =
        cellsRect[index].top +
        (cellsRect[index - 1].bottom - cellsRect[index].top) / 2 -
        gridRect.top;
      const endX = cellsRect[index].left - gridRect.left;
      return createLine(startY, endX);
    }
    return [];
  });

  const paths = cellsRect.flatMap((_, index) => {
    if (index % 2 === 0 && index > 0 && index < cellsRect.length - 2) {
      const startY =
        cellsRect[index].top +
        (cellsRect[index - 1].bottom - cellsRect[index].top) / 2 -
        gridRect.top;
      const midY =
        cellsRect[index - 1].bottom +
        (cellsRect[index + 1].top - cellsRect[index - 1].bottom) / 2 -
        gridRect.top;
      const endX = cellsRect[index].left - gridRect.left;
      return createPath(startY, midY, endX);
    }
    return [];
  });

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '86px',
    position: 'relative',
  };

  const cellStyle = {
    backgroundColor: '#e0e0e0',
    padding: '36px',
    width: '300px',
    border: '1px solid #ccc',
    overflow: 'hidden',
  };

  return (
    <div ref={gridRef} style={gridContainerStyle}>
      <svg
        style={{
          position: 'absolute',
          zIndex: -1,
        }}
        width="100%"
        height="100%"
        fill="none"
      >
        {lines}
        {paths}
      </svg>
      {data.map((text, index) => (
        <div
          key={index}
          style={{
            ...cellStyle,
            gridRow: index === 0 ? 'span 1' : 'span 2',
            marginTop: index === 1 ? secondCellMarginTop : '',
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

function Section() {
  return (
    <div className="App">
      <TwoColumnGrid />
    </div>
  );
}

export default Section;
