export function Error({ error }) {
    return (error && <p className="text-red-500" >{error}</p>)
}