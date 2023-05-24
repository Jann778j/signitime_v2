import Anchor from "./Anchor";

export default function NotLoggedIn() {
  return (
    <>
      <h1>You are not logged in yet.</h1>
      <Anchor href="/">
        <span className="arrow">→</span>Go to log in
      </Anchor>
    </>
  );
}
