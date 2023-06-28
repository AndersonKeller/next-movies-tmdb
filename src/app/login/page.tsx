"use client";
import { Form } from "@/components/form/form";
import { useAuth } from "@/providers/authProvider";
import { LoginData, loginSchema } from "@/schemas/user.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { validateWhitLogin, sessionId, getToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const onFormLogin = (formData: LoginData) => {
    async function apiSession() {
      const res = await validateWhitLogin(formData);
      if (res) {
        router.push("/");
      }
    }
    apiSession();
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <div className="body-login-register">
      <Form noValidate onSubmit={handleSubmit(onFormLogin)} label="Login">
        <label htmlFor="email">username</label>
        <input type="text" {...register("username")} id="email" />
        <span className="error">
          {errors.username ? errors.username.message : ""}
        </span>
        <label htmlFor="password">password</label>
        <input type="password" {...register("password")} id="password" />
        <span className="error">
          {errors.password ? errors.password.message : ""}
        </span>
      </Form>

      <Link
        href="https://www.themoviedb.org/signup?language=pt-BR"
        target="_blank"
      >
        Not account in TMDB? Go to register
      </Link>
      <Link href={"/"}>Continue whit a Guest</Link>
    </div>
  );
}
