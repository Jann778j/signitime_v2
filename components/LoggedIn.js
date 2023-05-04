export default function LoggedIn(props) {
  console.log(props.handleLogin);

  return (
    <>
      <div>
        <h1>You are logged in!</h1>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>
    </>
  );
}
