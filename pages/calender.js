import Anchor from "@/components/Anchor";
import { useEffect, useState } from "react";

export default function User(props) {
  const [workingTables, setWorkingTables] = useState([]);
  console.log(props);
  //   useEffect(() => {
  //     async function getData() {
  //       const { data, error } = await props.supabase.from("signitime-logs")
  //         .select(`
  //               hours,
  //               initials,
  //               client_name,
  //               project_name,
  //               created_at
  //               `);
  //       setWorkingTables(data);
  //       console.log(workingTables);
  //     }
  //     getData();
  //   }, []);

  return (
    <>
      {props.loggedIn ? (
        <div>
          <h1>Here is your overview, {props.user.first_name}</h1>
        </div>
      ) : (
        <>
          <h1>You are not logged in yet.</h1>
          <Anchor href="/">Go to log in</Anchor>
        </>
      )}
    </>
  );
}
