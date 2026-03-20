import { useAuth } from "../hooks/Auth"
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { CategoryService, useCategoryService } from "../services/CategoryService"
import Pagination from "../components/Pagination"
import { Modal } from "../components/Modal"
import z from 'zod'
import { SimpleInputField } from "../components/Input"
import { AxiosError } from "axios"
import { UploadFile, UploadFileSvg } from "../components/UploadFile"
import { useFileService } from "../services/FileService"
import { API_URL } from "../constants"

const categoryRequestSchema = z.object({
    name: z.string().min(2, { message: "O Campo deve ter no minimo 2 caracteres" }).regex(/^[\p{L}\p{P}\s]+$/u, "Permitido apenas letras e pontuações")
})

function SvgImage({ url }) {
    const [src, setSrc] = useState("")

    useEffect(() => {
        fetch(url)
            .then(res => res.text())
            .then(data => {
                const base64 = btoa(data)
                setSrc(`data:image/svg+xml;base64,${base64}`)
            })
    }, [url])

    return <img src={src} alt="svg" className="bg-gray-200 rounded-[50%] w-[52px] h-[52px]" />
}

export default function Categories() {
    const { token } = useAuth()
    const [categories, setCategories] = useState(null)
    const [modalActive, setModalActive] = useState(null)
    const categoriesService = useCategoryService()
    const fileServcie = useFileService()
    const [term, setTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(0)
    const [thum, setThum] = useState<File>()
    const [form, setForm] = useState<any>({})
    const [errors, setErros] = useState<any>()
    const [p_, setPageUpdate] = useState({})

    let isActive = (name: string) => { return modalActive === name }

    let changeForm = (name, value) => { setForm(prevent => ({ ...form, [name]: value })) }
    const setErrorsBySchema = (errors) => { setErros(Object.assign({}, ...errors.error.issues.map(e => ({ [e.path.join("")]: e.message })))) }

    let openModal = (modal) => { setModalActive(modal) }

    let openModalWithForm = (modal, value) => {
        openModal(modal)
        setForm(value)
    }

    let closeModal = (e) => {
        e.stopPropagation()
        setModalActive(null)
        setForm({})
        setErros({})
    }

    useEffect(() => {
        const handler = setTimeout(async () => {
            const { data, error } = await categoriesService.search(term, { page: pageNumber });
            if (!error) {
                setCategories(data)
            }
        }, 300);
        return () => clearTimeout(handler);
    }, [term, pageNumber, p_]);

    useEffect(() => {
        if (categories?.['page']?.['totalPages'] <= 1) {
            setPageNumber(0)
        }
    }, [categories])

    const create = useCallback(async () => {
        let safe = categoryRequestSchema.safeParse(form)
        if (safe.success) {
            let { error } = await categoriesService.create(safe.data)
            let { data } = await categoriesService.readAll({ page: 0, size: 20 })

            if (!error) {
                setCategories(data)
                setPageUpdate(prevent => ({ ...prevent }))
                setErros({})
                return true
            } else {
                if (error instanceof AxiosError) {
                    if (error.status === 409) {
                        setErros({ name: "O nome já está em uso" })
                    }
                }
            }
            return false
        }
        setErrorsBySchema(safe)
    }, [form, thum])

    const update = useCallback(async (id) => {
        let safe = categoryRequestSchema.safeParse(form)

        if (safe.success) {
            const formData = new FormData()
            formData.append("file", thum)
            const data = {
                ...form,
                imageUrl: null
            }
            try {
                const path = thum ? (await fileServcie.uploadToPublic(formData)).data : null

                console.log("path", path)
                if (path) {
                    data.imageUrl = path
                }
                await categoriesService.update(id, data)
                setPageUpdate(prevent => ({ ...prevent }))
                setThum(undefined)
                setErros(null)
                return true
            } catch (ex) {
                console.log("error", ex)
                if (ex instanceof AxiosError) {
                    if (ex.status === 409) {
                        setErros({ name: "O nome já está em uso" })
                    }
                }
            }
            return false
        }
        setErrorsBySchema(safe)
        return false

    }, [form, thum])

    return (
        <section className="p-8 bg-blue-50">
            <Modal active={isActive("new-category")} title="Nova categoria" onClose={closeModal}>
                <div className="content p-2 mt-2 w-[400px] gap-4 flex flex-col">
                    <UploadFileSvg onFile={setThum} onRemove={() => setThum(null)} height={200}></UploadFileSvg>
                    <SimpleInputField error={errors?.name} value={form?.name} placeholder="name" onChange={v => changeForm("name", v)}>
                        {errors?.name && <p className="text-red-500">{errors?.name}</p>}
                    </SimpleInputField>
                    <div className="actions flex flex-col gap-4">
                        <button onClick={async (e) => {
                            if (await create()) {
                                closeModal(e)
                            }
                        }} className="bg-primaryBlue p-2 rounded text-white font-bold">salvar</button>
                    </div>
                </div>
            </Modal>
            <div className="flex flex-col gap-4">
                <div className="">
                    <h1 className="text-5xl font-bold text-gray-800">
                        Categorias
                    </h1>
                    <p className="mt-1 text-sm text-gray-400 mt-4">
                        Gerencie, edite e acompanhe suas categorias cadastrados
                    </p>
                </div>
                <div className="flex">
                    <div className="search bg-blue-100 border border-blue-200 rounded-[20px_0px_0px_20px] relative flex-1 flex">
                        <i className="fi fi-rr-search text-gray-400 absolute top-[50%] left-5 transform -translate-x-1/2 -translate-y-1/2 flex"></i>
                        <input type="text" onChange={(e) => setTerm(e.target.value)} className="outline-none bg-transparent p-[0.75rem_0.75rem_0.75rem_2.25rem] flex-1" placeholder="Categorias" />
                    </div>
                    <button onClick={() => openModal("new-category")} className="rounded-[0px_20px_20px_0px] bg-blue-500 text-white font-black p-2 flex justify-center items-center w-[125px]">Adicionar</button>
                </div>
                <div className="categories-cards">
                    {categories?.content?.map((item, index) => (
                        <div onClick={() => openModalWithForm("view-" + index, item)} className="category-card rounded-[20px] bg-white p-4 flex gap-4 items-center cursor-pointer" key={index}>
                            <Modal active={isActive("view-" + index)} title={"Modificar Categoria"} onClose={closeModal}>
                                <UploadFileSvg view={item?.imageUrl} onFile={setThum} onRemove={() => setThum(undefined)} height={200}></UploadFileSvg>
                                <div className="content p-2 mt-2 w-[400px] gap-4 flex flex-col">
                                    <SimpleInputField value={form.name} error={errors?.name} placeholder="name" onChange={value => changeForm("name", value)}>
                                        {errors?.name && <p className="text-red-500">{errors?.name}</p>}
                                    </SimpleInputField>
                                    <div className="actions flex flex-col gap-4">
                                        <button className="bg-primaryBlue p-2 rounded text-white font-bold" onClick={async (e) => {
                                            e.stopPropagation()
                                            if (await update(item.name)) {
                                                closeModal(e)
                                            }
                                        }}>Salvar</button>
                                    </div>
                                </div>
                            </Modal>
                            <div>
                                <div className="icon flex justify-center items-center">
                                    {/* <div className="bg-gray-200 rounded-[50%] w-[52px] h-[52px]"></div> */}
                                    {/* {item?.imageUrl} */}
                                    <SvgImage url={`${API_URL}/resources/download/${item?.imageUrl}`} />
                                </div>
                            </div>
                            <div className="text-xl text-gray-700">
                                <p><strong>{item?.name}</strong></p>
                                <p className="text-gray-400 text-sm"><strong>{item?.affiliationsCount || 0}</strong> Negócios associados</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center">
                    <Pagination totalPage={categories?.page?.totalPages} number={pageNumber} onChange={setPageNumber} ></Pagination>
                </div>
            </div>
        </section>
    )
}
