import { format } from "date-fns";
import NotLoggedIn from "@/components/NotLoggedIn";

export default function User(props) {
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
          <p>
            Member since {format(props.user.created_at, "do 'of' MMM',' Y")}
          </p>
        </div>
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
}
