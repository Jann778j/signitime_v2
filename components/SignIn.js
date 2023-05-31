import { useEffect, useState } from "react";
export default function SignIn(props) {
  const [logo, setLogo] = useState(""); // Opretter en logo-variabel og en setLogo-funktion ved hjælp af useState

  useEffect(() => {
    const theme = localStorage.getItem("data-theme"); // Henter temaet fra localStorage

    if (theme === "dark") {
      setLogo("logo-dark.svg"); // Hvis temaet er "dark", sættes logoet til "logo-dark.svg"
    } else {
      setLogo("logo.svg"); // Ellers sættes logoet til "logo.svg"
    }
  }, []);

  const handleForgotPassword = () => {
    alert(
      "Email: jofh@kea.dk  |  Password: kea \nEmail: censor@kea.dk  |  Password: kea"
    ); // Viser en alert med prøve-e-mail og -adgangskode
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
              className="rounded-corners dark-mode"
              type="email"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)} // Opdaterer e-mail ved ændring
            />
          </label>
          <label>
            Password
            <input
              className="rounded-corners dark-mode"
              type="password"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)} // Opdaterer password ved ændring
            />
          </label>
          <p className="invalid">Invalid email or password</p>
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
