import { hover } from 'framer-motion';
import React, { useState } from 'react';

const DropdownMenu = () => {
  // 1. Initialize state (false = closed by default)
  const [isOpen, setIsOpen] = useState(false);

  // 2. Toggle function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown" style={{ position: 'relative', display: 'inline-block' }}>
      {/* 3. Button triggers the toggle */}
      <button onClick={toggleMenu} className="dropbtn text-black text-lg hover:cursor-pointer">
        Menu {isOpen ? '▴' : '▾'}
      </button>

      {/* 4. Conditional Rendering (Short-circuit &&) */}
      {isOpen && (
        <div className="dropdown-content rounded-lg mt-4" style={dropdownStyles}>
          <a href="/" className="block border-b border-white/20 hover:bg-gray-700 rounded-md hover:border hover:border-white" style={linkStyles}>MyPalette</a>
          <a href="/" className="block border-b border-white/20 hover:bg-gray-700 rounded-md hover:border hover:border-white" style={linkStyles}>Log Out</a>
        </div>
      )}
    </div>
  );
};

// Inline Styles for simplicity
const dropdownStyles = {
  position: 'absolute',
  backgroundColor: '#000000',
  minWidth: '10px',
  boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column'
};

const linkStyles = {
  color: '#ffffff',
  padding: '12px 16px',
  textDecoration: 'none',
};

export default DropdownMenu;
