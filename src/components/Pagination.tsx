import '../styles/pagination.style.css'

export default function Pagination({ length, totalPage, number = 0}){
    return (
        <div className="flex gap-4 p-4 justify-center items-center">
            <button className="bg-blue-500 p-2 rounded text-white text-sm"><i class="fi fi-rr-angle-small-left flex"></i></button>
            <div className="pages flex gap-2">
                <div className="page">1</div>
                <div className="page">2</div>
                <div className="page">3</div>
            </div>
            <button className="bg-blue-500 p-2 rounded text-white text-sm"><i class="fi fi-rr-angle-small-right flex"></i></button>
        </div>
    )
}