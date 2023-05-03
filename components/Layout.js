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
        <title>SigniTime</title>
      </Head>
      <header>
        <div className="logo">SigniTime</div>
      </header>
      <main>{props.children}</main>
      <footer className="footer"></footer>
    </>
  );
}
