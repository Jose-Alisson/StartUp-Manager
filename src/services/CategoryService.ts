import axios, { AxiosError } from "axios";
import { useAuth } from "../hooks/Auth";
import { useOffline } from "../hooks/Offline";
import { useMemo } from "react";
import { API_URL } from "../constants";

export class CategoryService {
    private URL_API = `${API_URL}/categories`
    private token

    constructor(token: String) {
        this.token = token
    }

    async create(data) {
        console.log(data)

        const res = await axios.post(`${this.URL_API}/create`, data, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })

        return res.data
    }

    async update(id, data) {
        const res = await axios.put(`${this.URL_API}/${id}/update`, data, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return res.data
    }

    async read(id) {
        const res = await axios.get(`${this.URL_API}/${id}/update`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return res.data
    }

    async readAll(pageable) {
        const res = await axios.get(`${this.URL_API}/`, {
            params: {
                ...pageable
            },
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return res.data
    }

    async search(term, pageable){
        const res = await axios.get(`${this.URL_API}/search`, {
            params: {
                term,
                ...pageable
            },
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return res.data
    }
}


export function useCategoryService() {
    const { token } = useAuth()
    const { show } = useOffline()
    const businessService = useMemo(() => new CategoryService(token), [token])

    const handler = async (fun: () => Promise<any>) => {
        try {
            return { error: null, data: await fun() }
        } catch (ex) {
            if (ex instanceof AxiosError) {
                if (ex.code == AxiosError.ERR_NETWORK || ex.code == AxiosError.ECONNABORTED) {
                    show()
                }
            }
            return {data: null, error: ex}
        }
    }

    const create = (data) => {
        return handler(() => businessService.create(data))
    }

    const update = (idOrname, data) => {
        return handler(() => businessService.update(idOrname, data))
    }

    const readAll = (pageable) => {
        return handler(() => businessService.readAll(pageable))
    }

    const search = (term, pageable) => {
        return handler(() => businessService.search(term, pageable))
    }

    return {
        create,
        update,
        readAll,
        search
    }
}