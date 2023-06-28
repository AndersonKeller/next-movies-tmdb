import { useForm } from "react-hook-form";
import "./layout.css";
import { Button } from "../button/button";

interface Props {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  noValidate: boolean;
  label: string;
}
export function Form({ children, onSubmit, label }: Props) {
  const { handleSubmit } = useForm();
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      {children}
      <Button color="red" type="submit" label={label} />
    </form>
  );
}
