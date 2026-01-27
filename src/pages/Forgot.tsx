import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/Input";
import '../styles/auth.style.css';
import z from "zod";
import { useAuth } from "../hooks/Auth";
import VerificationCode from "../components/VerificationCode";

let requestEmailSchema = z.email();

let requestNewPassword = z.string().min(8)

export function Forgot() {
    let navigate = useNavigate()
    let [wasSendCode, setWasSendCode] = useState(false);
    let [email, setEmail] = useState("");
    let [code, setCode] = useState("")
    let [error, setError] = useState({});
    let [verify, setVerify] = useState(false)
    const { sendResetCode, verifyAndResetCode, verifyCode } = useAuth()
    const [newPassword, setNewPassword] = useState()

    const sendHandler = async () => {
        let result = requestEmailSchema.safeParse(email);

        if (result.success) {
            setError({})
            try {
                await sendResetCode(email);
                setWasSendCode(true);
            } catch (e) {
                console.log(e)
            }
            return
        }

        setError({ email: "Digite um email valido" })
    }

    const verifyHandler = async () => {
        try {
            await verifyCode(email, code)
            setVerify(true)
        } catch (e) {
            setError({ code: "Codigo de verificação expirado ou invalido" })
        }
    }

    const verifyAndResetCodeHandler = async () => {
        var result = requestNewPassword.safeParse(newPassword)
        if (result.success) {
            try {
                await verifyAndResetCode(email, code, newPassword);
                navigate("/auth/login")
            } catch (e) {
                setError({ code: "Codigo de verificação expirado ou invalido" })
            }
        } else {
            setError({newPassword: "A senha deve ter no minimo 8 caracteress"})
        }
    }

    let content = null

    if (!wasSendCode) {
        content = <>
            <div className="fields flex flex-col gap-10 justify-center">
                <InputField label="Email" type="text" placeholder="Digite seu email" value={email} onChange={setEmail} error={error.email}>
                    {error.email && <p className="text-red-500 text-sm mt-4 bg-red-100 rounded p-1"><i className="fi fi-rr-exclamation"></i> {error.email}</p>}
                </InputField>
            </div>
            <button className="bg-blue-500 text-white p-3 rounded mt-6 mb-6" onClick={sendHandler}>Enviar</button>
        </>
    } else if (verify == false) {
        content = <>
            <div className="fields flex flex-col gap-10 justify-center">
                <div>
                    <h2 className="mb-2">Digite o código de verificação</h2>
                    <VerificationCode length={6} onComplete={setCode} />
                    {error.code && <p className="text-red-500 mt-2">Código expirado ou invalido</p>}
                </div>
            </div>
            <button className={`bg-blue-500 text-white p-3 rounded mt-6 mb-6 ${code?.length < 6 ? 'disabled' : ''}`} onClick={verifyHandler}>Prosseguir</button>
        </>
    } else {
        content = <>
            <div className="fields">
                <InputField label="Senha" type="password" placeholder="Digite sua nova senha" value={newPassword} onChange={setNewPassword} error={error.newPassword} >
                    {error.newPassword && <p className="text-red-500 text-sm mt-4 bg-red-100 rounded p-1"><i className="fi fi-rr-exclamation"></i> {error.newPassword}</p>}
                </InputField>
            </div>
            {error.code && <p className="text-red-500 mt-2">Código expirado ou invalido</p>}
            <button className={`bg-blue-500 text-white p-3 rounded mt-6 mb-6`} onClick={verifyAndResetCodeHandler}>Salvar</button>
        </>
    }

    return (
        <div className="login-view flex flex-col justify-center min-h-screen bg-gray-100 gap-10">
            <span className="flex text-[clamp(1rem,2vw,1.6rem)] flex-col">
                <h1 className="flex gap-2 font-bold text-[2.4em] text-gray-900">StartUp<p className="text-blue-400">Guide</p></h1>
                <h2 className='font-bold text-[1.2em] text-gray-500'>Redefina sua senha</h2>
                {!wasSendCode && <span className="text-gray-500 w-[450px] max-w-[90%] text-sm mt-5">Digite o endereço de e-mail verificado da sua conta de usuário e enviaremos um link para redefinir sua senha.</span>}
                {wasSendCode && <span className="text-gray-500 w-[450px] max-w-[90%] text-sm mt-5">Enviamos um código de verificação para o endereço de e-mail {email}, insira no campo abaixo para redefinir sua senha.</span>}
            </span>
            {content}
        </div>
    )
} 