import { useState, useEffect } from "react";
import SignIn from "@/components/SignIn";
import LoggedIn from "@/components/LoggedIn";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getUserData() {
      const options = {
        method: "GET",
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZ3N4Z2doaHZ2c3lnc2h1bXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxOTY3ODgsImV4cCI6MTk5ODc3Mjc4OH0.LgnpUXgA5am8PINB41wXA5ffjpBEZeIE1ovMNG5txr8",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZ3N4Z2doaHZ2c3lnc2h1bXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxOTY3ODgsImV4cCI6MTk5ODc3Mjc4OH0.LgnpUXgA5am8PINB41wXA5ffjpBEZeIE1ovMNG5txr8",
        },
      };

      const res = fetch(
        "https://npgsxgghhvvsygshumrm.supabase.co/rest/v1/signitime-users",
        options
      );

      const data = await (await res).json();
      setUsers(data);
    }
    getUserData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    users.forEach((user) => {
      if (email === user.email && password === user.password) {
        setLoggedIn(true);
        setUser(user);
        console.log(user);
      }
    });
  };

  return (
    <>
      {loggedIn ? (
        <LoggedIn user={user} />
      ) : (
        <SignIn
          setPassword={setPassword}
          setEmail={setEmail}
          setLoggedIn={setLoggedIn}
          email={email}
          password={password}
          loggedIn={loggedIn}
          handleLogin={handleLogin}
        />
      )}
    </>
  );
}
