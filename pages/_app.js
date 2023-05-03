// import "@/styles/globals.css";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  console.log("hey jan");

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
