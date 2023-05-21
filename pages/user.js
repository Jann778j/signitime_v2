import Anchor from "@/components/Anchor";
import { format } from "date-fns";

export default function Layout(props) {
  console.log(props.user);
  const createdAt = new Date(props.user.created_at);

  const memberDate = createdAt.toLocaleDateString();

  return (
    <>
      {props.loggedIn ? (
        <div>
          <h1>
            You are logged in as{" "}
            <span className="marked">
              {props.user.first_name} {props.user.last_name}
            </span>{" "}
            ({props.user.initials})
          </h1>
          <p>Member since {memberDate}</p>
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
