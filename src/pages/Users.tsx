import { Bar, Line } from "react-chartjs-2";
import Pagination from "../components/Pagination";
import { useAuth } from "../hooks/Auth";
import { AccountService, useAccountService } from "../services/AccountService";
import { use, useCallback, useEffect, useMemo, useState } from 'react'
import { useStomp } from "../hooks/WSStomp";
import { useMetricsService } from "../services/MetricsService";

function buildChartData(metrics, type) {
    const sorted = [...metrics].sort(
        (a, b) => new Date(a.createAt) - new Date(b.createAt)
    )

    const labels = sorted.map((item, index) => {
        const date = new Date(item.createAt)

        switch (type) {
            case "day":
                return formatWeekDay(date)

            case "week":
                return formatWeekLabel(sorted.length, index)

            case "month":
                return formatMonth(date)

            case "year":
                return formatYear(date)

            default:
                return ""
        }
    })

    return {
        labels,
        datasets: [
            {
                label: "Novos Usuários",
                data: sorted.map(i => i.countNewUsers),
                borderColor: "#3B82F6",
                backgroundColor: "#3B82F6",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3
            },
            {
                label: "Acessos Totais",
                data: sorted.map(i => i.accesses),
                borderColor: "#8B5CF6",
                backgroundColor: "#8B5CF6",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3,
                hidden: true
            }
        ]
    }
}

/* =======================
   Funções auxiliares
   ======================= */

function formatWeekDay(date) {
    return date.toLocaleDateString("pt-BR", {
        weekday: "long"
    })
}

function formatWeekLabel(total, index) {
    const diff = total - index - 1

    if (diff === 0) return "Semana passada"
    if (diff === 1) return "2 semanas atrás"
    return `${diff + 1} semanas atrás`
}

function formatMonth(date) {
    return date.toLocaleDateString("pt-BR", {
        month: "long"
    })
}

function formatYear(date) {
    return date.getFullYear().toString()
}

const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: 0
    },
    plugins: {
        legend: {
            display: true,
            position: "top"
        },
        tooltip: {
            intersect: false,
            mode: "index"
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                drawBorder: false,
                color: "rgba(0,0,0,0.06)"
            }
        }
    }
};

function Card({ icon = null, title, value }) {
    return (
        <div className="rounded-[20px] p-6 text-[1.25rem] flex gap-8 items-center bg-white">
            <span>
                {/* <i className="fi fi-rr-users text-[#3B82F6] text-[2rem] flex"></i> */}
                {icon}
            </span>
            <p>
                <span className="label text-gray-500">{title}</span>
                <br />
                <span className="value text-[1.50em]"><strong>{value}</strong></span>
            </p>
        </div>
    )
}

