import { useEffect } from "react"
import { FaRegClock } from "react-icons/fa"
import type { IAlarm } from "../types/alarm"

interface AlarmModalProps {
    open: boolean
    alarm: IAlarm | null
    snooze: (id: string) => void
    disable: (id: string) => void
    onDelete: (id: string) => void
}

export function AlarmModal({ open, alarm, snooze, disable, onDelete }: AlarmModalProps) {
    useEffect(() =>{
        if (open && alarm && alarm.active) {
            new Audio('/alarm.mp3').play();
        }
    }, [open, alarm])

    if (!open || !alarm || alarm.active=== false) return null;

    return (
        <div className="fixed inset-[-20px] flex items-center bg-black bg-opacity-85">
            <div className="rounded-lg border p-6 mx-auto bg-white space-y-2">
                <FaRegClock className="place-self-center text-2xl"/>
                <h3 className="text-center">{alarm.title}</h3>
                <span className="space-x-3">
                    <button onClick={() => disable(alarm.id)} className="text-gray-400 hover:text-black">Disable</button>
                    <button onClick={() => onDelete(alarm.id)} className="text-red-500 hover:text-red-700">Delete</button>
                    <button onClick={() => snooze(alarm.id)} className="text-gray-400 hover:text-black">snooze</button>
                </span>
            </div>
        </div>
    )
}