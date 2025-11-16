import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <h1 className="text-6xl font-bold text-black">
          Welcome to Dashboard
        </h1>
      </div>
    </>
  );
}
