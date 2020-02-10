import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SearchBar from "../search_bar";
import Logo from "../../assets/images/zipiwisk-logo.png";
import userLogo from "../../assets/images/profileLogo.png";

import "./home-header_desktop.scss";
//onClick={() => window.location.reload()}
const HeaderDesktop = ({ isAuth, user_img, children }) => {
  return (
    <header className="header-d">
      <Link to="/" className="header-d__logo">
        <img src={Logo} alt="zipiwisk logo" />
      </Link>

      <SearchBar />

      <div className="auth-btns">
        {!isAuth ? (
          <>
            <Link className="auth-btns__login" to="/auth/login">
              Login
            </Link>
            <Link className="auth-btns__signup" to="/auth/signup">
              Signup free
            </Link>
          </>
        ) : null}

        {isAuth ? (
          <>
            <Link
              to="/"
              onClick={() => window.location.reload()}
              className="auth-btns__home"
            >
              Home
            </Link>
            <Link to="/profile/create-recipe" className="auth-btns__create">
              Create Recipe
            </Link>
            <Link to="/profile" className="auth-btns__profile">
              <img src={user_img || userLogo} alt="user profile" />
            </Link>
          </>
        ) : null}
      </div>
      {children}
    </header>
  );
};

HeaderDesktop.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  user_img: PropTypes.string
};

export default HeaderDesktop;
