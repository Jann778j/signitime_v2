import { useState, useEffect } from "react";
import SignIn from "@/components/SignIn";
import LoggedIn from "@/components/LoggedIn";
import { createClient } from "@supabase/supabase-js";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // State hook til at gemme email-inputtet
  const [users, setUsers] = useState([]); // State hook til at gemme brugerdata
  const [user, setUser] = useState({}); // State hook til at gemme den aktive bruger
  const [password, setPassword] = useState(""); // State hook til at gemme password-inputtet
  const [loggedIn, setLoggedIn] = useState(false); // State hook til at angive, om brugeren er logget ind eller ej

  const supabaseUrl = "https://npgsxgghhvvsygshumrm.supabase.co/";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZ3N4Z2doaHZ2c3lnc2h1bXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxOTY3ODgsImV4cCI6MTk5ODc3Mjc4OH0.LgnpUXgA5am8PINB41wXA5ffjpBEZeIE1ovMNG5txr8";
  // const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase.from("signitime-users").select(`
          first_name, last_name, password, initials, email
          `);
      setUsers(data);
    }
    getData();
  }, []);

  // console.log(users);
  // useEffect(() => {
  //   async function getUserData() {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         // API-nøgle til at tilgå brugerdata
  //         // Adgangstoken til at autentificere API-anmodninger
  //         apikey:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZ3N4Z2doaHZ2c3lnc2h1bXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxOTY3ODgsImV4cCI6MTk5ODc3Mjc4OH0.LgnpUXgA5am8PINB41wXA5ffjpBEZeIE1ovMNG5txr8",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZ3N4Z2doaHZ2c3lnc2h1bXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxOTY3ODgsImV4cCI6MTk5ODc3Mjc4OH0.LgnpUXgA5am8PINB41wXA5ffjpBEZeIE1ovMNG5txr8",
  //       },
  //     };
  //     // API-endepunktet til at hente brugerdata
  //     const res = fetch(
  //       "https://npgsxgghhvvsygshumrm.supabase.co/rest/v1/signitime-users",
  //       options
  //     );

  //     const data = await (await res).json(); // Konverterer svaret fra API'en til JSON-format
  //     setUsers(data); // Opdaterer brugerdata i state
  //   }
  //   getUserData();
  // }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    users.forEach((user) => {
      if (email === user.email && password === user.password) {
        // Tjekker om email og password matcher en bruger
        setLoggedIn(true); // Opdaterer logget-ind status til true
        setUser(user); // Opdaterer den aktive bruger
        console.log(user); // Udskriver brugeroplysningerne i konsollen
      }
    });
  };

  return (
    <>
      {loggedIn ? (
        <LoggedIn
          user={user}
          supabaseUrl={supabaseUrl}
          supabaseKey={supabaseKey}
          supabase={supabase}
        /> // Hvis brugeren er logget ind, vises komponenten 'LoggedIn'
      ) : (
        <SignIn
          setPassword={setPassword}
          setEmail={setEmail}
          setLoggedIn={setLoggedIn}
          email={email}
          password={password}
          loggedIn={loggedIn}
          handleLogin={handleLogin}
        /> // Hvis brugeren ikke er logget ind, vises komponenten 'SignIn' med relevante props
      )}
    </>
  );
}
