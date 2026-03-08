import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./Auth";
import { API_URL } from "../constants";
import { Client } from "@stomp/stompjs";

const StompContext = createContext<any>(null)

export function WsStomp({ children }) {
    const { token } = useAuth()
    const [sessions, setSessions] = useState<any>()
    const [accesses, setAccesses] = useState<any>()
    const [count, setCount] = useState<any>()
    
    const client = useMemo(() => {
        if (!token) return null
        
        return new Client({
            brokerURL: API_URL + "/ws",
            reconnectDelay: 5000,
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            onConnect: () => {
                console.log("STOMP conectado")
                
                client.subscribe("/user/queue/sessions", (message) => {
                    let { size, accesses, count } = JSON.parse(message.body)
                    setSessions(size)
                    setAccesses(accesses)
                    setCount(count)
                })
                
                client.subscribe("/topic/manager", (message) => {
                    let { size, accesses, count } = JSON.parse(message.body)
                    setSessions(size)
                    setAccesses(accesses)
                    setCount(count)
                })

                 client.subscribe("/topic/admin", (message) => {
                    let { size, accesses, count } = JSON.parse(message.body)
                    setSessions(size)
                    setAccesses(accesses)
                    setCount(count)
                })
            },
        })
    }, [token])
   
    useEffect(() => {
        if (!client) return

        client.activate()

        return () => {
            client.deactivate()
        }
    }, [client])

    useEffect(() => {
        if(client == null) return

        let ping = setInterval(() => {
            console.log("ping")
            client?.publish({
                destination: "/app/ping"
            })
        }, 10000)

        return () => {
            clearInterval(ping)
        }

    }, [client])

    const clickFeature = (businessId: number) => {
        if(client == null) return

        client.publish({
            destination: `/app/feature/click/${businessId}`
        })
    }

    return (
        <StompContext.Provider value={{ sessions, accesses, count, clickFeature }}>
            {children}
        </StompContext.Provider>
    )
}

export function useStomp() {
    const context = useContext(StompContext)
    if (!context) {
        throw new Error("useStomp deve ser usado dentro do WsStomp")
    }
    return context
}