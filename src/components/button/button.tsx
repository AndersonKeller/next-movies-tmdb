import { ButtonHTMLAttributes } from "react";
import "./layout.css";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  color: string;
}
export function Button({ label, color, ...rest }: Props) {
  return (
    <button className={color == "red" ? "red" : ""} {...rest}>
      {label}
    </button>
  );
}
