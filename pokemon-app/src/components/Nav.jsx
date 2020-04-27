import React from "react";
import { fetchLogout } from "../services";

const Nav = ({ user, onLogout }) => {
  const logout = () => {
    fetchLogout().then(() => onLogout());
  };
  return (
    <ul className="nav">
      <h1>POKIDEX</h1>
      {user.isLoggedIn && (
        <li className="logout action" onClick={logout}>
          Logout
        </li>
      )}
    </ul>
  );
};

export default Nav;
