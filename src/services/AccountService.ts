import axios, { AxiosError } from "axios"
import { useAuth } from "../hooks/Auth"
import { useOffline } from "../hooks/Offline"
import { useMemo } from "react"
import { API_URL } from "../constants"

export class AccountService {
    private token
    private API_URL = `${API_URL}/accounts`

    constructor(token) {
        this.token = token
    }

    async create(data) {
        let result = await axios.post(`${this.API_URL}/`, data, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return result.data
    }

    async update(id, data) {
        let result = await axios.put(`${this.API_URL}/${id}/`, data, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return result.data
    }

    async read(id) {
        let result = await axios.get(`${this.API_URL}/${id}/`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return result.data
    }

    async readAll(pageable) {
        let result = await axios.get(`${this.API_URL}/`, {
            params: {
                ...pageable
            },
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return result.data
    }

    async search(term, pageable) {
        let result = await axios.get(`${this.API_URL}/search`, {
            params: {
                term,
                ...pageable
            },
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })

        return result.data
    }

    async count() {
        let result = await axios.get(`${this.API_URL}/count`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })

        return result.data
    }
}

export function useAccountService() {
    const { token } = useAuth()
    const { show } = useOffline()
    const businessService = useMemo(() => new AccountService(token), [token])

    const handler = async (fun: () => Promise<any>) => {
        try {
            return { data: await fun(), error: null }
        } catch (ex) {
            if (ex instanceof AxiosError) {
                if (ex.code == AxiosError.ERR_NETWORK || ex.code == AxiosError.ECONNABORTED) {
                    show()
                }
            }
            return { error: ex, data: null }
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

    const count = () => {
        return handler(() => businessService.count())
    }

    return {
        create,
        update,
        readAll,
        search,
        count
    }
}
