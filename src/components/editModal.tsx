import { IoMdClose } from "react-icons/io"
import type { IAlarm } from "../types/alarm"
import { FormEvent, useEffect, useState } from "react"

interface EditModalProps {
  open: boolean
  alarm: IAlarm | null
  onSubmit: (alarm: IAlarm) => void
  close: () => void
}

export function EditModal({ open, alarm, onSubmit, close }: EditModalProps) {
  const [editAlarm, setEditAlarm] = useState<IAlarm | null>(null);

  const submit= (event: FormEvent) =>{
    event.preventDefault()
    onSubmit(editAlarm as IAlarm)
  }

  useEffect(() =>{
    setEditAlarm(alarm);
  }, [alarm])

  if (!open || !editAlarm) return null;

  return(
    <div className="fixed inset-[-20px] flex items-center bg-black bg-opacity-85">
      <div className="rounded-lg border p-6 max-w-[700px] mx-auto bg-white">
        <span className="flex justify-between items-center pb-6 text-2xl font-bold">
          <h2>Edit Alarm</h2>
          <IoMdClose onClick={close} className="text-gray-400 cursor-pointer hover:text-black"/>
        </span>
        <form onSubmit={submit}>
          <label htmlFor="title" className="font-medium">Alarm Title</label>
          <input required id="title" type="text" placeholder="Enter alarm title" className="w-full border rounded-md px-3 py-2 mb-3"
            value={editAlarm?.title} onChange={(event) => setEditAlarm({ ...editAlarm, title: event.target.value })}
          />
          <label htmlFor="description" className="font-medium">Alarm Description</label>
          <textarea required id="description" placeholder="Enter alarm description"
            className="w-full border rounded-md min-h-20 px-3 py-1 mb-3"
            value={editAlarm?.description} onChange={(event) => setEditAlarm({ ...editAlarm, description: event.target.value })}
          />
          <label htmlFor="time" className="font-medium">Alarm Time</label>
          <input required id="time" type="time" placeholder="Enter alarm time" className="w-full border rounded-md px-3 py-2 mb-3"
            value={editAlarm?.time} onChange={(event) => setEditAlarm({ ...editAlarm, time: event.target.value })}
          />
          <button type="submit" className="w-full rounded-md py-2 bg-black text-white font-medium hover:bg-gray-800">Edit Alarm</button>
        </form>
      </div>
    </div>
  )
}