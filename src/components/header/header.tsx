import Link from "next/link";
import "./layout.css";

export function Header() {
  return (
    <header className="header">
      <h1>Next - Movies</h1>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/login"}>Login</Link>
      </nav>
    </header>
  );
}
