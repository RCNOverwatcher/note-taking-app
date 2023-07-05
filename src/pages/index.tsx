import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Note App</title>
        <meta name="description" content="note app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-6xl font-bold text-white">
          Welcome to my note taking app
        </h1>
        <Link
          href="/notes"
          className="mt-10 text-4xl font-bold text-white hover:text-gray-300"
        >
          View Notes
        </Link>
      </main>
    </>
  );
}
