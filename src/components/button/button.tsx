import "./layout.css";
interface Props {
  label: string;
  type?: "button" | "submit";
  color: string;
}
export function Button({ label, type, color }: Props) {
  return (
    <button
      type={type ? type : "button"}
      className={color == "red" ? "red" : ""}
    >
      {label}
    </button>
  );
}
