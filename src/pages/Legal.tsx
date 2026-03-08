import { useEffect, useState, useMemo, useCallback } from 'react'
import Pagination from "../components/Pagination";
import { useAuth } from "../hooks/Auth";
import { LagalServcie, useLegalService } from '../services/LegalService';
import { Modal } from '../components/Modal';
import { Dropdown, DropOption, SimpleInputField } from '../components/Input';
import z from 'zod'
import { AxiosError } from 'axios';
import { Error } from '../components/Error';

const type = {
    "DOCUMENT": "Documento",
    "TAX": "Tributário/Fiscal",
    "LICENSE": "Licença"
}

const legalRequestSchema = z.object({
    name: z.string({ message: "O campo não pode ser vazio" }),
    type: z.enum(["DOCUMENT", "TAX", "LICENSE"], { message: "insira documento, licença ou tax" }),
    description: z.string({ message: "O campo não pode ser vazio" })
})

export default function Legal() {
    const { token } = useAuth()
    const legalService = useLegalService()
    const [term, setTerm] = useState("")
    const [legals, setLegals] = useState([])
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [modalActive, setModalActive] = useState(null)
    const [pageNumber, setPageNumber] = useState(0)
    const [p_, setPageUpdate] = useState({})

    const isModalActive = (name) => name === modalActive
    const setValueForm = (field, value) => setForm(prevent => ({ ...prevent, [field]: value }))
    const setErrorsbyForm = (error) => setErrors(Object.assign({}, ...error?.issues?.map(e => ({ [e.path.join("")]: e?.message }))))
    const clearForm = () => setForm({})

    useEffect(() => {
        const handler = setTimeout(async () => {
            const {data, error} = await legalService.search(term, { page: pageNumber });
            setLegals(data)
        }, 300);
        return () => clearTimeout(handler);
    }, [term, pageNumber, p_]);

    useEffect(() => {
        if (legals?.['page']?.['totalPages'] <= 1) {
            setPageNumber(0)
        }
    }, [legals])

    const create = useCallback(async () => {
        const safe = legalRequestSchema.safeParse(form)

        if (safe.success) {
            try {
                await legalService.create(safe.data)
                setPageNumber(0)
                setPageUpdate(prevent => ({...prevent}))
                setErrors({})
                return true
            } catch (ex) {
                if (ex instanceof AxiosError) {
                    if (ex.status === 409) {
                        setErrors({ name: "O nome já está em uso" })
                        return false
                    }
                }
            }
        }

        setErrorsbyForm(safe.error)
        return false
    }, [form])

    const update = useCallback(async (id) => {
        const safe = legalRequestSchema.safeParse(form)

        if (safe.success) {
            let { error } = await legalService.update(id, safe.data)
            if (!error) {
                setPageNumber(0)
                setPageUpdate(prevent => ({...prevent}))
                setErrors({})
                return true
            } else {
                if (error instanceof AxiosError) {
                    if (error.status === 409) {
                        setErrors({ name: "O nome já está em uso" })
                    }
                }
            }
        }

        setErrorsbyForm(safe.error)
        return false
    }, [form])

    return (
        <>
            <Modal title="Adicionar Legal" active={isModalActive("modal-create")} onClose={() => { setModalActive(null); clearForm() }}>
                <section className="flex flex-col gap-4 w-[400px] mt-4">
                    <SimpleInputField error={errors?.['name']} value={form?.['name']} placeholder="nome" onChange={(value) => setValueForm("name", value)}>
                        <Error error={errors?.['name']}></Error>
                    </SimpleInputField>
                    <div className={"flex flex-col gap-2"}>
                        <Dropdown initial={type[form?.['type']] || "Tipo"} onChange={(value) => setValueForm("type", value)}>
                            <DropOption label={"Documento"} value={"DOCUMENT"}></DropOption>
                            <DropOption label={"Licença"} value={"LICENSE"}></DropOption>
                            <DropOption label={"Tax"} value={"TAX"}></DropOption>
                        </Dropdown>
                        <Error error={errors?.['type']}></Error>
                    </div>
                    <div className="flex flex-col gap-2">
                        <textarea value={form?.['description']} onChange={(e) => setValueForm("description", e.target.value)} className={"resize-none rounded-[10px] border p-2 outline-none h-[95px]"} placeholder='Descrição'></textarea>
                        <Error error={errors?.['description']}></Error>
                    </div>
                    <button onClick={async () => {
                        if (await create()) {
                            setModalActive(null)
                            clearForm()
                        }
                    }} className={"bg-primaryBlue p-2 rounded text-white font-bold"}>Salvar</button>
                </section>
            </Modal>

            <section className="p-8 bg-blue-50">
                <div className="flex flex-col gap-4">
                    <div className="">
                        <h1 className="text-5xl font-bold text-gray-800">
                            Legais
                        </h1>
                        <p className="mt-1 text-sm text-gray-400 mt-4">
                            Gerencie, edite e acompanhe suas legais cadastrados
                        </p>
                    </div>
                    <div className="flex">
                        <div className="search bg-blue-100 border border-blue-200 rounded-[20px_0px_0px_20px] relative flex-1 flex">
                            <i className="fi fi-rr-search text-gray-400 absolute top-[50%] left-5 transform -translate-x-1/2 -translate-y-1/2 flex"></i>
                            <input type="text" value={term} onChange={(e) => setTerm(e?.target?.value || "")} className="outline-none bg-transparent p-[0.75rem_0.75rem_0.75rem_2.25rem] flex-1" placeholder="Categorias" />
                        </div>
                        <button onClick={() => setModalActive("modal-create")} className="rounded-[0px_20px_20px_0px] bg-blue-500 text-white font-black p-2 flex justify-center items-center w-[125px]">Adicionar</button>
                    </div>
                    <div className="legals-cards flex flex-col gap-2">
                        {legals?.['content']?.map((item, index) => (
                            <>
                                <Modal title="Adicionar Legal" active={isModalActive("modal-" + index)} onClose={() => { setModalActive(null); clearForm() }}>
                                    <section className="flex flex-col gap-4 w-[400px] mt-4">
                                        <SimpleInputField error={errors?.['name']} value={form?.['name']} placeholder="nome" onChange={(value) => setValueForm("name", value)}>
                                            <Error error={errors?.['name']}></Error>
                                        </SimpleInputField>
                                        <div className={"flex flex-col gap-2"}>
                                            <Dropdown initial={type[form?.['type']] || "Tipo"} onChange={(value) => setValueForm("type", value)}>
                                                <DropOption label={"Documento"} value={"DOCUMENT"}></DropOption>
                                                <DropOption label={"Licença"} value={"LICENSE"}></DropOption>
                                                <DropOption label={"Tax"} value={"TAX"}></DropOption>
                                            </Dropdown>
                                            <Error error={errors?.['type']}></Error>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <textarea value={form?.['description']} onChange={(e) => setValueForm("description", e.target.value)} className={"resize-none h-[95px] rounded-[10px] border p-2 outline-none"} placeholder='Descrição'></textarea>
                                            <Error error={errors?.['description']}></Error>
                                        </div>
                                        <button onClick={async () => {
                                            if (await update(item.id)) {
                                                setModalActive(null)
                                                clearForm()
                                            }
                                        }} className={"bg-primaryBlue p-2 rounded text-white font-bold"}>Salvar</button>
                                    </section>
                                </Modal>
                                <div onClick={() => { setForm({ ...item }); setModalActive("modal-" + index) }} className="category-card rounded-[20px] bg-white p-4 flex gap-4 items-center cursor-pointer flex justify-between items-center" key={index}>
                                    <div className="flex gap-4 items-center">
                                        <div >
                                            <div className="icon flex justify-center items-center">
                                                <div className="bg-gray-200 rounded-[50%] w-[52px] h-[52px]"></div>
                                            </div>
                                        </div>
                                        <div className="text-xl text-gray-700">
                                            <p><strong>{item?.name}</strong></p>
                                            <p className="text-gray-400 text-sm w-[550px]">{item?.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end float-right text-gray-500">
                                        <p className="text-blue-400" >{type[item?.type]}</p>
                                        {/* <p >{item?.mandatory ? "Obrigátorio" : ""}</p> */}
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                    <div className="flex justify-center items-center">
                        <Pagination number={pageNumber} onChange={setPageNumber} totalPage={legals?.['page']?.['totalPages']}></Pagination>
                    </div>
                </div>
            </section>
        </>
    )
}