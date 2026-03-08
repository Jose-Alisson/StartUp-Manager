import React from 'react';
import '../styles/pagination.style.css'

export default function Pagination({color = null, totalPage, number, onChange }) {
    const windowSize = 3;

    let start = Math.max(0, number - 1);
    let end = Math.min(totalPage - 1, start + windowSize - 1);

    // garante sempre 3 quando possível
    if (end - start < windowSize - 1) {
        start = Math.max(0, end - windowSize + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <div className="flex gap-4 justify-center items-center" style={{"--primary": color} as React.CSSProperties}>
            <button
                disabled={number === 0}
                onClick={() => onChange(number - 1)}
                className="bg-primaryBlue p-2 rounded text-white transition text-sm disabled:opacity-50"
            >
                <i className="fi fi-rr-angle-small-left flex"></i>
            </button>

            <div className="flex gap-2">
                {pages.map(p => (
                    <button
                        key={p}
                        onClick={() => onChange(p)}
                        className={`px-3 py-1 text-gray-700 rounded bg-white transition ${p === number
                                ? "text-primaryBlue border border-primaryBlue border-2-solid"
                                : "bg-white"
                            }`}
                    >
                        {p + 1}
                    </button>
                ))}
            </div>

            <button
                disabled={number === totalPage - 1}
                onClick={() => onChange(number + 1)}
                className="bg-primaryBlue p-2 rounded text-white transition text-sm disabled:opacity-50"
            >
                <i className="fi fi-rr-angle-small-right flex"></i>
            </button>
        </div>
    );
}