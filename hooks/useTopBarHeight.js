import { useState, useEffect } from 'react';

function useTopBarHeight() {
  const [topBarHeight, setTopBarHeight] = useState(0);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    const controlHeight = document.createElement('div');
    controlHeight.id = 'control-height';
    controlHeight.className = 'absolute w-0 h-screen';
    document.body.appendChild(controlHeight);
    setTopBarHeight(window.innerHeight - controlHeight.clientHeight);
    document.body.removeChild(controlHeight);
  }, []);

  return topBarHeight;
}

export default useTopBarHeight;
