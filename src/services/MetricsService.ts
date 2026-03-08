import axios, { AxiosError } from "axios"
import { API_URL } from "../constants"
import { useMemo } from "react"
import { useAuth } from "../hooks/Auth"
import { useOffline } from "../hooks/Offline"

export class MetricService {

    private URL = `${API_URL}/metrics`
    private token

    constructor(token) {
        this.token = token
    }

    latestDays(){
        return axios.get(`${this.URL}/latest-days`, {
            headers: {
                Authorization : `Bearer ${this.token}`
            }
        }).then(res => res.data)
    }

    latestWeeks(){
        return axios.get(`${this.URL}/latest-weeks`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }).then(result => result.data)
    }

    latestMonths(){
        return axios.get(`${this.URL}/latest-months`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }).then(result => result.data)
    }

    latestYears(){
        return axios.get(`${this.URL}/latest-years`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        }).then(result => result.data)
    }
}

export function useMetricsService() {
    const { token } = useAuth()
    const { show } = useOffline()
    const metrcisService = useMemo(() => new MetricService(token), [token])

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

    function latestDays(){
        return handler(() => metrcisService.latestDays())
    }

    function latestWeeks(){
        return handler(() => metrcisService.latestWeeks())
    }

    function latestMonths(){
        return handler(() => metrcisService.latestMonths())
    }

    function latestYears(){
        return handler(() => metrcisService.latestYears())
    }

    return {
        latestDays,
        latestWeeks,
        latestMonths,
        latestYears
    }
}
