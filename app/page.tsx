import Link from "next/link";

export default function Home() {
  return (
      <div className={"flex-grow flex flex-col"}>
        <div className={"flex-grow flex flex-col items-center justify-center"}>
            <p>test</p>
            <Link href="/dashboard">Dashboard Link</Link>
        </div>
      </div>
  );
}
