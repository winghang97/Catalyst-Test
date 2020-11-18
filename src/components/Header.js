import React from "react";

const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="navbar-brand">
        <a href="/">THE LOGO</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              About Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Header;
