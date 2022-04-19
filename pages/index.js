import Head from "next/head";
import Main from "../pageComponents";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Space Race</title>
        <meta name="Space Race" />
      </Head>
      <Main />
    </div>
  );
}
