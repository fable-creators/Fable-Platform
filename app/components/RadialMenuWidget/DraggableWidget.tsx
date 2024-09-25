"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import RadialMenu from '../RadialMenuWidget/RadialMenu';

interface DraggableWidgetProps {
  isVisible: boolean;
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({ isVisible, position, setPosition }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setShowMenu(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setShowMenu(false);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && widgetRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.width / 2,
        y: e.clientY - rect.height / 2,
      });
    }
  }, [isDragging, setPosition]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && widgetRef.current && e.touches.length > 0) {
      const rect = widgetRef.current.getBoundingClientRect();
      setPosition({
        x: e.touches[0].clientX - rect.width / 2,
        y: e.touches[0].clientY - rect.height / 2,
      });
    }
  }, [isDragging, setPosition]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleClick = useCallback(() => {
    if (!isDragging) {
      setShowMenu(!showMenu);
    }
  }, [isDragging, showMenu]);

  const buttons = [
    { name: 'Home', icon: '🏠', onClick: () => console.log('Home clicked') },
    { name: 'Games', icon: '🎮', onClick: () => console.log('Games clicked') },
    { name: 'Marketplace', icon: '🛒', onClick: () => console.log('Marketplace clicked') },
    { name: 'Library', icon: '📚', onClick: () => console.log('Library clicked') },
  ];

  return (
    <>
      {isVisible && (
        <div
          ref={widgetRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={handleClick}
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 50,
            width: '40px',
            height: '40px',
            borderRadius: '9999px',
            backgroundColor: 'var(--coffee)',
            color: 'var(--sand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'move',
            userSelect: 'none',
            transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
            transform: isVisible ? 'scale(1)' : 'scale(0)',
            opacity: isVisible ? 1 : 0,
          }}
        >
          •••
        </div>
      )}
      {showMenu && (
        <RadialMenu
          buttons={buttons}
          position={position}
          onClose={() => setShowMenu(false)}
          onCustomize={() => console.log('Customize clicked')}
        />
      )}
    </>
  );
};

export default DraggableWidget;