
import ReactDom from 'react-dom'

export function OfflineIndicator({ active, retry }) {
    return ReactDom.createPortal(
        <>
            {active &&
                <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-800 absolute top-0 left-0 z-50">
      
      {/* Icone de alerta */}
      <div className="mb-8 flex flex-col items-center">
        <div className="flex justify-center items-center w-24 h-24 rounded-full bg-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="mt-4 text-3xl font-bold">Você está offline</h1>
        <p className="mt-2 text-gray-500 text-center max-w-sm">
          Verifique sua conexão com a internet e tente novamente.
        </p>
      </div>

      {/* Botão de tentar reconectar */}
      <button
        onClick={retry}
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
      >
        Tentar Reconectar
      </button>

    </div>}
        </>, document.body
    )
}