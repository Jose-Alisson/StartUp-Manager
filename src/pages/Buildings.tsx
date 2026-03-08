import React, { use, useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/Auth";
import { BusinessService, useBusinessService } from "../services/BusinessService";
import { Dropdown, DropOption, SimpleInputField } from "../components/Input";
import { CategoryService, useCategoryService } from "../services/CategoryService";
import { LagalServcie, useLegalService } from "../services/LegalService";
import { Modal } from "../components/Modal";
import { UploadFile } from "../components/UploadFile";
import { FileService, useFileService } from "../services/FileService";
import { Error } from '../components/Error';
import z from 'zod';
import { API_URL } from "../constants";
import Pagination from "../components/Pagination";
import { retry } from "../utils/PollingRetry";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStomp } from "../hooks/WSStomp";


const type = {
    "DOCUMENT": "Documento",
    "TAX": "Tributário/Fiscal",
    "LICENSE": "Licença"
}

const estructure = {
    "MEI": "Faturamento R$81.000 anuais",
    "ME": "Faturamento R$360.000 anuais"
}

const checkListType = {
    "EQUIPMENT": "Equipamento",
    "TEAM": "Time",
    "LOCATION": "Localização",
    "LEGAL": "Legal"
}

interface BusinessRequest {
    name: string | null
    description: string | null
    category: String | null
    imageUrl?: string | null
    legalStructure: {
        type: string | null
        requirements: any[] | null
    },
    tips: string[] | null
    initialInvestment: number | string | null
    monthlyProfit: number | string | null
    checkList: any[] | null
    ricks: any[] | null
}

export default function PremiumCard({ onSelect, name, isFeatured, imageUrl, description, category, initialInvestment, monthlyProfit }) {
    return (
        <div onClick={onSelect} className="group bg-white relative w-full overflow-hidden cursor-pointer rounded-2xl border-gray-800 transition-all duration-300 flex w-full">

            {/* IMAGE */}
            <div className="relative h-44 w-44 min-w-44 overflow-hidden p-2">
                <img
                    src={imageUrl?.startsWith("http") ? imageUrl : API_URL + "/resources/download/" + imageUrl}
                    alt="Aulas Particulares"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                />

                {/* BADGES */}
                <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                        {category?.name}
                    </span>
                    {isFeatured && <span className="rounded-full bg-[#3B82F6] px-3 py-1 text-xs font-semibold text-white">
                        Destaque
                    </span>}
                </div>
            </div>

            {/* CONTENT */}
            <div className="space-y-4 p-5 flex-1">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                        {name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400 line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* METRICS */}
                <div className="grid grid-cols-3 gap-3 rounded-xl p-3 text-center">
                    <div>
                        <p className="text-xs text-gray-400">Investimento</p>
                        <p className="text-sm font-semibold text-gray-800">{Number(initialInvestment)?.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Lucro Est.</p>
                        <p className="text-sm font-semibold text-green-400">
                            {Number(monthlyProfit)?.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            })}/mês
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Retorno</p>
                        <p className="text-sm font-semibold text-gray-800">{Math.ceil(Number(initialInvestment) / Number(monthlyProfit))} mês</p>
                    </div>
                </div>

                {/* CTA
                <button className="mt-2 w-full rounded-xl bg-[#3B82F6] py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Editar
                </button> */}
            </div>

            {/* GLOW */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
            </div>
        </div>
    );
}

