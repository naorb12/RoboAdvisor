import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

type HeaderProps = {
  onHomeClick?: () => void;
  disableHomeButton?: Boolean;
};

export const Header: React.FC<HeaderProps> = ({ onHomeClick, disableHomeButton = false }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, []);

  return (
    <header className="header">
      <button
        type="button"
        className="home-button"
        style={{ padding: 0, background: "none", border: "none" }}
        onClick={() => {
          if (disableHomeButton) return;
          if (onHomeClick) onHomeClick();
          else navigate("/quiz");
        }}
      >
        <img
          src="/robo-advisor-logo.jpg"
          alt="Home"
          style={{
            width: 70,
            height: 70,
            display: "block",
          }}
        />
      </button>
      <span>Hello, {username}</span>
      <button
        type="button"
        className="logout-button"
        onClick={() => {
          localStorage.removeItem("username");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </header>
  );
};
