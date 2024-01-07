import Head from "next/head";
import ResizableComponent from "../../common/resizablebutton";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Next.js example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "orange",
        }}
      >
        <ResizableComponent />
      </div>
    </div>
  );
}
