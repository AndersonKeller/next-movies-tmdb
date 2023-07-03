"use client";
import { LoginData } from "@/schemas/user.schemas";
import { api } from "@/services/api";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import React, { createContext, useContext, useState } from "react";
interface Props {
  children: React.ReactNode;
}
interface authValues {
  getToken: () => void;
  validateWhitLogin: (LoginData: LoginData) => Promise<boolean>;
  sessionId: string;
  createGuest: () => void;
  userName: string;
  logout: () => void;
}

export const authContext = createContext<authValues>({} as authValues);

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [userName, setUsername] = useState("");
  const [guestSessionId, setGuestSessionId] = useState("");
  async function getToken() {
    try {
      const res = await api("GET", "/authentication/token/new");
      setToken(res.request_token);
      setCookie(null, "@next-movies-token", res.request_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function validateWhitLogin(userData: LoginData) {
    userData.request_token = token;
    try {
      const res = await api(
        "POST",
        "/authentication/token/validate_with_login",
        userData
      );
      console.log(res);
      createSession();
      setUsername(userData.username);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async function createSession() {
    const sessionData = {
      request_token: token,
    };
    console.log(sessionData);
    try {
      const res = await api("POST", "/authentication/session/new", sessionData);
      console.log(res);
      setSessionId(res.session_id);
      setCookie(null, "@next-movies-sessionid", res.session_id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      destroyCookie(null, "@next-movies-guest-sessionid");
    } catch (error) {
      console.log(error);
    }
  }
  async function createGuest() {
    try {
      const res = await api("GET", "/authentication/guest_session/new");
      console.log(res);
      setGuestSessionId(res.guest_session_id);
      setCookie(null, "@next-movies-guest-sessionid", res.guest_session_id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function logout() {
    destroyCookie(null, "@next-movies-sessionid");
    destroyCookie(null, "@next-movies-token");
    setUsername("");
    createGuest();
  }
  return (
    <authContext.Provider
      value={{
        logout,
        userName,
        createGuest,
        sessionId,
        validateWhitLogin,
        getToken,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
export const useAuth = () => useContext(authContext);
