import Layout from "../components/Layout";
import "../src/styles/main.scss";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const test = "Is this being passed on?";
  const [users, setUsers] = useState([]); // State hook til at gemme brugerdata
  const [loggedIn, setLoggedIn] = useState(false); // State hook til at angive, om brugeren er logget ind eller ej
  const [user, setUser] = useState({}); // State hook til at gemme den aktive bruger

  return (
    <>
      <Layout loggedIn={loggedIn} user={user}>
        <Component
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