export default function Users() {
    const { token, user } = useAuth()
    const { sessions, accesses, count } = useStomp()
    const accountService = useAccountService()
    const { latestDays, latestWeeks, latestMonths, latestYears } = useMetricsService()
    const [accounts, setAccounts] = useState([])
    const [metrics, setMetrics] = useState({})
    const [term, setTerm] = useState("")
    const [pageNumber, setPageNumber] = useState(0)
    const [viewData, setViewData] = useState<'day' | 'week' | 'month' | 'year'>('day')
    const [data, setData] = useState({
        labels: [],
        datasets: []
    })

    useEffect(() => {
        const init = async () => {
            let { data, error } = await accountService.count()
            if (!error) {
                setMetrics(prevent => ({ ...prevent, count: data }))
            }
        }
        init()
    }, [])

    useEffect(() => {
        let handler = setTimeout(async () => {
            const { data, error } = await accountService.search(term, { page: pageNumber, size: 10 })
            if (!error) {
                setAccounts(data)
            }
        }, 300)
        return () => clearTimeout(handler);
    }, [term, pageNumber])


    useEffect(() => {
        if (!accounts) return
        if (accounts?.['page']?.['totalPages'] <= 1) {
            setPageNumber(0)
        }
    }, [accounts])

    useEffect(() => {
        const init = async () => {
            let dataRequest = {
                'day': buildChartData((await latestDays()).data, 'day'),
                'week': buildChartData((await latestWeeks()).data, 'week'),
                'month': buildChartData((await latestMonths()).data, 'month'),
                'year': buildChartData((await latestYears()).data, 'year')
            }
            setData(dataRequest[viewData] as any)
        }
        init()
    }, [viewData])

    return (
        <>
            <section className="p-8 text-black flex flex-col gap-8 bg-blue-50">
                <div>
                    <h1 className="text-5xl font-bold text-gray-800">
                        Usuários
                    </h1>
                    <p className="mt-1 text-sm text-gray-400 mt-4">
                        Acompanhe os usuários em tempo real
                    </p>
                </div>
                <div className="overview grid grid-cols-[1fr_1fr_1fr_1fr] gap-4">
                    <Card title={"Usuarios"} value={metrics?.['count'] || 0}></Card>
                    <Card icon={<div className="icon-users-active"></div>} title={"Ativos"} value={sessions || "0"}></Card>
                    <Card title={"Acessos"} value={accesses || 0}></Card>
                    <Card title={"Novos usuários"} value={count || 0} />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-8 bg-white rounded-[20px] p-4">
                        <div onClick={() => setViewData('day')} className={`transition bg-white cursor-pointer text-gray-400 text-center text-xl font-bold option p-4 rounded-[20px] border ${viewData == 'day' ? '!text-blue-500 !bg-blue-100 !shadow-[0_0_0_2px_#3B82F6]' : ''}`}>Dias</div>
                        <div onClick={() => setViewData('week')} className={`transition bg-white cursor-pointer text-gray-400 text-center text-xl font-bold option p-4 rounded-[20px] border ${viewData == 'week' ? '!text-blue-500 !bg-blue-100 !shadow-[0_0_0_2px_#3B82F6]' : ''}`}>Semanas</div>
                        <div onClick={() => setViewData('month')} className={`transition bg-white cursor-pointer text-gray-400 text-center text-xl font-bold option p-4 rounded-[20px] border ${viewData == 'month' ? '!text-blue-500 !bg-blue-100 !shadow-[0_0_0_2px_#3B82F6]' : ''}`}>Meses</div>
                        <div onClick={() => setViewData('year')} className={`transition bg-white cursor-pointer text-gray-400 text-center text-xl font-bold option p-4 rounded-[20px] border ${viewData == 'year' ? '!text-blue-500 !bg-blue-100 !shadow-[0_0_0_2px_#3B82F6]' : ''}`}>Anos</div>
                    </div>
                    <div className="p-4 rounded-[20px] bg-white h-[350px]">
                        <Line data={data} options={options} />
                    </div>
                </div>
                <div className="flex flex-col gap-0">
                    <div className="flex gap-4 items-center text-white">
                        <div className="search bg-[#111827] border border-[#1F2F46] rounded-[20px_20px_0px_0px] relative flex-1 flex">
                            <i className="fi fi-rr-search text-gray-400 absolute top-[50%] left-5 transform -translate-x-1/2 -translate-y-1/2"></i>
                            <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} className="outline-none bg-transparent p-[0.75rem_0.75rem_0.75rem_2.25rem] flex-1" placeholder="Usuário" />
                        </div>
                        <Pagination color={"#111827"} totalPage={accounts?.['page']?.totalPages} number={pageNumber} onChange={setPageNumber}></Pagination>
                    </div>
                    <div className="users-table overflow-hidden rounded-[0px_20px_20px_20px] bg-white">
                        <section className="users">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Papel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts?.['content']?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.username}</td>
                                            <td>{item?.email}</td>
                                            <td>{item?.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </div>
                    <div className="flex justify-center items-center">
                        {/* <Pagination length={3} totalPage={1}></Pagination> */}
                    </div>
                </div>
            </section>
        </>
    )
}