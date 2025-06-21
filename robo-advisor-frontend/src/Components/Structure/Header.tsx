import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, []);

  return (
    <header className="header">
      <span>Hello, {username}</span>
      <button className="logout-button" onClick={() => {
        localStorage.removeItem("username");
        navigate("/login");
      }}>
        Logout
      </button>
    </header>
  );
};
