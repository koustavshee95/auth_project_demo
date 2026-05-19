import { useEffect, useState } from "react";
import "./textRotator.css";

export const TextRotator = () => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const taglineText = showText
    ? '"Insert something and toggle it"'
    : '"Another dummy text here"';

  return <p className="tagline">{taglineText}</p>;
};
