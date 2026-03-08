import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_URL as API } from "../constants";

const API_URL = `${API}/accounts`

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

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }) {
  const [{ user, token }, setAuth] = useState(() => getInitialAuth())

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password }).then(data => data.data);
    setAuth({ user: res.account, token: res.token })
    return res
  };

  const register = async (username, email, password) => {
    return axios.post("http://localhost:8080/accounts/create", { username, email, password }).then(data => data.data);
  }

  const sendResetCode = async (email) => {
    return axios.patch(`${API_URL}/${email}/send-reset-password`).then(data => data.data);
  };

  const verifyCode = async (email, code) => {
    return axios.patch(`${API_URL}/${email}/verify-code-reset-password`, { code }).then(data => data.data);
  }

  const verifyAndResetCode = async (email, code, newPassword) => {
    return axios.patch(`${API_URL}/${email}/reset-password`, { code, password: newPassword }).then(data => data.data);
  }

  const me = async () => {
    return axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(data => data.data);
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


export const useAuth = () => useContext<any>(AuthContext);