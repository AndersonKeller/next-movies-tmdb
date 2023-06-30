import Link from "next/link";
import "./layout.css";
import { useAuth } from "@/providers/authProvider";
import { Button } from "../button/button";

export function Header() {
  const { userName, logout } = useAuth();
  return (
    <header className="header">
      <h1 className="logo-name">Next - Movies</h1>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/login"}>Login</Link>
        {userName && (
          <Button onClick={logout} type="button" color="red" label="Logout" />
        )}
      </nav>
    </header>
  );
}
