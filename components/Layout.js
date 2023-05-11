import Head from "next/head";

//takes children meaning that it takes content from our pages
export default function Layout(props) {
  // const [openMenu, setOpenMenu] = useState(false);

  //Ved toggle menu ændres state
  // const toggleMenu = () => {
  //   setOpenMenu(!openMenu);
  // };

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <meta name="robots" content="noindex" />
        <title>SigniTime</title>
      </Head>
      <header>
        <img src="logo.svg" className="logo" />
      </header>
      <main>{props.children}</main>
      <footer className="footer"></footer>
    </>
  );
}
