import { Bar } from "react-chartjs-2";
import Pagination from "../components/Pagination";

const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
    datasets: [
        {
            label: "Novos Usuários",
            data: [12, 19, 3, 5, 2],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
        }
    ]
};

const options: any = {
    responsive: true,
    plugins: {
        legend: { position: "top" }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

export default function Users() {
    return (
        <section className="p-4 text-black flex flex-col gap-4">
            <div className="overview grid grid-cols-[auto_auto_auto] gap-4">
                <div className="users-summary">
                    <div className="rounded-[20px] border p-8 text-[1.5rem] flex gap-8 items-center bg-white">
                        <span>
                            <i className="fi fi-rr-users text-[#3B82F6] text-[2.5rem]"></i>
                        </span>
                        <p>
                            <span className="label">Usuários</span>
                            <br />
                            <span className="value"><strong>5K</strong></span>
                        </p>
                    </div>
                </div>
                <div className="users-actives">
                    <div className="rounded-[20px] border p-8 text-[1.5rem] flex gap-8 items-center bg-white">
                        <span className="w-[42px] flex justify-center items-center">
                            <div className="icon-users-active"></div>
                        </span>
                        <p>
                            <span className="label">Ativos</span>
                            <br />
                            <span className="value"><strong>377</strong></span>
                        </p>
                    </div>
                </div>
                <div className="access">
                    <div className="rounded-[20px] border p-8 text-[1.5rem] flex gap-8 items-center bg-white">
                        <span>
                            <i class="fi fi-rr-door-open text-[#3B82F6] text-[2.5rem]"></i>
                        </span>
                        <p>
                            <span className="label">Acessos</span>
                            <br />
                            <span className="value"><strong>5K</strong></span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="search bg-white border rounded-[12px] relative">
                    <i class="fi fi-rr-search text-gray-400 absolute top-[50%] left-4 transform -translate-x-1/2 -translate-y-1/2"></i>
                    <input type="text" className="outline-none bg-transparent p-[0.5rem_0.5rem_0.5rem_2rem]" placeholder="Usuário" />
                </div>
                <div class="users-table overflow-hidden border rounded-[20px] bg-white">
                    <section className="users">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Tipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td>José</td>
                                    <td>jose@email.com</td>
                                    <td>Manager</td>
                                </tr>
                                <tr >
                                    <td>Maria</td>
                                    <td>Maria@email.com</td>
                                    <td>Cliente</td>
                                </tr>
                                <tr >
                                    <td>Victor</td>
                                    <td>vivi@email.com</td>
                                    <td>Cliente</td>
                                </tr>
                                <tr >
                                    <td>Junior</td>
                                    <td>jjs@email.com</td>
                                    <td>Cliente</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>
                <div className="flex justify-center items-center">
                    <Pagination length={3} totalPage={1}></Pagination>
                </div>
            </div>
            <div className="grid grid-cols-[450px_450px] gap-4">
                <div className="rounded-[20px] border p-8 text-[1.5rem] flex gap-8 items-center bg-white">
                    <Bar data={data} options={options} />
                </div>
                <div className="rounded-[20px] border p-8 text-[1.5rem] flex gap-8 items-center bg-white">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </section>
    )
}