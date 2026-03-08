import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/Auth"
import { API_URL } from "../constants"

export default function About() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const logoutAndRedrectLogin = () => {
    logout()
    navigate("/auth")
  }

  return (
    <section className="p-8 mx-auto flex flex-col gap-8">
      <div className="flex flex-col bg-white md:flex-row items-center md:items-start gap-6 border border-gray-200 rounded-[20px] p-6 shadow-sm">
        <div className="icon flex-shrink-0">
          {user?.profile?.imageUrl ? <img src={user.profile.imageUrl ? API_URL + "/resources/download/" + user?.profile?.imageUrl : ""} className="bg-gray-400 rounded-[50%] w-40 h-40 object-cover" alt=""/> :
          <div className="bg-gray-300 rounded-full w-40 h-40 flex items-center justify-center text-6xl font-semibold text-white">
            {user?.username?.[0].toUpperCase()}
          </div>
}
        </div>

        {/* Informações do usuário */}
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-gray-800">
            {user?.username}
          </h1>
          <h2 className="text-gray-500 text-lg">
            {user?.role || 'Cargo não informado'}
          </h2>
          <p className="text-gray-600 text-sm">
            {user?.email}
          </p>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2 w-xl">
            Aqui você pode gerenciar suas informações pessoais, atualizar seus dados e acompanhar seu progresso dentro do sistema.
          </p>
        </div>

        {/* Botão de logout */}
        <div
          onClick={logoutAndRedrectLogin}
          className="mt-4 md:mt-0 flex justify-center items-center cursor-pointer text-red-500 hover:text-red-600 transition-colors"
          title="Sair"
        >
          <i className="fi fi-rr-sign-out-alt text-3xl"></i>
        </div>
      </div>
    </section>

  )
} 