import { IAlarm } from "../types/alarm"
import { FormEvent, useEffect, useState } from "react"

interface EditModalProps {
  open: boolean
  alarm: IAlarm | null
  save: (alarm: IAlarm) => void
}

export function EditModal({ open, alarm, save }: EditModalProps) {
  const [editAlarm, setEditAlarm] = useState<IAlarm | null>(null);

  const submit= (e: FormEvent) =>{
    e.preventDefault()
    if (!editAlarm) return
    save(editAlarm)
    open= false
  }

  useEffect(() =>{
    setEditAlarm(alarm);
  }, [alarm])

  if (!open || !editAlarm) return null;

  return(
    <div className="fixed inset-[-20px] flex items-center bg-black bg-opacity-85">
      <div className="rounded-lg border p-6 max-w-[700px] mx-auto bg-white">
        <h2 className="font-bold text-2xl pb-6">Edit Alarm</h2>
        <form onSubmit={submit}>
          <label htmlFor="title" className="font-medium">Alarm Title</label>
          <input required id="title" type="text" placeholder="Enter alarm title" className="w-full border rounded-md px-3 py-2 mb-3"
            value={editAlarm?.title} onChange={(e) => setEditAlarm({ ...editAlarm, title: e.target.value })}
          />
          <label htmlFor="description" className="font-medium">Alarm Description</label>
          <textarea required id="description" placeholder="Enter alarm description"
            className="w-full border rounded-md min-h-20 px-3 py-1 mb-3"
            value={editAlarm?.description} onChange={(e) => setEditAlarm({ ...editAlarm, description: e.target.value })}
          />
          <label htmlFor="time" className="font-medium">Alarm Time</label>
          <input required id="time" type="time" placeholder="Enter alarm time" className="w-full border rounded-md px-3 py-2 mb-3"
            value={editAlarm?.time} onChange={(e) => setEditAlarm({ ...editAlarm, time: e.target.value })}
          />
          <button type="submit" className="w-full rounded-md py-2 bg-black text-white font-medium hover:bg-gray-800">Edit Alarm</button>
        </form>
      </div>
    </div>
  )
}