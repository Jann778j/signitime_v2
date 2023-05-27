import { useState, useEffect } from "react";
import SignIn from "@/components/SignIn";
import LoggedIn from "@/components/LoggedIn";
import { parseISO } from "date-fns";

export default function LoginPage(props) {
  const [email, setEmail] = useState(""); // State hook til at gemme email-inputtet
  const [password, setPassword] = useState(""); // State hook til at gemme password-inputtet

  useEffect(() => {
    async function getData() {
      const { data, error } = await props.supabase.from("signitime-users")
        .select(`
          first_name, last_name, password, initials, email, created_at
          `);

      const logsWithParsedDates = data.map((item) => ({
        ...item,
        created_at: parseISO(item.created_at),
      }));
      props.setUsers(logsWithParsedDates);
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
    });
  };

  return (
    <>
      {props.loggedIn ? (
        <LoggedIn
          user={props.user}
          supabaseUrl={props.supabaseUrl}
          supabaseKey={props.supabaseKey}
          supabase={props.supabase}
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
