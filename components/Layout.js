import Head from "next/head";
import Anchor from "./Anchor";
import { format } from "date-fns";

export default function Layout(props) {
  const year = format(new Date(), "yyyy");
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <meta name="robots" content="noindex" />
        <title>SigniTime</title>
      </Head>
      <header>
        <Anchor href="/">
          <img src="logo.svg" className="logo" />
        </Anchor>
        <div className="header-links">
          <Anchor className="user-link" user={props.user} href="/user">
            <p>{props.user.first_name}</p>
            <img src="profile.svg" className="profile" />
          </Anchor>
          <Anchor
            className="calender-link"
            user={props.user}
            supabase={props.supabase}
            href="/calender"
          >
            <img src="calender.svg" className="calender" />
          </Anchor>
        </div>
      </header>
      <main>{props.children}</main>
      <footer className="footer">
        <p>{year}</p>
        <img src="radish.svg" />
      </footer>
    </>
  );
}
