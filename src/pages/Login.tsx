import '../styles/auth.style.css';
import { useState } from "react";
import InputField from "../components/Input";
import { AuthError, useAuth } from "../hooks/Auth";
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useOffline } from '../hooks/Offline';

export function Login() {

    let { show } = useOffline()
    let navigate = useNavigate()
    let { login, me, setAuth } = useAuth();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [authError, setAuthError] = useState("");

    let loginHandler = async () => {
        try {
            var result = await login(email, password);
            localStorage.setItem("token", result.token)

            switch (result.account?.role) {
                case "manager":
                    navigate("/dash/manager")
                    break;
                case "admin":
                    navigate("/dash/manager")
                    break;
                default:
                    navigate("/dash/user")
                    break;
            }
        } catch (error) {
            setAuthError("email ou senha invalido");
            if (error instanceof AxiosError) {
                if (error.code === AxiosError.ERR_NETWORK) {
                    show()
                }
            }
        }
    }

    return (
        <div className="login-view flex flex-col justify-center min-h-screen bg-gray-100 gap-10">
            <span className="flex text-[clamp(1rem,2vw,1.6rem)] flex-col">Bem-vindo ao &nbsp;<h1 className="flex gap-2 font-bold text-[2.4em] text-gray-900">StartUp<p className="text-blue-400">Guide</p></h1></span>
            <div className="fields flex flex-col gap-10">
                <InputField label="Email" type="text" placeholder="Digite seu email" value={email} onChange={setEmail}></InputField>
                <InputField label="Senha" type="password" placeholder="Digite sua senha" value={password} onChange={setPassword}>
                    {authError && <p className="text-red-500 text-sm mt-4 float-right">{authError}</p>}
                </InputField>
            </div>
            <button className="login bg-blue-500 text-white p-3 rounded mt-6 mb-6" onClick={loginHandler}>Entrar</button>
            <div className="or"></div>
            <div className="flex flex-col items-center">
                <span>
                    Ainda não tem acesso <a className="text-blue-500" onClick={() => navigate("/auth/register")}>cadastre-se</a>
                </span>
                <span className="float-right mt-[12px]"><a className="text-blue-500" onClick={() => navigate("/auth/forgot")}>Esqueci minha senha</a></span>
            </div>
        </div>
    )
}