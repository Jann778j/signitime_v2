import { useState, useEffect } from "react";
import SignIn from "@/components/SignIn";
import LoggedIn from "@/components/LoggedIn";
import { createClient } from "@supabase/supabase-js";

export default function LoginPage(props) {
  const [email, setEmail] = useState(""); // State hook til at gemme email-inputtet
  const [password, setPassword] = useState(""); // State hook til at gemme password-inputtet

  const supabaseUrl = "https://npgsxgghhvvsygshumrm.supabase.co/";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZ3N4Z2doaHZ2c3lnc2h1bXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxOTY3ODgsImV4cCI6MTk5ODc3Mjc4OH0.LgnpUXgA5am8PINB41wXA5ffjpBEZeIE1ovMNG5txr8";
  // const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase.from("signitime-users").select(`
          first_name, last_name, password, initials, email, created_at
          `);
      props.setUsers(data);
    }
    getData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    props.users.forEach((user) => {
      if (email === user.email && password === user.password) {
        // Tjekker om email og password matcher en bruger
        props.setLoggedIn(true); // Opdaterer logget-ind status til true
        props.setUser(user); // Opdaterer den aktive bruger
      }
      // } else {
      //   alert("Email: test   |  Password: test ");
      // }
    });
  };

  return (
    <>
      {props.loggedIn ? (
        <LoggedIn
          user={props.user}
          supabaseUrl={supabaseUrl}
          supabaseKey={supabaseKey}
          supabase={supabase}
        /> // Hvis brugeren er logget ind, vises komponenten 'LoggedIn'
      ) : (
        <SignIn
          setPassword={setPassword}
          setEmail={setEmail}
          setLoggedIn={props.setLoggedIn}
          email={email}
          password={password}
          lo
          ggedIn={props.loggedIn}
          handleLogin={handleLogin}
        /> // Hvis brugeren ikke er logget ind, vises komponenten 'SignIn' med relevante props
      )}
    </>
  );
}
