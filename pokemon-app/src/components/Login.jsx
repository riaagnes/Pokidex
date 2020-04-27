import React, { useState } from "react";
import { fetchLogin } from "../services";
import messages from "../messages";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const performLogin = () => {
    if (!username) {
      setError(messages.USERNAME_REQUIRED);
      return;
    }
    setError("");
    fetchLogin(username)
      .then((userInfo) => {
        setUsername("");
        onLogin(username);
      })
      .catch((err) => {
        setUsername("");
        setError(messages[err.code || "DEFAULT"]);
      });
  };

  return (
    <div className="login">
      <p className="error">{error}</p>
      <input
        size="40"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter you username"
        value={username}
      />
      {
        <button className="button" onClick={performLogin}>
          Login
        </button>
      }
    </div>
  );
};

export default Login;
