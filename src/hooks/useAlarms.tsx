import { IAlarm } from "../types/alarm"
import { useEffect, useState } from "react"

export function useAlarm() {
    const [alarms, setAlarms] = useState<IAlarm[]>(() =>{
        return JSON.parse(localStorage.getItem("alarms") as string) || []
    })

    const addAlarm= (alarm: IAlarm) =>{
        setAlarms([...alarms, alarm])
    }
    const sortAlarms= (alarms: IAlarm[], sortBy: "time" | "title") =>{
        return [...alarms].sort((a, b) =>{
            if (sortBy=== "time") {
                return a.time.localeCompare(b.time);
            }else return a.title.localeCompare(b.title);
        })
    }
    const deleteAlarm= (id: string) =>{
        setAlarms(alarms.filter((alarm) => alarm.id !== id))
    }

    useEffect(() =>{
        localStorage.setItem("alarms", JSON.stringify(alarms))
    }, [alarms])

    return {
        alarms, addAlarm, sortAlarms, deleteAlarm
    }
}