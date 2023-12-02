import { useState, useEffect } from "react";

const LoadingDots = () => {
    const [dots, setDots] = useState(1);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setDots((prevDots) => (prevDots % 5) + 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return '.'.repeat(dots);
  };

export default LoadingDots;