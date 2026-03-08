import { Outlet, useNavigate } from "react-router-dom";
import '../styles/auth.style.css';
import { useState } from "react";
import InputField from "../components/Input";
import { AuthError, useAuth } from "../hooks/Auth";
import z, { email, ZodError } from "zod";
import { AxiosError } from "axios";

let accountRequestScchema = z.object({
    email: z.email({ message: "Digite um email valido" }),
    username: z.string().min(4, { message: "O nome de usuario deve ter no minimo 4 caracteres" }),
    password: z.string().min(8, { message: "A senha deve ter no minimo 8 caracteres" }),
});

export function Register() {
    const navigate = useNavigate()
    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState<any>({ email: "", username: "", password: "" });
    let { register, login } = useAuth();

    let registerHandler = async () => {
        let result = accountRequestScchema.safeParse({ email, username, password });
        if (!result.success) {
            setError(Object.assign({}, ...result.error.issues.map(i => ({ [i.path.join('.')]: i.message }))))
            return;
        }
        
        setError({ email: null, username: null, password: null });

        try {
            await register(username, email, password);
            let result = await login(email, password);

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
        } catch (e) {
            if (e instanceof AxiosError) {
                if(e.status === 409){
                    setError((prevent: any) => ({...prevent, email: "O e-mail já está em uso"}))
                }
            }
        }
    }

    return (
        <div className="login-view flex flex-col justify-center min-h-screen bg-gray-100 gap-10">
            <span className="flex text-[clamp(1rem,2vw,1.6rem)] flex-col"> <h2 className='font-bold text-[1.6em] text-gray-900'>Registra-se em</h2> <h1 className="flex gap-2 font-bold text-[2.4em] text-gray-900">StartUp<p className="text-blue-400">Guide</p></h1></span>
            <div className="fields flex flex-col gap-10">
                <InputField label="Nome" type="text" placeholder="Digite seu nome" value={username} onChange={setUsername} error={error?.username} >
                    {error?.username && <p className="text-red-500 text-sm mt-4 bg-red-100 rounded p-1"><i className="fi fi-rr-exclamation"></i> {error?.username}</p>}
                </InputField>
                <InputField label="Email" type="text" placeholder="Digite seu email" value={email} onChange={setEmail} error={error?.email} >
                    {error?.email && <p className="text-red-500 text-sm mt-4 bg-red-100 rounded p-1"><i className="fi fi-rr-exclamation"></i> {error?.email}</p>}
                </InputField>
                <InputField label="Senha" type="password" placeholder="Digite sua senha" value={password} onChange={setPassword} error={error?.password} >
                    {error?.password && <p className="text-red-500 text-sm mt-4 bg-red-100 rounded p-1"><i className="fi fi-rr-exclamation"></i> {error?.password}</p>}
                </InputField>
            </div>

            <button className="login bg-blue-500 text-white p-3 rounded mt-6 mb-6" onClick={registerHandler}>Registrar</button>
            <div className="or"></div>
            <center>
                <span>Já tenho acesso <a className="text-blue-500" onClick={() => navigate("/auth/login")}>entrar</a></span>
            </center>
        </div>
    )
}