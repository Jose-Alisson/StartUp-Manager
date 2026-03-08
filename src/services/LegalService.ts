import axios, { AxiosError } from "axios"
import { useAuth } from "../hooks/Auth"
import { useOffline } from "../hooks/Offline"
import { useMemo } from "react"
import { API_URL } from "../constants"

export class LagalServcie {

    private token
    private APÌ_URL = `${API_URL}/legals`

    constructor(token) {
        this.token = token
    }

    public async create(data) {
        const res = await axios.post(`${this.APÌ_URL}/create`, data, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return res.data
    }

    public async update(idOrName, data) {
        const res = await axios.put(`${this.APÌ_URL}/${idOrName}/update`, data, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return res.data
    }

    public async read(idOrName) {
        const res = await axios.get(`${this.APÌ_URL}/${idOrName}/`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return res.data
    }

    public async readAll(pageable) {
        const res = await axios.get(`${this.APÌ_URL}/`, {
            params: {
                ...pageable
            },
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return res.data
    }

    async search(term, pageable) {
        const res = await axios.get(`${this.APÌ_URL}/search`, {
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

export function useLegalService() {
    const { token } = useAuth()
    const { show } = useOffline()
    const businessService = useMemo(() => new LagalServcie(token), [token])

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