import "./layout.css";
interface Props {
  label: string;
  type?: "button" | "submit";
  color: string;
  onClick?: () => void;
}
export function Button({ label, type, color, onClick }: Props) {
  return (
    <button
      type={type ? type : "button"}
      className={color == "red" ? "red" : ""}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
