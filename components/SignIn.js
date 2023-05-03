//takes children meaning that it takes content from our pages
export default function SignIn(props) {
  // const [openMenu, setOpenMenu] = useState(false);

  //Ved toggle menu ændres state
  // const toggleMenu = () => {
  //   setOpenMenu(!openMenu);
  // };

  return (
    <>
      <div className="form-wrapper">
        <div className="logo">SIGNITIME</div>
        <form className="signin-form" onSubmit={props.handleLogin}>
          <label>
            Email
            <input
              className="rounded-corners"
              type="email"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              className="rounded-corners"
              type="password"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
