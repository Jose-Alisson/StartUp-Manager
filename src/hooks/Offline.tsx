import { createContext, useContext, useState } from "react";
import { OfflineIndicator } from "../components/OfflineIndicator";


const OfflineContext = createContext(null)

export function OfflineProvider({ children }) {
    const [showOffline, setShowOffline] = useState(false)

    const show = () => {
        setShowOffline(true)
    }

    return (
        <OfflineContext.Provider value={{ show }}>
            <OfflineIndicator active={showOffline} retry={() => setShowOffline(false)}></OfflineIndicator>
            {children}
        </OfflineContext.Provider>
    )
}

export function useOffline() {
    return useContext(OfflineContext)
}   