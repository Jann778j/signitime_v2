import Layout from "../components/Layout";
import "../src/styles/main.scss";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function App({ Component, pageProps }) {
  const test = "Is this being passed on?";
  const [users, setUsers] = useState([]); // State hook til at gemme brugerdata
  const [loggedIn, setLoggedIn] = useState(false); // State hook til at angive, om brugeren er logget ind eller ej
  const [user, setUser] = useState({}); // State hook til at gemme den aktive bruger

  const supabaseUrl = "https://npgsxgghhvvsygshumrm.supabase.co/";
  const supabaseKey = process.env.NEXT_PUBLIC_REACT_APP_VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  return (
    <>
      <Layout supabase={supabase} loggedIn={loggedIn} user={user}>
        <Component
          supabase={supabase}
          supabaseKey={supabaseKey}
          supabaseUrl={supabaseUrl}
          user={user}
          setUser={setUser}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setUsers={setUsers}
          users={users}
          test={test}
          {...pageProps}
        />
      </Layout>
    </>
  );
}
