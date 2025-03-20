import type { IAlarm } from "../types/alarm"
import { FormEvent, useState } from "react"

interface AlarmFormProps {
  onSubmit: (alarm: IAlarm) => void
}

function AlarmForm({ onSubmit }: AlarmFormProps) {
  const [time, setTime]= useState<string>("");
  const [title, setTitle]= useState<string>("");
  const [description, setDescription]= useState<string>("");

  const submit= (event: FormEvent) =>{
    event.preventDefault();
    onSubmit({
      time,
      title,
      description,
      active: true,
      id: Date.now().toString()
    })
    setTime("");
    setTitle("");
    setDescription("");
  }

  return (
    <div className="rounded-lg border p-6 max-w-[700px] mx-auto">
      <h2 className="font-bold text-2xl pb-6">Add New Alarm</h2>
      <form onSubmit={submit}>
        <label htmlFor="title" className="font-medium">Alarm Title</label>
        <input required id="title" type="text" placeholder="Enter alarm title" className="w-full border rounded-md px-3 py-2 mb-3"
          value={title} onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description" className="font-medium">Alarm Description</label>
        <textarea required id="description" placeholder="Enter alarm description"
          className="w-full border rounded-md min-h-20 px-3 py-1 mb-3"
          value={description} onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="time" className="font-medium">Alarm Time</label>
        <input required id="time" type="time" placeholder="Enter alarm time" className="w-full border rounded-md px-3 py-2 mb-3"
          value={time} onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit" className="w-full rounded-md py-2 bg-black text-white font-medium hover:bg-gray-800">Add Alarm</button>
      </form>
    </div>
  )
}
export default AlarmForm