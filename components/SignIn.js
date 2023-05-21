export default function SignIn(props) {
  return (
    <div className="signin">
      <div className="form-wrapper">
        <div className="logo">
          <img src="logo.svg"></img>
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
