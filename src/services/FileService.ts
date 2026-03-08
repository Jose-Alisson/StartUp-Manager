import axios, { AxiosError } from "axios";
import { API_URL } from "../constants";
import { useAuth } from "../hooks/Auth";
import { useOffline } from "../hooks/Offline";
import { useMemo } from "react";

export class FileService {

    private URL = `${API_URL}/resources`
    private token

    constructor(token) {
        this.token = token
    }

    async upload(file: FormData) {
        let result = await axios.post(`${this.URL}/upload`, file, {
            responseType: 'text', headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return result.data
    }

    async uploadToPublic(file: FormData) {
        let result = await axios.post(`${this.URL}/upload/public`, file, {
            responseType: 'text', headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return result.data
    }

    async download(path: string) {
        let result = await axios.get(`${this.URL}/download${path.startsWith("/") ? path : "/" + path}`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
        return result.data
    }
}

export function useFileService() {
    const { token } = useAuth()
    const { show } = useOffline()
    const fileService = useMemo(() => new FileService(token), [token])

    const handler = async (fun: () => Promise<any>) => {
        try {
            return { error: null, data: await fun() }
        } catch (ex) {
            if (ex instanceof AxiosError) {
                if (ex.code == AxiosError.ERR_NETWORK || ex.code == AxiosError.ECONNABORTED) {
                    show()
                }
            }
            return { data: null, error: ex }
        }
    }

    const upload = (file: FormData) => {
        return handler(() => fileService.upload(file))
    }

    const uploadToPublic = (file: FormData) => {
        return handler(() => fileService.uploadToPublic(file))
    }

    const download = (path: string) => {
        return handler(() => fileService.download(path))
    }

    return {
        upload,
        uploadToPublic,
        download
    }
}