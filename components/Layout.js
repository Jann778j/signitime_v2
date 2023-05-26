import Head from "next/head";
import Anchor from "./Anchor";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function Layout(props) {
  const [logo, setLogo] = useState("");
  const [calender, setCalender] = useState("");
  const [profile, setProfile] = useState("");
  const [footerGraphic, setFooterGraphic] = useState("");

  const year = format(new Date(), "yyyy");

  useEffect(() => {
    const theme = localStorage.getItem("data-theme");

    if (theme === "dark") {
      changeThemeToDark();
    } else {
      changeThemeToLight();
    }
  }, []);

  const changeThemeToDark = () => {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("data-theme", "dark");
    setLogo("logo-dark.svg");
    setCalender("calender-dark.svg");
    setProfile("profile-dark.svg");
    setFooterGraphic("radish-dark.svg");
  };

  const changeThemeToLight = () => {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("data-theme", "light");
    setLogo("logo.svg");
    setCalender("calender.svg");
    setProfile("profile.svg");
    setFooterGraphic("radish.svg");
  };

  const handleCheckboxChange = () => {
    const theme = localStorage.getItem("data-theme");

    if (theme === "dark") {
      changeThemeToLight();
    } else {
      changeThemeToDark();
    }
  };

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <meta name="robots" content="noindex" />
        <title>SigniTime</title>
      </Head>
      <header>
        <Anchor href="/">
          <img alt={logo} src={logo} className="logo" />
        </Anchor>
        <div className="header-links">
          <Anchor className="user-link" user={props.user} href="/user">
            {/* <p>{props.user.first_name}</p> */}
            <img src={profile} alt={profile} className="profile" />
          </Anchor>
          <Anchor
            className="calender-link"
            user={props.user}
            supabase={props.supabase}
            href="/calender"
          >
            <img src={calender} alt={calender} className="calender" />
          </Anchor>
          <div className="toggle-container">
            <input
              type="checkbox"
              id="switch"
              name="theme"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="switch">Toggle</label>
          </div>
        </div>
      </header>
      <main>{props.children}</main>
      <footer className="footer">
        <p>{year}</p>
        <img src={footerGraphic} />
      </footer>
    </>
  );
}
