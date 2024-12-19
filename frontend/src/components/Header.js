import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../Hook/useAuthContext";
import useFoodContext from "../Hook/useFoodContext";

const Header = () => {
  const { user, dispatch } = useAuthContext();
  
  const handleClick = () => {
    // remove from localStorage
    localStorage.removeItem("user");

    // dispatch func to logout
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>
            Food <span>Tracker</span>
          </h1>
        </Link>
        <nav>
          {!user && (
            <>
              <Link to="/login">
                <button > Login</button>
              </Link>
              <Link to="/signup">
                <button > Sign up</button>
              </Link>
            </>
          )}

          {user && (
            <>
              <span>{user.email}</span>
              <button onClick={handleClick} className="logout">
                Log Out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
