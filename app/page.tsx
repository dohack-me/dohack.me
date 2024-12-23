import Link from "next/link";

export default function Home() {
  return (
      <div className={"w-full h-full flex flex-col"}>
        <div className={"min-h-screen flex flex-col items-center justify-center"}>
            <p>test</p>
            <Link href="/dashboard">Dashboard Link</Link>
        </div>
      </div>
  );
}
