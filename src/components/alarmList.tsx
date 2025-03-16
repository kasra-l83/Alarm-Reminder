import { useState } from "react"
import { IAlarm } from "../types/alarm"
import { FaRegEdit } from "react-icons/fa"
import { FaRegTrashCan } from "react-icons/fa6"
import { FiBell, FiBellOff } from "react-icons/fi"


interface AlarmListProps {
    alarms: IAlarm[],
    sort: (alarms: IAlarm[], sortBy: "time" | "title") => IAlarm[],
    edit: (alarm: IAlarm) => void,
    onDelete: (id: string) => void
}

export function AlarmList({ alarms, sort, edit, onDelete }: AlarmListProps) {
    const [sortBy, setSortBy]= useState<"time" | "title">("time");
    const sortedAlarms= sort(alarms, sortBy)

    return (
        <div className="rounded-lg border p-6 max-w-[700px] mx-auto space-y-5">
            <span className="flex justify-between items-center">
                <h2 className="font-bold text-2xl">Your Alarms</h2>
                <span className="flex items-center gap-x-2">
                    <h4>Sort by:</h4>
                    <select className="border py-1 px-2 rounded-md w-40"
                        value={sortBy} onChange={(event) => setSortBy((event.target.value) as "time" | "title")}
                    >
                        <option value="time">Time</option>
                        <option value="title">Title</option>
                    </select>
                </span>
            </span>
            {alarms.length===0?  (
                <p className="text-center text-base text-gray-400 py-10">No alarms set. Create your first alarm above.</p>
            ) : (
                <table className="w-full">
                    <thead className="border-b">
                        <tr>
                            <th className="py-3 text-start pl-2">Status</th>
                            <th className="py-3 text-start">Title</th>
                            <th className="py-3 text-start">Time</th>
                            <th className="py-3 text-end pr-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAlarms.map((alarm: IAlarm) =>(
                            <tr key={alarm.id} className="hover:bg-gray-100">
                                <td className="py-3 text-xl pl-2">{alarm.active ? <FiBell/> : <FiBellOff/>}</td>
                                <td className="py-3">{alarm.title}</td>
                                <td className="py-3">{alarm.time}</td>
                                <td className="py-3 text-end space-x-2 pr-2">
                                    <button onClick={() => edit(alarm)} className="p-3 rounded-lg border bg-white hover:bg-gray-200">
                                        <FaRegEdit/>
                                    </button>
                                    <button onClick={() => onDelete(alarm.id)} className="p-3 rounded-lg border bg-white hover:bg-gray-200">
                                        <FaRegTrashCan/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}