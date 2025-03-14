import { IAlarm } from "../types/alarm"
import { useEffect, useState } from "react"

export function useAlarm() {
    const [alarms, setAlarms] = useState<IAlarm[]>([])

    const addAlarm= (alarm: IAlarm) =>{
        setAlarms([...alarms, alarm])
    }

    useEffect(() => {
        localStorage.setItem("alarms", JSON.stringify(alarms))
    }, [alarms])

    return {
        alarms, addAlarm
    }
}