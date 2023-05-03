import { useState } from "react";
import SignIn from "@/components/SignIn";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform validation here and check credentials with a database or API
    if (email === "test@test.com" && password === "password") {
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  // if (loggedIn) {
  //   return (
  //     <div>
  //       <h1>You are logged in!</h1>
  //       <button onClick={handleLogout}>Logout</button>
  //     </div>
  //   );
  // }

  return (
    <SignIn
      setPassword={setPassword}
      setEmail={setEmail}
      setLoggedIn={setLoggedIn}
      email={email}
      password={password}
      loggedIn={loggedIn}
    />
  );
}
