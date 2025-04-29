'use client';

import { useState, useEffect } from 'react';

type MousePosition = {
  x: number;
};

const useDragMove = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  timeTableRef: React.RefObject<HTMLDivElement | null>,
) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0 });
  const [start, setStart] = useState<MousePosition | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (ev: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    if (ev instanceof MouseEvent) ev.preventDefault();
    const startX = 'clientX' in ev ? ev.clientX : ev.touches[0].clientX;
    setStart({ x: startX });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !start) return;

    const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const dist = x - start.x;
    let nextX = position.x + dist;

    // 부모 컴포넌트의 크기와 TimeTable의 크기를 기준으로 이동 범위 제한
    if (containerRef.current && timeTableRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const timeTableWidth = timeTableRef.current.offsetWidth;
      const maxLeft = 0; // 최소값: 0
      const minLeft = containerWidth - timeTableWidth; // 최대값: 부모 컴포넌트의 너비 - TimeTable의 너비

      nextX = nextX > maxLeft ? maxLeft : nextX;
      nextX = nextX < minLeft ? minLeft : nextX;

      setPosition({ x: nextX });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStart(null);
  };

  // 이벤트 전역 등록
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, start]);

  return { handleMouseDown, position };
};

export default useDragMove;
