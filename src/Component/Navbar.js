import React from "react";
import "../assets/css/navbar.css";

export const Navbar = () => {
  return (
    <nav
      data-cy="header-background"
      className="d-flex align-items-center bg-primary light justify-content-center"
    >
      <div className="navbar">
        <h1 data-cy="header-title" className="font-m">
          TO DO LIST APP
        </h1>
      </div>
    </nav>
  );
};
