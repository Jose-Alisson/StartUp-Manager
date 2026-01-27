import '../styles/auth.style.css'

export default function InputField({ label, type, placeholder, value = "", onChange, children = "", error = null}) {
    return (
        <div className={(error) ? 'error' : 'regular'}>
            <div className="field border-b border-b-gray-300">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-appBg border-none py-2.5 pl-4 pr-4 text-sm transition-all placeholder:text-gray-400 outline-none"
                    required
                />
                <label htmlFor={label}>{label}</label>
            </div>
            {children}
        </div>
    )
}