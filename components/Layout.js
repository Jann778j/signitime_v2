import Head from "next/head";
import Anchor from "./Anchor";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function Layout(props) {
  const [logo, setLogo] = useState(""); // Tilstand til logo-billede
  const [calender, setCalender] = useState(""); // Tilstand til kalender-billede
  const [profile, setProfile] = useState(""); // Tilstand til profil-billede
  const [footerGraphic, setFooterGraphic] = useState(""); // Tilstand til fodgrafik-billede

  const year = format(new Date(), "yyyy"); // Henter det aktuelle år

  //sprøg efter hvilket tema der er valgt - darkmode eller ej
  useEffect(() => {
    const theme = localStorage.getItem("data-theme");

    if (theme === "dark") {
      changeThemeToDark();
    } else {
      changeThemeToLight();
    }
  }, []);

  const changeThemeToDark = () => {
    document.documentElement.setAttribute("data-theme", "dark"); // Opdaterer temaattributten for dokumentelementet til "dark"
    localStorage.setItem("data-theme", "dark"); // Gemmer temaet "dark" i local storage
    setLogo("logo-dark.svg"); // Opdaterer logo-billede til mørkt tema
    setCalender("calender-dark.svg"); // Opdaterer kalender-billede til mørkt tema
    setProfile("profile-dark.svg"); // Opdaterer profil-billede til mørkt tema
    setFooterGraphic("radish-dark.svg"); // Opdaterer fodgrafik-billede til mørkt tema
  };

  const changeThemeToLight = () => {
    document.documentElement.setAttribute("data-theme", "light"); // Opdaterer temaattributten for dokumentelementet til "light"
    localStorage.setItem("data-theme", "light"); // Gemmer temaet "light" i local storage
    setLogo("logo.svg"); // Opdaterer logo-billede til lyst tema
    setCalender("calender.svg"); // Opdaterer kalender-billede til lyst tema
    setProfile("profile.svg"); // Opdaterer profil-billede til lyst tema
    setFooterGraphic("radish.svg"); // Opdaterer fodgrafik-billede til lyst tema
  };

  // vores darkmode checkbox/switch - function bliver kørt ved tryk på knappen
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
        <meta
          name="viewport" // Angiver viewport-indstillinger så den ikke zoomer når man fx trykker på et text field
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
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
              className="dark-mode"
              type="checkbox"
              id="switch"
              name="theme"
              onChange={handleCheckboxChange} // Kalder handleCheckboxChange-funktionen ved ændring
            />
            <label htmlFor="switch">Toggle</label>
          </div>
        </div>
      </header>
      <main>{props.children}</main>// Viser hovedindholdet
      <footer className="footer">
        <p>{year}</p>
        <img src={footerGraphic} alt={footerGraphic} />
        // Viser fodgrafik-billede
      </footer>
    </>
  );
}