function ViewBusinesses({ onSelectBusiness, onRedirect = (String) => { } }) {
    const { token } = useAuth()
    const businessService = useBusinessService()
    const fileService = useMemo(() => new FileService(token), [token])
    const [businesses, setBussinesses] = useState<any>()
    const [term, setTerm] = useState("")
    const [page, setPage] = useState(0)
    const { clickFeature } = useStomp()

    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

    // Função para toggle de categoria
    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    // Função para filtrar os businesses
    const getFilteredBusinesses = () => {
        if (selectedCategories.size === 0) {
            return businesses?.['content'] || [];
        }
        return businesses?.['content']?.filter(item =>
            selectedCategories.has(item.category?.name)
        ) || [];
    };

    const categoryes = () =>
        Array.from<any>(businesses?.['content'] || []).filter((i) => !i.deleted).reduce<Set<String>>((acc, item) => {
            acc.add(item?.category?.name)
            return acc
        }, new Set<String>())

    // useEffect(() => {
    //     const handler = setTimeout(async () => {
    //         let result = await retry({ fn: () => businessService.search(term, { page }), interval: 5000 })
    //         setBussinesses(result?.data)
    //     }, 300)
    //     return () => clearTimeout(handler)
    // }, [term, page])

    const debouncedSearch = useCallback(() => {
        const handler = setTimeout(async () => {

            if (term && term.trim() != "") {
                let result = await retry({ fn: () => businessService.search(term, { page }), interval: 5000 })
                setBussinesses(result?.data)
            } else {
                let result = await retry({ fn: () => businessService.readAll({ page }), interval: 5000 })
                setBussinesses(result?.data)
            }
        }, 300)
        return () => clearTimeout(handler)
    }, [term, page])

    useEffect(() => {
        debouncedSearch()
    }, [debouncedSearch])

    useEffect(() => {
        if (businesses?.['page']?.['totalPages'] <= 1) {
            setPage(0)
        }
    }, [businesses])


    return (
        <section className="w-full h-full bg-blue-50 p-8 flex flex-col gap-5 overflow-auto">
            <div className="flex justify-between items-center p-4">
                <div className="">
                    <h1 className="text-5xl font-bold text-gray-800">
                        Negócios
                    </h1>
                    <p className="mt-1 text-sm text-gray-400 mt-4">
                        Gerencie, edite e acompanhe seus negócios cadastrados
                    </p>
                </div>
                <div className="flex gap-0 w-[40%]">
                    <div className="search flex-1">
                        <div className="search bg-blue-100 border border-blue-200 rounded-[12px_0px_0px_12px] relative flex-1 flex">
                            <i className="fi fi-rr-search text-gray-500 absolute top-[50%] left-5 transform -translate-x-1/2 -translate-y-1/2"></i>
                            <input type="text" onChange={(e) => setTerm(e.target.value)} className="outline-none bg-transparent p-[0.75rem_0.75rem_0.75rem_2.25rem] flex-1" placeholder="Negócios" />
                        </div>
                    </div>
                    <button onClick={() => onRedirect('create')} className="rounded-[0px_12px_12px_0px] bg-blue-500 text-white font-black p-2 flex justify-center items-center w-[125px]">Adicionar</button>
                </div>
            </div>

            <div className="flex">
                <div>
                    <div className="sticky top-0 w-[2200px] max-w-[270px] mr-4">
                        <p className="text-gray-500 font-black">Filtro por categoria</p>
                        <p className="text-gray-400 text-sm">{categoryes().size} items</p>
                        <div className="flex gap-2 flex-wrap mt-4 items-around">
                            {Array.from(categoryes()).map((item: any, index) => {
                                const isSelected = selectedCategories.has(item);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => toggleCategory(item)}
                                        className={`${isSelected
                                            ? 'bg-blue-500 text-white border-blue-600'
                                            : 'bg-white text-gray-400 shadow-sm'
                                            } border border rounded-2xl p-2 shadow-sm text-nowrap text-sm flex gap-2 items-center justify-center transition-colors`}
                                    >

                                        {isSelected && <i className={`fi fi-rr-check flex`}></i>}

                                        {item}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    {/* lg:grid-cols-3 */}
                    <div className="grid grid-cols-1 gap-4 ">
                        {
                            getFilteredBusinesses().filter((i) => !i.deleted).map((item, index) => (
                                <PremiumCard
                                    onSelect={() => { onSelectBusiness(item); onRedirect('edit'); clickFeature(item.id) }}
                                    key={index}
                                    name={item.name}
                                    isFeatured={item.featured}
                                    imageUrl={item.imageUrl}
                                    description={item.description}
                                    category={item.category}
                                    initialInvestment={item.initialInvestment}
                                    monthlyProfit={item.monthlyProfit}
                                />
                            ))
                        }
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <Pagination number={page} onChange={setPage} totalPage={businesses?.['page']?.['totalPages']}></Pagination>
                    </div>
                </div>
            </div>
        </section>
    )
}


const notBlackMessage = "O campo não pode ser vazio"

const businessRequestSchema = z.object({
    name: z.string({ message: notBlackMessage }).trim().min(1, { message: notBlackMessage }),
    category: z.string({ message: notBlackMessage }),
    description: z.string({ message: notBlackMessage }).trim().min(1, { message: notBlackMessage }),
    type: z.string({ message: notBlackMessage }),
    initialInvestment: z.string({ message: notBlackMessage }),
    monthlyProfit: z.string({ message: notBlackMessage }),
})

function useBusinessModal() {
    const [modalActive, setModalActive] = useState("")
    const isActive = (name) => modalActive == name
    return { isActive, setModalActive }
}

function useCreateOrUpdateBusiness({ business = null, onRedirect }) {
    const { token } = useAuth()
    const categoryService = useCategoryService()
    const businessService = useBusinessService()
    const fileServcie = useFileService()
    const legalsService = useLegalService()
    const [categories, setCategores] = useState<[]>()
    const [legais, setLegais] = useState<[]>()
    const [thum, setThum] = useState<File>()
    const [form, setForm] = useState<any>({
        name: business?.name || null,
        description: business?.description || null,
        category: business?.category?.name || null,
        imageUrl: business?.imageUrl || null,
        requirements: business?.legalStructure?.requirements || [],
        type: business?.legalStructure?.type || null,
        tips: business?.tips || [],
        initialInvestment: business?.initialInvestment + "" || null,
        monthlyProfit: business?.monthlyProfit + "" || null,
        checkList: business?.checkList || []
    })
    const [loading, setLoadings] = useState<any>({})
    const [errors, setErrors] = useState<any>({})
    const setValueForm = (field, value) => setForm(prevent => ({ ...prevent, [field]: value }))
    const setErrorsbySchemaErros = (error) => setErrors(Object.assign({}, ...error?.issues?.map(e => ({ [e.path.join("")]: e?.message }))))

    const addItemInFildListByForm = (field, item) => {
        if (!form?.[field]) setValueForm("field", [])
        setValueForm(field, [...form[field], item])
    }

    const removeItemByFieldListForm = (field, item) => {
        setValueForm(field, [...form[field]?.filter(i => (i !== item || i.id != item.id))])
    }

    const sortChecklistByType = () => {
        let types = form.checkList.reduce((acc, item) => {
            if (!acc[item.type]) acc[item.type] = []
            acc[item.type].push(item)
            return acc
        }, {})
        let keys = Object.keys(types)
        let obj = keys.map((key) => ({ name: key, value: types[key] }))
        return obj
    }

    const create = useCallback(async () => {
        if (loading?.['create']) return false;
        let schema = businessRequestSchema.safeParse(form)

        if (schema.success) {
            const formData = new FormData()
            formData.append("file", thum)
            const data_ = form
            let data: BusinessRequest = {
                ...data_,
                legalStructure: {
                    type: data_.type,
                    requirements: data_.requirements
                },
                ricks: []
            }
            try {
                setLoadings(prevent => ({ ...prevent, create: true }))
                const path = thum ? (await fileServcie.uploadToPublic(formData)).data : null
                if (path) {
                    data.imageUrl = path
                }
                await businessService.create(data)
                return true
            } catch (ex) { } finally {
                setLoadings(prevent => ({ ...prevent, create: false }))
                setErrors(null)
            }
            return false
        }

        toast.error("Há campos, ainda a preencher")
        setErrorsbySchemaErros(schema.error)

        return false
    }, [form, thum])

    const update = useCallback(async (id: number) => {
        if (loading?.['update']) return false;
        let schema = businessRequestSchema.safeParse(form)

        if (schema.success) {
            const formData = new FormData()
            formData.append("file", thum)
            const form_ = form
            let data: BusinessRequest = {
                ...form_,
                legalStructure: {
                    type: form_.type,
                    requirements: form_.requirements
                },
                ricks: []
            }
            try {
                setLoadings(prevent => ({ ...prevent, update: true }))
                const path = thum ? (await fileServcie.uploadToPublic(formData)).data : null
                if (path) {
                    data.imageUrl = path
                }
                await businessService.update(id, data)
                return true
            } catch (ex) { } finally {
                setLoadings(prevent => ({ ...prevent, update: false }))
                setErrors(null)
            }
            return false
        }

        toast.error("Há campos, ainda a preencher")
        setErrorsbySchemaErros(schema.error)

        return false
    }, [form, thum])

    useEffect(() => {
        const init = async () => {
            let categoryResult = await categoryService.readAll({})
            setCategores(categoryResult.data)

            let legalsResult = await legalsService.readAll({})
            setLegais(legalsResult.data)
        }
        init()
    }, [token])

    return {
        categories,
        setCategores,
        legais,
        setLegais,
        setThum,
        form,
        setValueForm,
        errors,
        loading,
        addItemInFildListByForm,
        removeItemByFieldListForm,
        sortChecklistByType,
        create,
        update
    }
}

function CreateBusiness({ onRedirect }) {
    const {
        categories,
        legais,
        setThum,
        form,
        loading,
        setValueForm,
        addItemInFildListByForm,
        removeItemByFieldListForm,
        sortChecklistByType,
        errors,
        create } = useCreateOrUpdateBusiness({ onRedirect })
    const { isActive, setModalActive } = useBusinessModal()
    return (
        <>
            {isActive("add-legal") && <ModalAddLegal legais={legais} addItemInFildListByForm={addItemInFildListByForm} onClose={setModalActive} />}
            {isActive("add-tip") && <ModalAddTip onAdd={(value) => { addItemInFildListByForm("tips", value); setModalActive("") }} onClose={setModalActive}></ModalAddTip>}
            {isActive("add-checklist") && <ModalAddCheckList onAdd={(value) => addItemInFildListByForm("checkList", value)} onClose={setModalActive}></ModalAddCheckList>}

            <section className="w-full h-full flex flex-col gap-5 overflow-auto p-8 relative">
                <div>
                    <h1 className="text-5xl font-bold text-gray-800">
                        Crie Seus Negócios
                    </h1>
                    <p className="mt-1 text-sm text-gray-400 mt-4">
                        Gerencie, edite e acompanhe seus negócios cadastrados
                    </p>
                </div>
                <div className="p-8 bg-white rounded-[20px] flex flex-col gap-2">
                    <h2 className="text-3xl text-gray-700 font-bold flex items-center gap-4"><i className="fi fi-rr-picture flex p-4 bg-[#F4F4FC] rounded-[20px]"></i> Logo do Negócio</h2>
                    <UploadFile onFile={setThum}></UploadFile>
                </div>
                <div className="grid grid-cols-2 gap-8 p-8 bg-white rounded-[20px]">
                    <div className="flex flex-col gap-4 col-span-2" style={{ "--color": "#F4F4FC" } as React.CSSProperties}>
                        <h2 className="text-3xl text-gray-700 font-bold flex items-center gap-4"><i className="fi fi-rr-building flex p-4 bg-[#F4F4FC] rounded-[20px]"></i> Informações Básicas</h2>
                        <div className="grid gap-4 grid-cols-2">
                            <SimpleInputField label={"Nome do Négocio *"} value={form.name} placeholder={"Ex: Escola de Programação"} onChange={(e) => setValueForm("name", e)}>
                                <Error error={errors?.['name']} />
                            </SimpleInputField>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-[#4A5568]">Categoria*</p>
                                <Dropdown initial={form.category || "Categoria"} onChange={(v) => setValueForm('category', v)}>
                                    {categories?.['content'].map((item, index) =>
                                        (<DropOption label={item?.name} value={item?.name}></DropOption>)
                                    )}
                                </Dropdown>
                                <Error error={errors?.['category']} />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex gap-2 flex-col">
                        <p className="text-sm text-[#4A5568]">Descrição*</p>
                        <textarea value={form.description} onChange={(e) => setValueForm("description", e.target.value)} className="w-[100%] h-[95px] bg-[#F4F4FC] outline-none resize-none p-4 rounded-[10px] border" placeholder="Explique rapidamente o modelo do negócio, público-alvo e diferencial"></textarea>
                        <Error error={errors?.['description']} />
                    </div>
                </div>
                <div className="p-8 bg-white rounded-[20px] flex flex-col gap-4">
                    <h2 className="text-3xl text-gray-700 font-bold flex gap-4 items-center"><i className="fi fi-rr-law-book flex p-4 bg-[#F4F4FC] rounded-[20px]"></i> Estrutura Legal</h2>
                    <div className="flex gap-4 items-start">
                        <div className="flex-1">
                            <Dropdown initial={"Categoria"} onChange={(value) => setValueForm("type", value)}>
                                <DropOption label={"MEI"} value={"MEI"}></DropOption>
                                <DropOption label={"ME"} value={"ME"}></DropOption>
                            </Dropdown>
                            <p className="text-sm text-gray-400 mt-2">{estructure[form?.['type']]}</p>
                            <Error error={errors?.['type']} />
                        </div>
                        <button onClick={() => setModalActive("add-legal")} className="p-2 bg-blue-100 border-primaryBlue rounded-[12px] text-primaryBlue font-bold w-[225px]">Adicionar Requisitos</button>
                    </div>
                    {form?.['requirements']?.map((item, index) => (
                        <div className="category-card border-b bg-white p-4 flex gap-4 items-center cursor-pointer flex justify-between items-center" key={index}>
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
                            <div className="flex flex-col items-end float-right text-gray-500 gap-2">
                                <p className="text-blue-400" >{type[item?.type]}</p>
                                <div className="close hover:text-red-500 flex items-center" onClick={() => removeItemByFieldListForm("requirements", item)}>
                                    <i className="fi fi-rr-cross-small flex"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-8 bg-[#111827] rounded-[20px] flex flex-col gap-4 " style={{ "--color": "#1c1c2c", "--text-color": "#9CA3AF" } as React.CSSProperties}>
                    <h2 className="text-3xl text-gray-300 font-bold flex gap-4 items-center"><i className="fi fi-rr-chart-mixed-up-circle-dollar flex  p-4 bg-[#22223C] rounded-[20px]"></i> Investimento Financeiro</h2>
                    <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
                        <div className="flex flex-col gap-2">
                            {form.initialInvestment && <p className="text-sm text-gray-400 mt-2">Investimento Inicial*</p>}
                            <SimpleInputField inputMask={"money"} dropMask={true} value={form.initialInvestment} placeholder={"R$ Inicial"} onChange={(v) => setValueForm("initialInvestment", v)}>
                                <Error error={errors?.['initialInvestment']} />
                            </SimpleInputField>
                        </div>
                        <div className="flex flex-col gap-2">
                            {form.monthlyProfit && <p className="text-sm text-gray-400 mt-2">Lucro Mensal*</p>}
                            <SimpleInputField inputMask={"money"} dropMask={true} value={form.monthlyProfit} placeholder={"R$ Lucro Mensal"} onChange={(v) => setValueForm("monthlyProfit", v)}>
                                <Error error={errors?.['monthlyProfit']} />
                            </SimpleInputField>
                        </div>
                        <div className="flex flex-col gap-2">
                            {(form.initialInvestment && form.monthlyProfit) && <p className="text-sm text-gray-400 mt-2">Margem de lucro*</p>}
                            <SimpleInputField placeholder={"% Margem de lucro"} value={"% " + (Math.trunc((parseFloat(form.monthlyProfit) || 0) / (parseFloat(form.initialInvestment) || 100) * 100))} onChange={undefined}>
                            </SimpleInputField>
                        </div>
                    </div>
                </div>
                <div className="rounded-[20px] p-8 flex flex-col gap-4 bg-[#111827]">
                    <div className="flex gap-4 justify-between items-center">
                        <h2 className="text-3xl text-gray-300 font-bold flex items-center gap-4"><i className="fi fi-rr-lightbulb-on flex p-4 bg-[#22223C] rounded-[20px]"></i> Dicas</h2>
                        <button onClick={() => setModalActive("add-tip")} className="p-2 bg-[#1C1C2C] border border-[#50505B] rounded-[12px] text-gray-400 font-bold">Adicionar Dicas</button>
                    </div>
                    <div className="tips flex flex-col gap-2">
                        {
                            form?.['tips'].length ?
                                form?.['tips'].map((item, index) => (
                                    <div key={index} className="tip border-l-[5px] border-primaryBlue p-2 flex gap-2 justify-between items-center">
                                        <p className="italic text-gray-200">"{item}"</p>
                                        <span className="close text-gray-400 hover:text-red-500" onClick={() => removeItemByFieldListForm("tips", item)}>
                                            <i className="fi fi-rr-cross-small flex"></i>
                                        </span>
                                    </div>
                                ))
                                : <h1 className="text-gray-400">Nenhuma dica</h1>
                        }
                    </div>
                </div>
                <div className="rounded-[20px] p-8 flex flex-col gap-4 bg-[#111827]">
                    <div className="flex justify-between gap-4 items-center">
                        <h2 className="text-3xl text-gray-300 font-bold flex gap-4 items-center"><i className="fi fi-rr-checkbox flex p-4 bg-[#22223C] rounded-[20px]"></i> Checklist</h2>
                        <button className="p-2 bg-[#1C1C2C] border border-[#50505B] rounded-[12px] text-gray-400 font-bold" onClick={() => setModalActive("add-checklist")}>Adicionar Check</button>
                    </div>
                    <div className="checklist flex flex-col gap-2">
                        {
                            form.checkList.length ? sortChecklistByType().map((item, index) => (
                                <div key={index} className="text-gray-300 mb-4 border-l-[5px] border-primaryBlue p-2">
                                    <h2 className="mb-2 p-2 text-xl font-black">{checkListType[item.name]}</h2>
                                    <div className="flex gap-2 flex-wrap">
                                        {item.value?.map((value, index) => (
                                            <div key={index} className="p-2 border rounded flex gap-2 items-center">
                                                <span className="">{value.title}</span>
                                                <span className="close hover:text-red-500" onClick={() => removeItemByFieldListForm("checkList", value)}>
                                                    <i className="fi fi-rr-cross-small flex"></i>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )) : <h1 className="text-gray-400">Nenhum checklist</h1>
                        }
                    </div>
                </div>
                <section className="flex flex-col items-start">
                    <button disabled={loading?.['create']} onClick={async () => {
                        console.log("123")
                        if (await create()) {
                            console.log("iee")
                            toast.success("Negócio criado com sucesso")
                            onRedirect("view")
                        }
                    }} className="p-[0.75rem] bg-blue-200 border-primaryBlue rounded-[20px] w-[175px] text-[#191927] font-bold flex items-center justify-center transition hover:scale-[0.98] flex-1"><i className="fi fi-rr-floppy-disks flex"></i>&nbsp;&nbsp; {loading?.['create'] ? 'Criando ...' : 'Criar'}</button>
                </section>
            </section>
        </>
    )
}

function ModalAddTip({ onAdd, onClose }) {
    const [tip, setTip] = useState("")

    return (
        <Modal title="Adicionar Dica" active={true} onClose={() => { onClose("") }}>
            <div className="flex flex-col gap-2 mt-4 w-[400px]">
                <SimpleInputField value={tip} placeholder={"Dica"} onChange={setTip}> </SimpleInputField>
                <button onClick={() => onAdd(tip)} className="bg-primaryBlue text-white rounded p-2">Ok</button>
            </div>
        </Modal>
    )
}

function ModalAddCheckList({ onAdd, onClose }) {
    const [form, setForm] = useState<any>({
        title: "",
        description: "",
        type: ""
    })

    const setValueForm = (field, value) => setForm(prevent => ({ ...prevent, [field]: value }))

    return (
        <Modal title="Adicionar Checklist" active={true} onClose={() => onClose("")}>
            <div className="flex flex-col gap-2 mt-4 w-[400px] gap-4" >
                <SimpleInputField value={form.name} onChange={(e) => setValueForm('title', e)} placeholder={"Titulo"}> </SimpleInputField>
                <textarea value={form.description} onChange={(e) => setValueForm('description', e.target.value)} className="w-[100%] h-[95px] bg-[#F4F4FC] outline-none resize-none p-4 rounded-[10px] border" placeholder="Descrição"></textarea>
                <Dropdown initial={form.type || "Categoria"} onChange={(value) => setValueForm("type", value)}>
                    <DropOption label={"Equipamento"} value={"EQUIPMENT"}></DropOption>
                    <DropOption label={"Time"} value={"TEAM"}></DropOption>
                    <DropOption label={"Local"} value={"LOCATION"}></DropOption>
                    <DropOption label={"Legal"} value={"LEGAL"}></DropOption>
                </Dropdown>
                <button onClick={() => onAdd(form)} className="bg-primaryBlue text-white rounded p-2">Ok</button>
            </div>
        </Modal>
    )
}

function ModalAddLegal({ addItemInFildListByForm, onClose }) {
    const legalsService = useLegalService()
    const [legais, setLegais] = useState<[]>()
    const [term, setTerm] = useState("")

    // useEffect(() => {
    //     const init = async () => {
    //         let legalsResult = await legalsService.readAll({})
    //         setLegais(legalsResult.data)
    //     }
    //     init()
    // })

    useEffect(() => {
        const handler = setTimeout(() => {
            legalsService.search(term, { page: 0 }).then(result => setLegais(result.data))
        }, 300)
        return () => clearTimeout(handler)
    }, [term])

    return (
        <Modal title="Legislação" active={true} onClose={() => onClose("")}>
            <section className="legais max-h-[80dvh] flex flex-col gap-4 mt-4">
                <div className="search bg-gray-100 border rounded-[20px_20px_20px_20px] relative flex-1 flex">
                    <i className="fi fi-rr-search text-gray-400 absolute top-[50%] left-5 transform -translate-x-1/2 -translate-y-1/2 "></i>
                    <input type="text" onChange={e => setTerm(e.target.value)} className="outline-none bg-transparent p-[0.75rem_0.75rem_0.75rem_2.25rem] flex-1" placeholder="Categorias" />
                </div>
                <div className="flex flex-col gap-4 overflow-auto flex-1 w-[800px]">
                    {legais?.['content'].map((item, index) => (
                        <div onClick={(e) => { addItemInFildListByForm("requirements", item) }} className="category-card rounded-[20px] bg-white p-4 flex gap-4 items-center cursor-pointer flex justify-between items-center" key={index}>
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
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Modal>
    )
}


function UpdateBusiness({ business, onRedirect = (String) => { } }) {
    const {
        categories,
        legais,
        setThum,
        form,
        loading,
        setValueForm,
        addItemInFildListByForm,
        removeItemByFieldListForm,
        sortChecklistByType,
        errors,
        update } = useCreateOrUpdateBusiness({ business, onRedirect })
    const { isActive, setModalActive } = useBusinessModal()
    return (
        <>
            {isActive("add-legal") && <ModalAddLegal addItemInFildListByForm={addItemInFildListByForm} onClose={setModalActive} />}
            {isActive("add-tip") && <ModalAddTip onAdd={(value) => { addItemInFildListByForm("tips", value); setModalActive("") }} onClose={setModalActive}></ModalAddTip>}
            {isActive("add-checklist") && <ModalAddCheckList onAdd={(value) => addItemInFildListByForm("checkList", value)} onClose={setModalActive}></ModalAddCheckList>}

            <section className="w-full h-full flex flex-col gap-5 overflow-auto p-8 relative">
                <div>
                    <h1 className="text-5xl font-bold text-gray-800">
                        Edite Seus Negócios
                    </h1>
                    <p className="mt-1 text-sm text-gray-400 mt-4">
                        Gerencie, edite e acompanhe seus negócios cadastrados
                    </p>
                </div>
                <div className="p-8 bg-white rounded-[20px] flex flex-col gap-2">
                    <h2 className="text-3xl text-gray-700 font-bold flex items-center gap-4"><i className="fi fi-rr-picture flex p-4 bg-[#F4F4FC] rounded-[20px]"></i> Logo do Negócio</h2>
                    <UploadFile view={business.imageUrl} onFile={setThum} onRemove={() => setValueForm("imageUrl", null)}></UploadFile>
                </div>
                <div className="grid grid-cols-2 gap-8 p-8 bg-white rounded-[20px]">
                    <div className="flex flex-col gap-4 col-span-2" style={{ "--color": "#F4F4FC" } as React.CSSProperties}>
                        <h2 className="text-3xl text-gray-700 font-bold flex items-center gap-4"><i className="fi fi-rr-building flex p-4 bg-[#F4F4FC] rounded-[20px]"></i> Informações Básicas</h2>
                        <div className="grid gap-4 grid-cols-2">
                            <SimpleInputField label={"Nome do Négocio *"} value={form.name} placeholder={"Ex: Escola de Programação"} onChange={(e) => setValueForm("name", e)}>
                                <Error error={errors?.['name']} />
                            </SimpleInputField>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-[#4A5568]">Categoria*</p>
                                <Dropdown initial={form.category || "Categoria"} onChange={(v) => setValueForm('category', v)}>
                                    {categories?.['content'].map((item, index) =>
                                        (<DropOption label={item?.name} value={item?.name}></DropOption>)
                                    )}
                                </Dropdown>
                                <Error error={errors?.['category']} />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex gap-2 flex-col">
                        <p className="text-sm text-[#4A5568]">Descrição*</p>
                        <textarea value={form.description} onChange={(e) => setValueForm("description", e.target.value)} className="w-[100%] h-[95px] bg-[#F4F4FC] outline-none resize-none p-4 rounded-[10px] border" placeholder="Explique rapidamente o modelo do negócio, público-alvo e diferencial"></textarea>
                        <Error error={errors?.['description']} />
                    </div>
                </div>
                <div className="p-8 bg-white rounded-[20px] flex flex-col gap-4 shadow-sm">
                    <h2 className="text-3xl text-gray-700 font-bold flex gap-4 items-center"><i className="fi fi-rr-law-book flex p-4 bg-[#F4F4FC] rounded-[20px]"></i> Estrutura Legal</h2>
                    <div className="flex gap-4 items-start">
                        <div className="flex-1">
                            <Dropdown initial={form.type || "Categoria"} onChange={(value) => setValueForm("type", value)}>
                                <DropOption label={"MEI"} value={"MEI"}></DropOption>
                                <DropOption label={"ME"} value={"ME"}></DropOption>
                            </Dropdown>
                            <p className="text-sm text-gray-400 mt-2">{estructure[form?.['type']]}</p>
                            <Error error={errors?.['type']} />
                        </div>
                        <button onClick={() => setModalActive("add-legal")} className="p-2 bg-blue-100 border-primaryBlue rounded-[12px] text-primaryBlue font-bold w-[225px]">Adicionar Requisitos</button>
                    </div>
                    {form?.['requirements']?.map((item, index) => (
                        <div className="category-card border-b bg-white p-4 flex gap-4 items-center cursor-pointer flex justify-between items-center" key={index}>
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
                            <div className="flex flex-col items-end float-right text-gray-500 gap-2">
                                <p className="text-blue-400" >{type[item?.type]}</p>
                                <div className="close hover:text-red-500 flex items-center" onClick={() => removeItemByFieldListForm("requirements", item)}>
                                    <i className="fi fi-rr-cross-small flex"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-8 bg-[#111827] rounded-[20px] flex flex-col gap-4 " style={{ "--color": "#1c1c2c", "--text-color": "#9CA3AF" } as React.CSSProperties}>
                    <h2 className="text-3xl text-gray-300 font-bold flex gap-4 items-center"><i className="fi fi-rr-chart-mixed-up-circle-dollar flex  p-4 bg-[#22223C] rounded-[20px]"></i> Investimento Financeiro</h2>
                    <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
                        <div className="flex flex-col gap-2">
                            {form.initialInvestment && <p className="text-sm text-gray-400 mt-2">Investimento Inicial*</p>}
                            <SimpleInputField inputMask={"money"} dropMask={true} value={form.initialInvestment} placeholder={"R$ Inicial"} onChange={(v) => setValueForm("initialInvestment", v)}>
                                <Error error={errors?.['initialInvestment']} />
                            </SimpleInputField>
                        </div>
                        <div className="flex flex-col gap-2">
                            {form.monthlyProfit && <p className="text-sm text-gray-400 mt-2">Lucro Mensal*</p>}
                            <SimpleInputField inputMask={"money"} dropMask={true} value={form.monthlyProfit} placeholder={"R$ Lucro Mensal"} onChange={(v) => setValueForm("monthlyProfit", v)}>
                                <Error error={errors?.['monthlyProfit']} />
                            </SimpleInputField>
                        </div>
                        <div className="flex flex-col gap-2">
                            {(form.initialInvestment && form.monthlyProfit) && <p className="text-sm text-gray-400 mt-2">Margem de lucro*</p>}
                            <SimpleInputField placeholder={"% Margem de lucro"} value={"% " + (Math.trunc((parseFloat(form.monthlyProfit) || 0) / (parseFloat(form.initialInvestment) || 100) * 100))} onChange={undefined}>
                            </SimpleInputField>
                        </div>
                    </div>
                </div>
                <div className="rounded-[20px] p-8 flex flex-col gap-4 bg-[#111827]">
                    <div className="flex gap-4 justify-between items-center">
                        <h2 className="text-3xl text-gray-300 font-bold flex items-center gap-4"><i className="fi fi-rr-lightbulb-on flex  p-4 bg-[#22223C] rounded-[20px]"></i> Dicas</h2>
                        <button onClick={() => setModalActive("add-tip")} className="p-2 bg-[#1C1C2C] border border-[#50505B] rounded-[12px] text-gray-400 font-bold ">Adicionar Dicas</button>
                    </div>
                    <div className="tips flex flex-col gap-2">
                        {
                            form?.['tips'].length ?
                                form?.['tips']?.map((item, index) => (
                                    <div key={index} className="tip border-l-[5px] border-primaryBlue p-2">
                                        <p className="italic text-gray-200">"{item}"</p>
                                    </div>
                                ))
                                : <h1 className="text-gray-400">Nenhuma dica</h1>
                        }
                    </div>
                </div>
                <div className="rounded-[20px] p-8 flex flex-col gap-4 bg-[#111827]">
                    <div className="flex justify-between gap-4 items-center">
                        <h2 className="text-3xl text-gray-300 font-bold flex gap-4 items-center"><i className="fi fi-rr-checkbox flex  p-4 bg-[#22223C] rounded-[20px]"></i> Checklist</h2>
                        <button className="p-2 bg-[#1C1C2C] border border-[#50505B] rounded-[12px] text-gray-400 font-bold" onClick={() => setModalActive("add-checklist")}>Adicionar Check</button>
                    </div>
                    <div className="checklist flex flex-col gap-2">
                        {
                            form.checkList.length ? sortChecklistByType().map((item, index) => (
                                <div key={index} className="text-gray-300 mb-4 border-l-[5px] border-primaryBlue p-2">
                                    <h2 className="mb-2 p-2 text-xl font-black">{checkListType[item.name]}</h2>
                                    <div className="flex gap-2 flex-wrap">
                                        {item.value?.map((value, index) => (
                                            <div key={index} className="p-2 border rounded flex gap-2 items-center">
                                                <span className="">{value.title}</span>
                                                <span className="close hover:text-red-500" onClick={() => removeItemByFieldListForm("checkList", value)}>
                                                    <i className="fi fi-rr-cross-small flex"></i>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )) : <h1 className="text-gray-400">Nenhum checklist</h1>
                        }
                    </div>
                </div>
                <section className="flex flex-col items-start">
                    <button disabled={loading?.['update']} onClick={async () => {
                        if (await update(business.id)) {
                            toast.success("Negócio editado com sucesso")
                            onRedirect("view")
                        }
                    }} className="p-[0.75rem] bg-blue-200 border-primaryBlue rounded-[20px] w-[175px] text-[#191927] font-bold flex items-center justify-center transition hover:scale-[0.98] flex-1"><i className="fi fi-rr-floppy-disks flex"></i>&nbsp;&nbsp; {loading?.['create'] ? 'Salvando ...' : 'Salvar'}</button>
                </section>
            </section>
        </>
    )
}

export function Buildings() {
    const [view, setView] = useState<'create' | 'edit' | 'view'>('view')
    const [busisses, setBussiness] = useState()

    return (
        <>
            {view == 'view' && <ViewBusinesses onSelectBusiness={setBussiness} onRedirect={setView} />}
            {view == 'create' && <CreateBusiness onRedirect={setView} />}
            {view == 'edit' && <UpdateBusiness business={busisses} onRedirect={setView} />}
        </>
    )
}