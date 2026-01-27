import { createContext, useState, useContext, navigate, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const API_URL = `${"http://localhost:8080"}/accounts`

export class AuthError extends Error {
  body: any;

  constructor(message: string, body: any) {
    super(message);
    this.name = "AuthError";
    this.body = body;
  }
}

let getInitialAuth = () => {
  const token = localStorage.getItem("token")
  if (!token) return { user: null, token: null }

  try {
    const payload = jwtDecode(token)
    return {
      token,
      user: {
        username: payload.sub ?? null,
        id: payload?.['id'],
        role: payload?.['role'],
        authorities: payload?.['authorities']
      }
    }
  } catch {
    return { user: null, token: null }
  }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [{ user, token }, setAuth] = useState(() => getInitialAuth())

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setAuth({ user: data.account, token: data.token })
      return data
    } else {
      throw new Error("Login falhou");
    }
  };

  const register = async (username, email, password) => {

    const res = await fetch("http://localhost:8080/accounts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new AuthError("Registro falhou", errorBody);
    }

    return await res.json();
  }

  const sendResetCode = async (email) => {
    const res = await fetch(`${API_URL}/${email}/send-reset-password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok)
      error(res.status)
  };

  const verifyCode = async (email, code) => {
    const res = await fetch(`${API_URL}/${email}/verify-code-reset-password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!res.ok)
      error(res.status)
  }

  const verifyAndResetCode = async (email, code, newPassword) => {
    const res = await fetch(`${API_URL}/${email}/reset-password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, password: newPassword }),
    });

    if (!res.ok)
      error(res.status)
  }

  const me = async () => {
    const res = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok)
      error(res.status)

    return await res.json()
  }

  const error = (error) => {
    throw new AuthError("", error)
  }

  const logout = () => {
    setAuth({ user: null, token: null })
    localStorage.removeItem("token")
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, sendResetCode, verifyCode, verifyAndResetCode, me, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);