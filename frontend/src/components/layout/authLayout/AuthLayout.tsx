import { useState, useEffect } from "react";
import "./authLayout.css";
import { Cart } from "../cart/Cart";
import { LoginPage } from "../../../pages/login/LoginPage";

export const AuthLayout = () => {
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

  return (
    <div className="authLayout">
      <div className="leftSection">
        <div className="branding-section">
          <div className="logo-circle">Rx</div>
          <h2>ABCDEFGHI</h2>
          <p className="tagline">{taglineText}</p>
        </div>
        <div className="footer-section">
          <p>Add a Footer with a dummy logo</p>
        </div>
      </div>

      <div className="rightSection"></div>

      <div className="cardWrapper">
        <Cart>
          <LoginPage />
        </Cart>
      </div>
    </div>
  );
};
