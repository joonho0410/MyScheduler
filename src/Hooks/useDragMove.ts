'use client';

import { useState, useEffect } from 'react';

type MousePosition = {
  x: number;
};

const useDragMove = () => {
  const [position, setPosition] = useState<MousePosition>({ x: 0 });
  const [start, setStart] = useState<MousePosition | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    setStart({ x: e.clientX });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !start) return;

    const dist = e.clientX - start.x;
    const nextX = position.x + dist;

    setPosition({ x: nextX });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStart(null);
  };

  // 마우스 이벤트 전역 등록
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, start]);

  return { handleMouseDown, position };
};

export default useDragMove;
