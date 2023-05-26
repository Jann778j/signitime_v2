import { useEffect, useState } from "react";
export default function SignIn(props) {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("data-theme");

    if (theme === "dark") {
      setLogo("logo-dark.svg");
    } else {
      setLogo("logo.svg");
    }
  }, []);

  const handleForgotPassword = () => {
    alert("Email: th@signifly.com  |  Password: signifly");
  };

  return (
    <div className="signin">
      <div className="form-wrapper">
        <div className="logo">
          <img alt={logo} src={logo}></img>
        </div>
        <form className="signin-form" onSubmit={props.handleLogin}>
          <label>
            Email
            <input
              className="rounded-corners"
              type="email"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)} // Opdaterer e-mail ved ændring
            />
          </label>
          <label>
            Password
            <input
              className="rounded-corners"
              type="password"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)} // Opdaterer password ved ændring
            />
          </label>
          <a onClick={handleForgotPassword}>Forgot your password?</a>
          <button
            onClick={props.handleLogin}
            className="signin-btn rounded-corners"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
